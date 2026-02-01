import { ARPG_Battler } from "./ARPG_Battler";
import { ARPG_Utils } from "./ARPG_Utils";
import { ChainComponent } from "../CommonLibrary/ChainComponent";
import { ARPG_CustomManager } from "ARPG_CustomManager";
import { ARPG_CorePluginParams } from "ARPG_Config";
import { ARPG_EffectResult } from "ARPG_EffectResult";
import { Component } from "../CommonLibrary/Component";
import { ARPG_BattlerParameters } from "ARPG_BattlerParameters";
import { BattlerDeadComponent } from "BattlerDeadComponent";

export class ARPG_Actor extends ARPG_Battler {
    private _actorId: number;

    constructor(actorId: number) {
        super();
        this._actorId = actorId;
    }

    battler() {
        return $gameActors.actor(this._actorId)!;
    }

    actor() {
        return this.battler() as Game_Actor;
    }

    actorId(): number {
        return this._actorId;
    }

    name() {
        return this.actor().name();
    }

    arpgParameters(): ARPG_BattlerParameters {
        return this.actor().arpgParameters();
    }

    isActor() {
        return true;
    }

    checkOpponent(battler: ARPG_Battler): boolean {
        return battler.isEnemy();
    }

    changeActor(actorId: number): void {
        this._actorId = actorId;
        this.requestRefreshShortcutWindowHook();
    }

    protected makeRecvDamageComponent(result: ARPG_EffectResult): Component<Game_Character> | undefined {
        const recvDamageComponent = ARPG_CustomManager.actorRecvDamageComponent(this, result, result.guardResult());
        let damageComponent;
        if (this.isAlive()) {
            damageComponent = recvDamageComponent;
        } else {
            const deadComponent = new BattlerDeadComponent(ARPG_CustomManager.actorDeadComponent(this, result));
            damageComponent = new ChainComponent([recvDamageComponent, deadComponent, this.onDead.bind(this)]);
        }
        return damageComponent;
    }

    private onDead(): void {
        $gameMap.arpgBattleManager()?.deadActor(this);
    }

    weaponActionSkillIds(): number[] {
        const weapons = this.actor().weapons();
        return weapons.map(weapon => {
            const metaSkill = weapon.meta.skill;
            if (typeof metaSkill === "string") {
                let skillId;
                const strSkill = metaSkill.replace(/\s/, "");
                if (strSkill.match(/^\d+$/)) {
                    skillId = parseInt(strSkill);
                } else {
                    skillId = ARPG_Utils.searchSkillId(strSkill);
                }
                if (skillId && skillId > 0) return skillId;
            }
            return this.normalAttackSkillId();
        });
    }

    protected normalAttackSkillId(): number {
        // TODO: 将来的にはデフォルト値は0にしたい
        if (ARPG_CorePluginParams.ActorSetting.NormalAttackSkillId == null) return 1;
        return ARPG_CorePluginParams.ActorSetting.NormalAttackSkillId;
    }

    protected onGuardStart(): void {
        super.onGuardStart();
        const component = ARPG_CustomManager.actorGuardStart(this);
        if (component) this.addComponent(component);
    }

    protected onGuardEnd(): void {
        super.onGuardEnd();
        const component = ARPG_CustomManager.actorGuardEnd(this);
        if (component) this.addComponent(component);
    }
}
