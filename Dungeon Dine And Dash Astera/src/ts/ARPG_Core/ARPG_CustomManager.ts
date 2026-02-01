import { ARPG_Battler, GuardResult } from "ARPG_Battler";
import { ARPG_CorePluginParams } from "ARPG_Config";
import { ARPG_EffectResult } from "ARPG_EffectResult";
import { ARPG_Enemy } from "ARPG_Enemy";
import { ARPG_Skill } from "ARPG_Skill";
import { BattlerCommonEventComponent } from "BattlerCommonEventComponent";
import { BattlerRecvDamageCommonEventComponent } from "BattlerRecvDamageCommonEventComponent";
import { CommonEventComponent } from "../CommonLibrary/CommonEventComponent";
import { Component } from "../CommonLibrary/Component";
import { Degree } from "../CommonLibrary/Degree";
import { ARPG_Actor } from "./ARPG_Actor";
import { ARPG_FieldObject } from "ARPG_FieldObject";

export class ARPG_CustomManager {
    static _actionTable: Map<string, Function> = new Map();

    static addAction(actionName: string, actionFunc: Function): void {
        this._actionTable.set(actionName, actionFunc);
    }

    static getAction(actionName: string): Function | undefined {
        return this._actionTable.get(actionName);
    }

    static actionComponent(user: ARPG_Battler, skill: ARPG_Skill): Component<Game_Character> | undefined {
        if (skill.actionName() !== "") {
            const action = this.getAction(skill.actionName());
            if (action) return action(user, skill);
        }
        if (skill.actionCommonEventId() > 0) {
            return new ActionCommonEventComponent(skill);
        }
        return undefined;
    }

    static actorGuardStart(actor: ARPG_Actor): Component<Game_Character> | undefined {
        if (ARPG_CorePluginParams.ActorSetting.StartGuardCommonEventId > 0) {
            return new BattlerCommonEventComponent(ARPG_CorePluginParams.ActorSetting.StartGuardCommonEventId, true);
        }
        return undefined;
    }

    static actorGuardEnd(actor: ARPG_Actor): Component<Game_Character> | undefined {
        if (ARPG_CorePluginParams.ActorSetting.EndGuardCommonEventId > 0) {
            return new BattlerCommonEventComponent(ARPG_CorePluginParams.ActorSetting.EndGuardCommonEventId, true);
        }
        return undefined;
    }

    static actorRecvDamageComponent(actor: ARPG_Actor, result: ARPG_EffectResult, guardResult: GuardResult): Component<Game_Character> | undefined {
        if (guardResult === "NORMAL_GUARD") {
            return new BattlerRecvDamageCommonEventComponent(ARPG_CorePluginParams.ActorSetting.NormalGuardCommonEventId, result);
        } else if (guardResult === "JUST_GUARD") {
            return new BattlerRecvDamageCommonEventComponent(ARPG_CorePluginParams.ActorSetting.JustGuardCommonEventId, result);
        } else {
            return new BattlerRecvDamageCommonEventComponent(ARPG_CorePluginParams.ActorSetting.DamageCommonEventId, result);
        }
    }

    static actorDeadComponent(actor: ARPG_Actor, result: ARPG_EffectResult): Component<Game_Character> | undefined {
        return new BattlerDeadCommonEventComponent(ARPG_CorePluginParams.ActorSetting.DeadCommonEventId, result);
    }

    static enemyRecvDamageComponent(enemy: ARPG_Enemy, result: ARPG_EffectResult): Component<Game_Event> | undefined {
        return new BattlerRecvDamageCommonEventComponent<Game_Event>(enemy.damageCommonEventId(), result);
    }

    static enemyDefeatComponent(enemy: ARPG_Enemy, result: ARPG_EffectResult): Component<Game_Event> | undefined {
        return new BattlerDeadCommonEventComponent(enemy.defeatEnemyCommonEventId(), result);
    }

    static gameoverComponent(): Component<Game_Character> | undefined {
        if (ARPG_CorePluginParams.ActorSetting.GameOverCommonEventId > 0) {
            return new CommonEventComponent(ARPG_CorePluginParams.ActorSetting.GameOverCommonEventId);
        }
        return undefined;
    }

    static chantComponent(battler: ARPG_Battler, chantCommonEventId: number): Component<Game_Character> | undefined {
        if (chantCommonEventId > 0) {
            return new CommonEventComponent<Game_Character>(chantCommonEventId);
        }
        return undefined;
    }

    static levelUpComponent(actor: Game_Actor) {
        if (ARPG_CorePluginParams.ActorSetting.LevelUpCommonEventId > 0) {
            return new CommonEventComponent(ARPG_CorePluginParams.ActorSetting.LevelUpCommonEventId);
        }
        return undefined;
    }

    static fieldObjectRecvDamageComponent(fieldObject: ARPG_FieldObject): Component<Game_Event> | undefined {
        const damageCommonEventId = fieldObject.damageCommonEventId();
        if (damageCommonEventId > 0) {
            return new CommonEventComponent<Game_Event>(damageCommonEventId);
        }
        return undefined;
    }
}


class ActionCommonEventComponent extends CommonEventComponent<Game_Character> {
    private _skill: ARPG_Skill;

    constructor(skill: ARPG_Skill) {
        super(skill.actionCommonEventId());
        this._skill = skill;
    }

    protected start(): void {
        super.start();
        const character = this.user();
        if (character instanceof Game_Event) {
            this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.UserKindCommonVariableId, 3);
            this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.UserEventIdCommonVariableId, character.eventId());
        } else if (character instanceof Game_Player) {
            this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.UserKindCommonVariableId, 1);
        }

        for (const switchId of this._skill.commonEventSwitches()) {
            this._interpreter.setCommonSwitchValue(switchId, true);
        }
        for (const { id, value } of this._skill.commonEventVariables()) {
            this._interpreter.setCommonVariableValue(id, value);
        }
    }
}


class BattlerDeadCommonEventComponent extends BattlerCommonEventComponent<Game_Event> {
    private _result: ARPG_EffectResult;

    constructor(commonEventId: number, result: ARPG_EffectResult) {
        super(commonEventId, true);
        this._result = result;
    }

    protected start(): void {
        super.start();
        const character = this.user();
        const damageDir4 = this._result.damageDir4();
        let dir;
        if (damageDir4) {
            dir = damageDir4;
        } else {
            dir = character.reverseDir(character.direction());
        }
        if (ARPG_CorePluginParams.BattlerSetting.DamageDegCommonVariableId > 0) {
            this.interpreter().setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageDegCommonVariableId, Degree.fromDirection(dir).value);
        }
    }
}
