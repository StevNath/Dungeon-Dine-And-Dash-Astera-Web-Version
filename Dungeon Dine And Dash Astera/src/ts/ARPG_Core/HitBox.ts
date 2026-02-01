import { HitChecker } from "HitChecker";
import { Sprite_HitBox } from "./Sprite_HitBox";

export type HitBoxType = "attack" | "damage" | "custom";

export class HitBox extends Game_Character {
    private _hitChecker?: HitChecker;
    private _owner!: Game_Character;
    private _hitArea!: Rectangle;
    private _hitBoxColor!: string;
    private _type!: HitBoxType;
    private _customTag?: string;

    get owner() { return this._owner; }
    get hitArea() { return this._hitArea; }
    set hitArea(_hitArea: Rectangle) { this._hitArea = _hitArea; }
    get hitBoxColor() { return this._hitBoxColor; }
    get type() { return this._type; }
    get customTag() { return this._customTag; }

    constructor(type: HitBoxType, owner: Game_Character, hitArea: Rectangle, hitBoxColor: string, customTag?: string);

    constructor(...args: [HitBoxType, Game_Character, Rectangle, string, string | undefined]) {
        super(...args as unknown as []);
    }

    initialize(...args: any): void {
        super.initialize();
        const [type, owner, hitArea, hitBoxColor, customTag] = args;
        this._owner = owner;
        this._hitArea = hitArea;
        this._hitBoxColor = hitBoxColor;
        this._type = type;
        this._customTag = customTag;
        this.updatePosition();
    }

    update(): void {
        super.update();
        this.updatePosition();
    }

    setHitChecker(hitChecker: HitChecker): void {
        this._hitChecker = hitChecker;
    }

    updatePosition(): void {
        const ownerPos = this._owner.positionPoint();
        this.setPositionPoint(new DotMoveSystem.DotMovePoint(ownerPos.x + this._hitArea.x, ownerPos.y + this._hitArea.y));
    }

    width(): number {
        return this._hitArea.width;
    }

    height(): number {
        return this._hitArea.height;
    }

    checkHitCharactersByHitBox(type: HitBoxType, customTag: string = "") {
        const hitCharacters = new Set<Game_Character>();
        const results = this.checkHitCharacters(HitBox);
        for (const result of results) {
            const targetHitBox = result.targetObject;
            if (this.owner === targetHitBox.owner) continue;
            if (!targetHitBox.isEnabled()) continue;
            if (targetHitBox.type !== type) continue;
            if (targetHitBox.type === "custom" && targetHitBox.customTag !== customTag) continue;
            hitCharacters.add(targetHitBox.owner);
        }
        return hitCharacters;
    }

    getHitBoxSprite(): Sprite_HitBox | undefined {
        if (!(SceneManager._scene instanceof Scene_Map)) return undefined;
        const spriteset = (SceneManager._scene as any)._spriteset;
        return spriteset.findTargetHitBoxSprite(this);
    }

    screenX(): number {
        const tw = $gameMap.tileWidth();
        return Math.floor(this.scrolledX() * tw);
    }

    screenY(): number {
        const th = $gameMap.tileHeight();
        return Math.floor(this.scrolledY() * th);
    }

    screenZ() {
        return 255;
    }

    isEnabled(): boolean {
        if (this._hitChecker == null) return false;
        return this._hitChecker.isEnabled();
    }
}
