import { ARPG_CorePluginParams } from "ARPG_Config";
import { Degree } from "../CommonLibrary/Degree";
import { ARPG_Battler, GuardResult } from "./ARPG_Battler";
import { ARPG_EffectResult } from "./ARPG_EffectResult";
import { ARPG_Skill } from "./ARPG_Skill";

const formulaFuncTbl = new Map<string, Function>();

export class ARPG_Effect {
    private _subject: ARPG_Battler;
    private _target: ARPG_Battler;
    private _skill: ARPG_Skill;
    private _damageDeg?: Degree;
    private _guardResult?: GuardResult;

    constructor(subject: ARPG_Battler, target: ARPG_Battler, skill: ARPG_Skill, deg: Degree | undefined) {
        this._subject = subject;
        this._target = target;
        this._skill = skill;
        this._damageDeg = deg;
    }

    applyToTarget(): ARPG_EffectResult {
        const action = new Game_ARPGAction(this._subject.battler());
        action.setItemObject(this._skill.data());
        action.setGuardResult(this._guardResult);
        action.apply(this._target.battler());
        const result = new ARPG_EffectResult(this._target.battler().result(), this._damageDeg, this._guardResult);
        if (ARPG_CorePluginParams.UseDamagePopup == null || ARPG_CorePluginParams.UseDamagePopup) {
            $gameTemp.requestFieldDamagePopup(this._target.user(), result.actionResult());
        }
        return result;
    }

    testApplyToTarget(): boolean {
        const action = new Game_ARPGAction(this._subject.battler());
        action.setItemObject(this._skill.data());
        action.setGuardResult(this._guardResult);
        return action.testApply(this._target.battler());
    }

    damageDir4() {
        if (this._damageDeg == null) return undefined;
        return this._damageDeg.toDirection4(0);
    }

    damageDeg() {
        return this._damageDeg;
    }

    setDamageDeg(damageDeg: Degree | undefined) {
        this._damageDeg = damageDeg;
    }

    subject(): ARPG_Battler {
        return this._subject;
    }

    target(): ARPG_Battler {
        return this._target;
    }

    skill(): ARPG_Skill {
        return this._skill;
    }

    noDamageFrame() {
        return this._skill.noDamageFrame();
    }

    setGuardResult(guardResult: GuardResult): void {
        this._guardResult = guardResult;
        if (guardResult != "NO_GUARD") {
            this.setDamageDeg(undefined);
        }
    }
}


class Game_ARPGAction extends Game_Action {
    protected _subject?: Game_Battler;
    protected _guardResult?: GuardResult;

    setSubject(subject: Game_Battler): void {
        this._subject = subject;
    }

    subject(): Game_Battler {
        return this._subject!;
    }

    // ジャストガードの場合、ダメージ関連のリザルトを設定しない。
    apply(target: Game_Battler): void {
        super.apply(target);
        if (this._guardResult === "JUST_GUARD") {
            target.result().hpAffected = false;
            target.result().missed = false;
            target.result().evaded = false;
        }
    }

    evalDamageFormula(target: Game_Battler): number {
        try {
            const item = this.item();
            const a = this.subject(); // eslint-disable-line no-unused-vars
            const b = target; // eslint-disable-line no-unused-vars
            const v = ($gameVariables as any)._data; // eslint-disable-line no-unused-vars
            const sign = [3, 4].includes(item.damage.type) ? -1 : 1;
            const formula = item.damage.formula;
            let func = formulaFuncTbl.get(formula);
            if (!func) {
                func = new Function("a", "b", "v", `return (${formula});`);
                formulaFuncTbl.set(formula, func);
            }
            const value = Math.max(func(a, b, v), 0) * sign;
            return isNaN(value) ? 0 : value;
        } catch (e) {
            return 0;
        }
    }

    applyGuard(damage: number, target: Game_Battler) {
        if (this._guardResult === "JUST_GUARD") {
            return 0;
        } else if (this._guardResult === "NORMAL_GUARD") {
            return damage / 2;
        }
        return damage;
    }

    setGuardResult(guardResult: GuardResult | undefined) {
        this._guardResult = guardResult;
    }

    // ARPGモードの場合に対応
    testApply(target: Game_Battler): boolean {
        return (
            this.testLifeAndDeath(target) &&
            (
                (this.isHpRecover() && target.hp < target.mhp) ||
                (this.isMpRecover() && target.mp < target.mmp) ||
                this.hasItemAnyValidEffects(target) ||
                (this.evalDamageFormula(target) !== 0)
            )
        );
    }

    applyCritical(damage: number): number {
        return damage * 2;
    }
}
