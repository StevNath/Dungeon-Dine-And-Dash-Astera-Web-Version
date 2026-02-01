import { ARPG_CorePluginParams } from "./ARPG_Config";

export class ErrorManager {
    static skillActivationUnusedSkillError(): Error {
        let message;
        if (ARPG_CorePluginParams.ErrorMessageLanguage === "ja") {
            message = `スキル未使用の状態でスキル発動を行うことはできません。`;
        } else {
            message = `You cannot activate the skill while the skill is unused.`;
        }
        return new Error(message);
    }

    static applySkillEffectUnusedSkillError(): Error {
        let message;
        if (ARPG_CorePluginParams.ErrorMessageLanguage === "ja") {
            message = `スキル未使用の状態でスキル効果適用を行うことはできません。`;
        } else {
            message = `The skill effect cannot be applied while the skill is not used.`;
        }
        return new Error(message);
    }

    static applySkillEffectUnActivate(): Error {
        let message;
        if (ARPG_CorePluginParams.ErrorMessageLanguage === "ja") {
            message = `スキルを発動していない状態でスキル効果適用を行うことはできません。`;
        } else {
            message = `Skill effects cannot be applied while the skill is not activated.`;
        }
        return new Error(message);
    }

    static testApplySkillEffectUnusedSkillError(): Error {
        let message;
        if (ARPG_CorePluginParams.ErrorMessageLanguage === "ja") {
            message = `スキル未使用の状態でスキル効果適用テストを行うことはできません。`;
        } else {
            message = `Skill effect application test cannot be performed while skill is not used.`;
        }
        return new Error(message);
    }

    static makeSkillObjectUnActivate(): Error {
        let message;
        if (ARPG_CorePluginParams.ErrorMessageLanguage === "ja") {
            message = `スキルの発動を行わずにスキルオブジェクトを生成することはできません。`;
        } else {
            message = `A skill object cannot be created without activating the skill.`;
        }
        return new Error(message);
    }

    static makeSkillObjectNotBattlerOrSkillObject(): Error {
        let message;
        if (ARPG_CorePluginParams.ErrorMessageLanguage === "ja") {
            message = `バトラーまたはスキルオブジェクトでないイベントはスキルオブジェクトを生成することはできません。`;
        } else {
            message = `Events that are not battlers or skill objects cannot generate skill objects.`;
        }
        return new Error(message);
    }
}
