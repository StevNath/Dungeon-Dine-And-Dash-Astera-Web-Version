import { ARPG_CorePluginParams } from "ARPG_Config";
import { ARPG_Skill } from "ARPG_Skill";
import { Component } from "../CommonLibrary/Component";
import { FrameCounter } from "../CommonLibrary/FrameCounter";

export class ARPG_ComboController extends Component<Game_Character> {
    private _numCombo: number = 0;
    private _lastSkillId: number = 0;
    private _frameCounter: FrameCounter<Game_Character> = new FrameCounter();

    protected setup(): void {
        super.setup();
        this.addComponent(this._frameCounter);
    }

    checkDerivationSkill(useSkill: ARPG_Skill): ARPG_Skill | undefined {
        if (ARPG_CorePluginParams.ActionComboSetting == null) return undefined;
        if (this._numCombo <= 0) return undefined;

        let prevDerivationSkillId;
        for (const actionComboData of ARPG_CorePluginParams.ActionComboSetting) {
            if (this._numCombo === 1) {
                prevDerivationSkillId = actionComboData.SkillId;
            } else {
                const prevDerivation = actionComboData.ActionComboDerivations[this._numCombo - 2];
                prevDerivationSkillId = prevDerivation.DerivationSkillId;
            }
            const derivation = actionComboData.ActionComboDerivations[this._numCombo - 1];
            if (prevDerivationSkillId === this._lastSkillId) {
                if (derivation && derivation.FromSkillId === useSkill.id) {
                    const frame = this._frameCounter.frame;
                    if (derivation.MinComboFrame <= frame && frame <= derivation.MaxComboFrame) {
                        return new ARPG_Skill("skill", derivation.DerivationSkillId);
                    }
                }
            }
        }

        return undefined;
    }

    cancelCombo(): void {
        this._numCombo = 0;
    }

    startCombo(useSkill: ARPG_Skill): void {
        this._numCombo = 1;
        this._frameCounter.reset();
        this._lastSkillId = useSkill.id;
    }

    toNextCombo(useSkill: ARPG_Skill): void {
        this._numCombo++;
        this._frameCounter.reset();
        this._lastSkillId = useSkill.id;
    }
}
