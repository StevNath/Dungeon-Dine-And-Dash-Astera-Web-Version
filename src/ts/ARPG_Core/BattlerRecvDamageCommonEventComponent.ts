import { Degree } from "../CommonLibrary/Degree";
import { ARPG_CorePluginParams } from "./ARPG_Config";
import { ARPG_EffectResult, DamageKind } from "./ARPG_EffectResult";
import { BattlerCommonEventComponent } from "./BattlerCommonEventComponent";

export class BattlerRecvDamageCommonEventComponent<T extends Game_Character> extends BattlerCommonEventComponent<T> {
    private _damageEffectResult: ARPG_EffectResult;

    constructor(commonEventId: number, damageEffectResult: ARPG_EffectResult) {
        super(commonEventId, true);
        this._damageEffectResult = damageEffectResult;
    }

    protected start(): void {
        super.start();
        const character = this.user();
        const damageDir4 = this._damageEffectResult.damageDir4();
        let dir;
        if (damageDir4) {
            dir = damageDir4;
        } else {
            dir = character.reverseDir(character.direction());
        }
        if (ARPG_CorePluginParams.BattlerSetting.DamageDegCommonVariableId > 0) {
            this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageDegCommonVariableId, Degree.fromDirection(dir).value);
        }

        const damageKind = this._damageEffectResult.damageKind();
        if (ARPG_CorePluginParams.BattlerSetting.DamageKindCommonVariableId > 0) {
            this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageKindCommonVariableId, damageKind);
        }
        if (ARPG_CorePluginParams.BattlerSetting.DamageTypeCommonVariableId > 0) {
            this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageTypeCommonVariableId, this._damageEffectResult.damageType());
        }
        if (ARPG_CorePluginParams.BattlerSetting.DamageValueCommonVariableId > 0) {
            switch (damageKind) {
                case DamageKind.HP_DAMAGE:
                    this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageValueCommonVariableId, this._damageEffectResult.hpDamageValue());
                    break;
                case DamageKind.MP_DAMAGE:
                    this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageValueCommonVariableId, this._damageEffectResult.mpDamageValue());
                    break;
                case DamageKind.TP_DAMAGE:
                    this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageValueCommonVariableId, this._damageEffectResult.tpDamageValue());
                    break;
            }
            
        }
    }
}
