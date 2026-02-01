import { Component } from "../CommonLibrary/Component";
import { HitBox } from "./HitBox";
import type { HitBoxType } from "./HitBox";

export class HitChecker<T extends Game_Character = Game_Character> extends Component<T> {
    private _hitBoxs: HitBox[] = [];
    private _type!: HitBoxType;
    private _customTag?: string;
    private _disableReasons: Set<string> = new Set();

    get hitBoxs() { return this._hitBoxs; }
    get type() { return this._type; }
    get customTag() { return this._customTag; }

    constructor(type: HitBoxType, customTag?: string) {
        super();
        this._type = type;
        this._customTag = customTag;
    }

    update() {
        super.update();
        for (const hitBox of this._hitBoxs) {
            hitBox.update();
        }
    }

    addHitBox(hitBox: HitBox) {
        if (this.type !== hitBox.type) {
            throw new Error(`mismatch: hitChecker.type=${this.type}, hitBox.type=${hitBox.type}`)
        }
        if (this.type === "custom" && this.customTag !== hitBox.customTag) {
            throw new Error(`mismatch: hitChecker.customTag=${this.customTag}, hitBox.customTag=${hitBox.customTag}`)
        }
        this._hitBoxs.push(hitBox);
        hitBox.setHitChecker(this);
    }

    clearHitBoxs() {
        this._hitBoxs = [];
    }

    checkHit(hitBoxType: HitBoxType, customTag: string = ""): Set<Game_Character> {
        const hitCharacters = new Set<Game_Character>();
        if (!this.isEnabled()) return hitCharacters;
        for (const hitBox of this._hitBoxs) {
            for (const character of hitBox.checkHitCharactersByHitBox(hitBoxType, customTag)) {
                hitCharacters.add(character);
            }
        }
        return hitCharacters;
    }

    checkHitByOtherHitChecker(otherHitChecker: HitChecker<Game_Character>): boolean {
        if (!this.isEnabled()) return false;
        if (!otherHitChecker.isEnabled()) return false;
        for (const subjectHitBox of this._hitBoxs) {
            for (const result of subjectHitBox.checkHitCharacters(HitBox)) {
                for (const targetHitBox of otherHitChecker.hitBoxs) {
                    if (result.targetObject === targetHitBox) return true;
                }
            }
        }
        return false;
    }

    addDisableReason(reason: string): void {
        this._disableReasons.add(reason);
    }

    removeDisableReason(reason: string): void {
        this._disableReasons.delete(reason);
    }

    isEnabled(): boolean {
        return this._disableReasons.size === 0;
    }
}
