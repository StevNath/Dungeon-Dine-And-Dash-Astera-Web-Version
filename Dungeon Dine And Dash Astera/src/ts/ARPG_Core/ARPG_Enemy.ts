import { ARPG_Battler } from "./ARPG_Battler";
import { ARPG_CorePluginParams } from "./ARPG_Config";
import { Component } from "../CommonLibrary/Component";
import { ChainComponent } from "../CommonLibrary/ChainComponent";
import { ARPG_CustomManager } from "ARPG_CustomManager";
import { ARPG_EffectResult } from "ARPG_EffectResult";
import { ARPG_BattlerParameters } from "ARPG_BattlerParameters";
import { BattlerDeadComponent } from "BattlerDeadComponent";

export interface IARPG_EnemyOption {
    collideAttackSkillId?: number;
    damageCommonEventId?: number;
    defeatEnemyCommonEventId?: number;
}

export interface INormalHpGaugeOption {
    hpGaugeColor1?: string;
    hpGaugeColor2?: string;
    hpGaugePosition?: "up" | "down";
    hpGaugeYOffset?: number;
    hpGaugeHeight?: number;
}

export class ARPG_Enemy extends ARPG_Battler {
    private _enemy: Game_Enemy;
    private _needHpGauge: boolean = false;
    private _showHpGauge: boolean = true;
    private _normalHpGaugeOption?: INormalHpGaugeOption;
    private _damageCommonEventId?: number;
    private _defeatEnemyCommonEventId?: number;
    private _defeated: boolean = false;
    private _arpgParameters: ARPG_BattlerParameters = new ARPG_BattlerParameters();

    constructor(enemyId: number, opt: IARPG_EnemyOption = {}) {
        super();
        this._enemy = new Game_Enemy(enemyId, 0, 0);
        this._enemy.refresh();
        this._enemy.recoverAll();
        if (opt.collideAttackSkillId != null) this.setCollideAttackSkillId(opt.collideAttackSkillId);
        if (opt.damageCommonEventId != null) this._damageCommonEventId = opt.damageCommonEventId;
        if (opt.defeatEnemyCommonEventId != null) this._defeatEnemyCommonEventId = opt.defeatEnemyCommonEventId;
    }

    protected update(): void {
        super.update();
        // NOTE: Actorの場合は戦闘中以外もステート経過時間を更新するため、処理の共通化は行わない。
        this.battler().updateStatesDuration();
    }

    battler() {
        return this._enemy;
    }

    enemy() {
        return this.battler() as Game_Enemy;
    }

    name() {
        return this.enemy().battlerName();
    }

    arpgParameters(): ARPG_BattlerParameters {
        return this._arpgParameters;
    }

    isEnemy() {
        return true;
    }

    checkOpponent(battler: ARPG_Battler): boolean {
        return battler.isActor();
    }

    exp() {
        return this._enemy.exp();
    }

    gold() {
        return this._enemy.gold();
    }

    isNeedCharacterHpGauge() {
        return this._needHpGauge;
    }

    isCharacterHpGaugeVisibled(): boolean {
        if (this.isDefeated()) return false;
        return this._showHpGauge;
    }

    setupNormalHpGauge(opt: INormalHpGaugeOption = {}): void {
        this._needHpGauge = true;
        this._normalHpGaugeOption = {
            hpGaugeColor1: opt.hpGaugeColor1,
            hpGaugeColor2: opt.hpGaugeColor2,
            hpGaugePosition: opt.hpGaugePosition,
            hpGaugeYOffset: opt.hpGaugeYOffset,
            hpGaugeHeight: opt.hpGaugeHeight,
        };
    }

    setHpGaugeVisible(visible: boolean): void {
        this._showHpGauge = visible;
    }

    normalHpGaugeOption(): INormalHpGaugeOption | undefined {
        return this._normalHpGaugeOption;
    }

    protected makeRecvDamageComponent(result: ARPG_EffectResult): Component<Game_Character> | undefined {
        const recvDamageComponent = ARPG_CustomManager.enemyRecvDamageComponent(this, result);
        let damageComponent;
        if (this.isAlive()) {
            damageComponent = recvDamageComponent;
        } else {
            const deadComponent = new BattlerDeadComponent(ARPG_CustomManager.enemyDefeatComponent(this, result));
            damageComponent = new ChainComponent<Game_Character>([recvDamageComponent, deadComponent, this.onDefeat.bind(this)]);
        }
        return damageComponent;
    }

    private onDefeat(): void {
        this._defeated = true;
        const exp = this.exp();
        for (const actor of $gameParty.allMembers()) {
            actor.gainExp(exp);
        }
        $gameParty.gainGold(this.gold());
    }

    isDefeated(): boolean {
        return this._defeated;
    }

    damageCommonEventId(): number {
        if (this._damageCommonEventId != null && this._damageCommonEventId > 0) return this._damageCommonEventId;
        return ARPG_CorePluginParams.EnemySetting.DamageCommonEventId;
    }

    defeatEnemyCommonEventId(): number {
        if (this._defeatEnemyCommonEventId != null && this._defeatEnemyCommonEventId > 0) return this._defeatEnemyCommonEventId;
        return ARPG_CorePluginParams.EnemySetting.DefeatEnemyCommonEventId;
    }
}
