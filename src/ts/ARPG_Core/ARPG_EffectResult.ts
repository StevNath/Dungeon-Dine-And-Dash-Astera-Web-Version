import { GuardResult } from "ARPG_Battler";
import { Degree } from "../CommonLibrary/Degree";

export const DamageKind = {
    NONE: 0,
    HP_DAMAGE: 1,
    MP_DAMAGE: 2,
    TP_DAMAGE: 3,
};

export type DamageKind = typeof DamageKind[keyof typeof DamageKind];

export const DamageType = {
    NORMAL: 1,
    MISSED: 2,
    EVADED: 3,
    CRITICAL: 4,
};

export type DamageType = typeof DamageType[keyof typeof DamageType];

export class ARPG_EffectResult {
    private _actionResult: Game_ActionResult;
    private _damageDeg?: Degree;
    private _guardResult: GuardResult;

    constructor(actionResult: Game_ActionResult, damageDeg: Degree | undefined, guardResult: GuardResult | undefined) {
        this._actionResult = this.copyActionResult(actionResult);
        this._damageDeg = damageDeg;
        if (guardResult == null) {
            this._guardResult = "NO_GUARD";
        } else {
            this._guardResult = guardResult;
        }
    }

    actionResult(): Game_ActionResult {
        return this._actionResult;
    }

    damageKind(): DamageKind {
        if (this._actionResult.hpAffected) {
            return DamageKind.HP_DAMAGE;
        } else {
            if (this._actionResult.mpDamage > 0) {
                return DamageKind.MP_DAMAGE;
            } else if (this._actionResult.tpDamage > 0) {
                return DamageKind.TP_DAMAGE;
            }
        }
        return DamageKind.NONE;
    }

    damageType(): DamageType {
        if (this._actionResult.missed) {
            return DamageType.MISSED;
        } else if (this._actionResult.evaded) {
            return DamageType.EVADED;
        } else if (this._actionResult.critical) {
            return DamageType.CRITICAL;
        } else {
            return DamageType.NORMAL;
        }
    }

    hpDamageValue(): number {
        return this._actionResult.hpDamage;
    }

    mpDamageValue(): number {
        return this._actionResult.mpDamage;
    }

    tpDamageValue(): number {
        return this._actionResult.tpDamage;
    }

    damageDeg(): Degree | undefined {
        return this._damageDeg;
    }

    damageDir4(): number | undefined {
        if (this._damageDeg == null) return undefined;
        return this._damageDeg.toDirection4(0);
    }

    guardResult(): GuardResult {
        return this._guardResult;
    }

    private copyActionResult(actionResult: Game_ActionResult): Game_ActionResult {
        const copyActionResult = new Game_ActionResult();
        copyActionResult.used = actionResult.used;
        copyActionResult.missed = actionResult.missed;
        copyActionResult.evaded = actionResult.evaded;
        copyActionResult.physical = actionResult.physical;
        copyActionResult.drain = actionResult.drain;
        copyActionResult.critical = actionResult.critical;
        copyActionResult.success = actionResult.success;
        copyActionResult.hpAffected = actionResult.hpAffected;
        copyActionResult.hpDamage = actionResult.hpDamage;
        copyActionResult.mpDamage = actionResult.mpDamage;
        copyActionResult.tpDamage = actionResult.tpDamage;
        copyActionResult.addedStates = actionResult.addedStates;
        copyActionResult.removedStates = actionResult.removedStates;
        copyActionResult.addedBuffs = actionResult.addedBuffs;
        copyActionResult.addedDebuffs = actionResult.addedDebuffs;
        copyActionResult.removedBuffs = actionResult.removedBuffs;
        return copyActionResult;
    }
}
