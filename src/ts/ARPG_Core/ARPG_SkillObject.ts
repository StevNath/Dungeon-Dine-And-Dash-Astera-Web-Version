import { Degree } from "../CommonLibrary/Degree";
import { ARPG_Battler } from "ARPG_Core/ARPG_Battler";
import { Component } from "../CommonLibrary/Component";
import { ARPG_CorePluginParams } from "./ARPG_Config";
import { ARPG_Effect } from "./ARPG_Effect";
import { ARPG_Skill } from "./ARPG_Skill";
import { HitChecker } from "./HitChecker";
import { DotMovePoint } from "DotMoveSystem";
import { ARPG_FieldObject } from "ARPG_FieldObject";

export class ARPG_SkillObject extends Component<Game_Event> {
    private _skill: ARPG_Skill;
    private _userBattler: ARPG_Battler;
    private _attackDeg?: Degree;
    private _attackHitChecker: HitChecker<Game_Event> = new HitChecker("attack");
    private _customHitCheckers: Map<string, HitChecker> = new Map();
    private _skillObjectPositionController: SkillObjectPositionController = new SkillObjectPositionController(this);

    get attackHitChecker() { return this._attackHitChecker; }
    get customHitCheckers() { return this._customHitCheckers; }

    constructor(skill: ARPG_Skill, user: ARPG_Battler) {
        super();
        this._skill = skill;
        this._userBattler = user;
    }

    setup() {
        super.setup();
        this.addComponent(this._attackHitChecker);
        this.addComponent(this._skillObjectPositionController);
    }

    skill(): ARPG_Skill {
        return this._skill;
    }

    userBattler(): ARPG_Battler {
        return this._userBattler;
    }

    setAttackDeg(deg?: Degree) {
        this._attackDeg = deg;
    }

    attackDeg(): Degree | undefined {
        return this._attackDeg;
    }

    isUserPositionSynchronized(): boolean {
        return this._skillObjectPositionController.isBusy();
    }

    setUserPositionSynchronize(synchronize: boolean): void {
        if (synchronize) {
            this._skillObjectPositionController.resume();   
        } else {
            this._skillObjectPositionController.stop();
        }
    }

    makeSkillObject(
        srcMapId: number,
        srcEventIdOrName: number | string,
        skill: ARPG_Skill | undefined,
        x: number = 0,
        y: number = 0
    ): Game_Event {
        const event = $gameMap.makeDynamicEvent(srcMapId, srcEventIdOrName, x, y);

        if (skill == null) {
            skill = this._skill;
        }
        event.setupSkillObject(skill.skillOrItem, skill.id, this._userBattler);

        let userKind: number = 0;
        let userEventId: number = 0;
        const userCharacter = this._userBattler.user();
        if (userCharacter instanceof Game_Player) {
            userKind = 1;
        } else if (userCharacter instanceof Game_Event) {
            userKind = 3;
            userEventId = userCharacter.eventId();
        }
        if (ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserKindSelfVariableId > 0) {
            event.setSelfVariableValue(ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserKindSelfVariableId, userKind);
        }
        if (ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserEventIdSelfVariableId > 0) {
            event.setSelfVariableValue(ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserEventIdSelfVariableId, userEventId);
        }

        return event;
    }

    createEffect(subject: ARPG_Battler, target: ARPG_Battler, skill: ARPG_Skill) {
        return new ARPG_Effect(subject, target, skill, this.attackDeg());
    }

    applyDamageEffectToBattler(battler: ARPG_Battler, arpgSkill: ARPG_Skill) {
        if (battler.isNoDamage()) return;
        const effect = this.createEffect(this.userBattler(), battler, arpgSkill);
        // this.user().gainSilentTp(Math.round(effect.damageValue() / battler.hp * 10)); // TODO: TP増加処理要検討
        this.user().setExSelfSwitchValue(ARPG_CorePluginParams.SkillObjectSetting.CollisionDetectExSelfSwitchId, true);
        battler.recvDamage(effect);
    }

    hitFlagOn(): void {
        this.user().setExSelfSwitchValue(ARPG_CorePluginParams.SkillObjectSetting.CollisionDetectExSelfSwitchId, true);
    }
}


class SkillObjectPositionController extends Component<Game_Event> {
    private _lastUserPosition?: DotMovePoint;
    private _skillObject: ARPG_SkillObject;

    constructor(skillObject: ARPG_SkillObject) {
        super();
        this._skillObject = skillObject;
        this.stop();
    }

    protected update(): void {
        super.update();
        const skillObjectEvent = this._skillObject.user();
        const currentUserPosition = this._skillObject.userBattler().user().positionPoint();
        if (this._lastUserPosition && !this._lastUserPosition.equals(currentUserPosition)) {
            const diffX = currentUserPosition.x - this._lastUserPosition.x;
            const diffY = currentUserPosition.y - this._lastUserPosition.y;
            const diff = new DotMovePoint(diffX, diffY);
            skillObjectEvent.setPositionPoint(skillObjectEvent.positionPoint().add(diff));
        }
        this._lastUserPosition = currentUserPosition;
    }
}
