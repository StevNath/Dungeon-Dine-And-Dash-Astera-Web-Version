import { Component } from "../CommonLibrary/Component";
import { HitChecker } from "./HitChecker";
import { ARPG_CustomManager } from "ARPG_CustomManager";
import { ARPG_Skill } from "ARPG_Skill";
import { ChainComponent } from "../CommonLibrary/ChainComponent";
import { ARPG_Battler } from "ARPG_Battler";
import { ARPG_SkillObject } from "ARPG_SkillObject";

export interface IARPG_FieldObjectOption {
    damageCommonEventId?: number;
}

export interface IARPG_FieldRecvDamageInfo {
    skillUser: ARPG_Battler;
    skill: ARPG_Skill;
}

export class ARPG_FieldObject extends Component<Game_Event> {
    protected _damageHitChecker: HitChecker<Game_Event> = new HitChecker("damage");
    protected _customHitCheckers: Map<string, HitChecker> = new Map();
    private _damageCommonEventId: number;
    private _recvDamageInfo?: IARPG_FieldRecvDamageInfo;

    get damageHitChecker() { return this._damageHitChecker; }
    get customHitCheckers() { return this._customHitCheckers; }

    constructor(opt: IARPG_FieldObjectOption = {}) {
        super();
        this._damageCommonEventId = opt.damageCommonEventId ?? 0;
    }

    protected start(): void {
        super.start();
        this.addComponent(this._damageHitChecker);
    }

    protected update(): void {
        super.update();
        this.updateRecvDamage();
    }

    protected updateRecvDamage() {
        const character = this.user();
        if (character instanceof Game_Event) {
            if (character.isErased()) return;
        }
        const hitCharacters = this._damageHitChecker.checkHit("attack");
        let skill: ARPG_Skill | undefined;
        let skillUser: ARPG_Battler | undefined;
        let hitObject: ARPG_Battler | ARPG_SkillObject | undefined;
        for (const character of hitCharacters) {
            if (character.isSkillObject()) {
                hitObject = character.skillObject();
                skill = character.skillObject().skill();
                skillUser = character.skillObject().userBattler();
            } else if (character.isBattler()) {
                hitObject = character.battler();
                const skillId = character.battler().collideAttackSkillId();
                if (skillId > 0) {
                    skill = new ARPG_Skill("skill", skillId);
                    skillUser = character.battler();
                }
            }
        }
        if (hitObject && skill && skillUser) {
            this._recvDamageInfo = { skill, skillUser };
            const component = ARPG_CustomManager.fieldObjectRecvDamageComponent(this);
            if (component) this.addComponent(new ChainComponent([component, this.onEndRecvDamage.bind(this)]));
            if (hitObject instanceof ARPG_SkillObject) hitObject.hitFlagOn();
        }
    }

    damageCommonEventId(): number {
        return this._damageCommonEventId;
    }

    isDamageReceiving(): boolean {
        return !!this._recvDamageInfo;
    }

    checkDamageElement(elementName: string): boolean {
        if (!this._recvDamageInfo) return false;
        const allElements = $dataSystem.elements;
        const attackElementIds = this._recvDamageInfo.skillUser.attackElementIds().concat(this._recvDamageInfo.skill.elementIds());
        for (let i = 0; i < allElements.length; i++) {
            if (allElements[i] === elementName) {
                if (attackElementIds.includes(i)) return true;
            }
        }
        return false;
    }

    onEndRecvDamage(): void {
        this._recvDamageInfo = undefined;
    }
}
