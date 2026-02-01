import { DotMovePoint, DotMoveUtils } from "DotMoveSystem";
import { Degree } from "../CommonLibrary/Degree";
import { PluginParamsParser } from "../CommonLibrary/PluginParamsParser";
import { ARPG_Enemy } from "./ARPG_Enemy";
import { ARPG_Utils } from "./ARPG_Utils";
import { ErrorManager } from "./ErrorManager";
import { HitBox } from "./HitBox";
import { HitChecker } from "./HitChecker";

export const ARPG_CorePluginName = document.currentScript ? decodeURIComponent((document.currentScript as HTMLScriptElement).src.match(/^.*\/(.+)\.js$/)![1]) : "ARPG_Core";

export interface IPluginParams_Key {
    KeyName: string;
    KeySymbol: string;
    KeyCodes: number[];
    ButtonIndexes: number[];
    KeyCode: number; // NOTE: v1.5.0以前との互換性のために残す。
    ButtonIndex: number; // NOTE: v1.5.0以前との互換性のために残す。
}

export interface IPluginParams_HitBox {
    X: number;
    Y: number;
    Width: number;
    Height: number;
}

export interface IPluginParams_SE {
    FileName: string;
    Volume: number;
    Pitch: number;
    Pan: number;
    Pos: number;
}

export interface IARPG_CorePluginParams {
    CopyEventSetting: {
        CopyEventTag: string;
        DynamicEventSrcMapIds: number[];
    };
    BattlerSetting: {
        UserKindCommonVariableId: number;
        UserEventIdCommonVariableId: number;
        DamageDegCommonVariableId: number;
        DamageKindCommonVariableId: number;
        DamageTypeCommonVariableId: number;
        DamageValueCommonVariableId: number;
    };
    ActorSetting: {
        NormalAttackSkillId: number;
        DamageCommonEventId: number;
        DeadCommonEventId: number;
        NormalGuardCommonEventId: number;
        JustGuardCommonEventId: number;
        StartGuardCommonEventId: number;
        EndGuardCommonEventId: number;
        JustGuardFrame: number;
        ActorHitBox: {
            DamageHitBoxList: IPluginParams_HitBox[];
        };
        GameOverCommonEventId: number;
        LevelUpCommonEventId: number;
    };
    EnemySetting: {
        CollideAttackSkillId: number;
        DamageCommonEventId: number;
        DefeatEnemyCommonEventId: number;
    };
    SkillObjectSetting: {
        SkillObjectUserKindSelfVariableId: number;
        SkillObjectUserEventIdSelfVariableId: number;
        CollisionDetectExSelfSwitchId: number;
    };
    HitBoxSetting: {
        VisibleHitAreaSwitchId: number;
        AttackHitBoxColor: string;
        DamageHitBoxColor: string;
        CustomHitBoxDefaultColor: string;
        CustomHitBoxColorList: ({ CustomHitBoxTag: string, Color: string })[];
    };
    ActionComboSetting: {
        SkillId: number;
        ActionComboDerivations: {
            FromSkillId: number;
            DerivationSkillId: number;
            MinComboFrame: number;
            MaxComboFrame: number;
        }[];
    }[];
    EnemyHpGaugeSetting: {
        NormalEnemyHpGaugePosition: string;
        NormalEnemyHpGaugeYOffset: number;
        NormalEnemyHpGaugeHeight: number;
        NormalEnemyHpGaugeColor1: string;
        NormalEnemyHpGaugeColor2: string;
        BossEnemyHpGaugeColor1: string;
        BossEnemyHpGaugeColor2: string;
        BossEnemyHpGaugeLabel: string;
        BossEnemyHpGaugeYOffset: number;
        BossEnemyHpGaugeWidth: number;
        BossEnemyHpGaugeHeight: number;
    };
    KeySetting: {
        Cancel: IPluginParams_Key;
        Menu: IPluginParams_Key;
        ActorNormalAttack: IPluginParams_Key;
        ActorGuard: IPluginParams_Key;
        VisibleHitBox: IPluginParams_Key;
        ChangeControlActor: IPluginParams_Key;
    };
    SESetting: {
        ActorChange: IPluginParams_SE;
    };
    UseDamagePopup: boolean;
    UseImageDamage: boolean;
    UseImageTargetSelectCursor: boolean;
    TargetSelectCursorImageFileName: string;
    EnableChangeControlActorSwitchId: number;
    EnableARPGSwitchId: number;
    SelectedTargetCharacterKindVariableId: number;
    SelectedTargetEventIdVariableId: number;
    ErrorMessageLanguage: string;
}

export const ARPG_CorePluginParams: IARPG_CorePluginParams = PluginParamsParser.parse(PluginManager.parameters(ARPG_CorePluginName));


if (ARPG_CorePluginParams.KeySetting.Cancel != null) {
    ARPG_Utils.registerKey("Cancel", ARPG_CorePluginParams.KeySetting.Cancel);
}
if (ARPG_CorePluginParams.KeySetting.Menu != null) {
    ARPG_Utils.registerKey("Menu", ARPG_CorePluginParams.KeySetting.Menu);
}
if (ARPG_CorePluginParams.KeySetting.ActorNormalAttack != null) {
    ARPG_Utils.registerKey("ActorNormalAttack", ARPG_CorePluginParams.KeySetting.ActorNormalAttack);
}
if (ARPG_CorePluginParams.KeySetting.ActorGuard != null) {
    ARPG_Utils.registerKey("ActorGuard", ARPG_CorePluginParams.KeySetting.ActorGuard);
}
if (ARPG_CorePluginParams.KeySetting.VisibleHitBox != null) {
    ARPG_Utils.registerKey("VisibleHitBox", ARPG_CorePluginParams.KeySetting.VisibleHitBox);
}
if (ARPG_CorePluginParams.KeySetting.ChangeControlActor != null) {
    ARPG_Utils.registerKey("ChangeControlActor", ARPG_CorePluginParams.KeySetting.ChangeControlActor);
}

PluginManager.registerCommand(ARPG_CorePluginName, "ChangeARPGMode", function(args: any) {
    const params = PluginParamsParser.parse(args);
    const arpgMode = !!params.ARPGMode;
    if (arpgMode) {
        $gameMap.startARPGMode();
    } else {
        $gameMap.endARPGMode();
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "MakeDynamicEvent", function(args: any) {
    const typeDefine = {
        SrcMapId: "number",
        SrcEventIdOrName: "string",
        X: "number",
        XByVariable: "number",
        Y: "number",
        YByVariable: "number",
        MadeDynamicEventId: "number",
    };
    const params = PluginParamsParser.parse(args, typeDefine);
    const x = params.XByVariable > 0 ? $gameVariables.value(params.XByVariable) : params.X;
    const y = params.YByVariable > 0 ? $gameVariables.value(params.YByVariable) : params.Y;
    const event = $gameMap.makeDynamicEvent(params.SrcMapId, params.SrcEventIdOrName, x, y);
    if (params.MadeDynamicEventId > 0) {
        $gameVariables.setValue(params.MadeDynamicEventId, event.eventId());
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "GetCharacterFloatPosition", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    let pos;
    if (params.LeftUpOrCenter === "center") {
        pos = character.centerPositionPoint();
    } else {
        pos = character.positionPoint();
    }
    $gameVariables.setValue(params.StoreFloatXVariableId, pos.x);
    $gameVariables.setValue(params.StoreFloatYVariableId, pos.y);
});

PluginManager.registerCommand(ARPG_CorePluginName, "CalcDeg", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const subject = this.findCharacterBySpecification(params.SubjectCharacterSpecification);
    const target = this.findCharacterBySpecification(params.TargetCharacterSpecification);
    $gameVariables.setValue(params.StoreDegreeVariableId, subject.calcDeg(target));
});

PluginManager.registerCommand(ARPG_CorePluginName, "CalcFar", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const subject = this.findCharacterBySpecification(params.SubjectCharacterSpecification);
    const target = this.findCharacterBySpecification(params.TargetCharacterSpecification);
    $gameVariables.setValue(params.StoreFarVariableId, subject.calcFar(target));
});

PluginManager.registerCommand(ARPG_CorePluginName, "CheckInTheScreen", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    const xMargin = params.XMargin ?? 2;
    const yMargin = params.YMargin ?? 2;
    $gameSwitches.setValue(params.StoreResultSwitchId, character.isInTheScreen(xMargin, yMargin));
});

PluginManager.registerCommand(ARPG_CorePluginName, "CheckMoved", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    $gameSwitches.setValue(params.StoreResultSwitchId, character.isMoved());
});

PluginManager.registerCommand(ARPG_CorePluginName, "SetupEnemy", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const event = this.event();
    if (!event) return;

    let collideAttackSkillId;
    if (params.CollideAttackSkillId != null && params.CollideAttackSkillId > 0) {
        collideAttackSkillId = params.CollideAttackSkillId;
    } else if (ARPG_CorePluginParams.EnemySetting.CollideAttackSkillId != null && ARPG_CorePluginParams.EnemySetting.CollideAttackSkillId > 0) {
        collideAttackSkillId = ARPG_CorePluginParams.EnemySetting.CollideAttackSkillId;
    }

    event.setupEnemy(
        params.EnemyId,
        {
            collideAttackSkillId,
            damageCommonEventId: params.DamageCommonEventId,
            defeatEnemyCommonEventId: params.DefeatEnemyCommonEventId,
        }
    );
    if (params.HpGauge === "normal") {
        event.battler<ARPG_Enemy>().setupNormalHpGauge({
            hpGaugeColor1: ARPG_CorePluginParams.EnemyHpGaugeSetting.NormalEnemyHpGaugeColor1,
            hpGaugeColor2: ARPG_CorePluginParams.EnemyHpGaugeSetting.NormalEnemyHpGaugeColor2,
            hpGaugePosition: ARPG_CorePluginParams.EnemyHpGaugeSetting.NormalEnemyHpGaugePosition === "down" ? "down" : "up",
            hpGaugeYOffset: ARPG_CorePluginParams.EnemyHpGaugeSetting.NormalEnemyHpGaugeYOffset,
            hpGaugeHeight: ARPG_CorePluginParams.EnemyHpGaugeSetting.NormalEnemyHpGaugeHeight,
        });
    } else if (params.HpGauge === "boss") {
        $gameTemp.arpgGlobalTempData().bossHpGaugeTargetEnemy = event.battler<ARPG_Enemy>();
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "ChangeHpGaugeVisible", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!(character && character instanceof Game_Event)) return;
    character.battler<ARPG_Enemy>().setHpGaugeVisible(!!params.ShowOrHide);
});

PluginManager.registerCommand(ARPG_CorePluginName, "SetupFieldObject", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const event = this.event();
    if (!event) return;
    event.setupFieldObject({ damageCommonEventId: params.DamageCommonEventId });
});

PluginManager.registerCommand(ARPG_CorePluginName, "UseSkill", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const user = this.arpgCharacter();
    let idOrName;
    if (params.SkillIdByVariable > 0) {
        idOrName = $gameVariables.value(params.SkillIdByVariable)
    } else if (params.SkillByName && params.SkillByName !== "") {
        idOrName = params.SkillByName;
    } else {
        idOrName = params.SkillId;
    }
    user!.battler().useSkill("skill", idOrName);
});

PluginManager.registerCommand(ARPG_CorePluginName, "UseItem", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const user = this.arpgCharacter();
    let idOrName;
    if (params.ItemIdByVariable > 0) {
        idOrName = $gameVariables.value(params.ItemIdByVariable)
    } else if (params.ItemByName && params.ItemByName !== "") {
        idOrName = params.ItemByName;
    } else {
        idOrName = params.ItemId;
    }
    user!.battler().useSkill("item", idOrName);
});

PluginManager.registerCommand(ARPG_CorePluginName, "SkillActivation", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args, { ChantCommonEventId: "number" });
    this.arpgCharacter()!.battler().skillActivation(params.ChantCommonEventId);
    this._needChantWait = true;
});

PluginManager.registerCommand(ARPG_CorePluginName, "SkillCancel", function(this: Game_Interpreter) {
    this.arpgCharacter()!.battler().skillCancel();
});

PluginManager.registerCommand(ARPG_CorePluginName, "ChangeSkillCancelWhenDamageEnableOrDisable", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    this.arpgCharacter()!.battler().setSkillCancelWhenDamageEnable(!!params.EnableOrDisable);
});

PluginManager.registerCommand(ARPG_CorePluginName, "ApplySkillEffect", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    let skill;
    if (params.IsSkillSpecification) {
        skill = this.findArpgSkillBySpecification(params.SkillSpecification);
    }
    this.arpgCharacter()!.battler().applySkillEffect(skill);
});

PluginManager.registerCommand(ARPG_CorePluginName, "TestApplySkillEffect", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    let skill;
    if (params.IsSkillSpecification) {
        skill = this.findArpgSkillBySpecification(params.SkillSpecification);
    }
    const result = this.arpgCharacter()!.battler().testApplySkillEffect(skill);
    $gameSwitches.setValue(params.StoreResultSwitchId, result);
});

PluginManager.registerCommand(ARPG_CorePluginName, "MakeSkillObject", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);

    const user = this.arpgCharacter()!;
    if (!(user.isBattler() || user.isSkillObject())) {
        throw ErrorManager.makeSkillObjectNotBattlerOrSkillObject();
    }

    let event;
    let skill;
    if (params.IsSkillSpecification) {
        skill = this.findArpgSkillBySpecification(params.SkillSpecification);
    }
    if (user.isBattler()) {
        event = user.battler().makeSkillObject(params.SrcMapId, params.SrcEventIdOrName, skill);
    } else {
        event = user.skillObject().makeSkillObject(params.SrcMapId, params.SrcEventIdOrName, skill);
    }

    let x = 0;
    let y = 0;
    const userPos = user.centerPositionPoint();
    switch (params.SkillObjectPosition.Specification) {
        case "current":
            x = userPos.x - event.width() / 2;
            y = userPos.y - event.height() / 2;
            break;
        case "forward":
            const userForwardPos = DotMoveUtils.nextPointWithDirection(userPos, user.direction());
            x = userForwardPos.x - event.width() / 2;
            y = userForwardPos.y - event.height() / 2;
            break;
        case "character":
            const target = this.findCharacterBySpecification(params.SkillObjectPosition.CharacterSpecification);
            const targetPos = target.centerPositionPoint();
            x = targetPos.x - event.width() / 2;
            y = targetPos.y - event.height() / 2;
            break;
        case "custom":
            const xByVariable = params.SkillObjectPosition.CustomPosition.XByVariable;
            const yByVariable = params.SkillObjectPosition.CustomPosition.YByVariable;
            x = xByVariable > 0 ? $gameVariables.value(xByVariable) : params.SkillObjectPosition.CustomPosition.X;
            y = yByVariable > 0 ? $gameVariables.value(yByVariable) : params.SkillObjectPosition.CustomPosition.Y;
            break;
    }
    event.setPosition(x, y);

    if (params.MadeDynamicEventId > 0) {
        $gameVariables.setValue(params.MadeDynamicEventId, event.eventId());
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "SetAttackDegree", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    const skillObject = character.skillObject();
    const attackDeg = params.AttackDegreeByVariable > 0 ? $gameVariables.value(params.AttackDegreeByVariable) : params.AttackDegree;
    skillObject.setAttackDeg(new Degree(attackDeg));
});

PluginManager.registerCommand(ARPG_CorePluginName, "SetUserPositionSynchronize", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    const skillObject = character.skillObject();
    skillObject.setUserPositionSynchronize(!!params.Synchronize);
});

function findHitChecker(character: Game_Character, hitBoxType: string, customHitBoxTag: string): HitChecker {
    let hitChecker: any;
    if (hitBoxType === "attack") {
        if (character.isBattler()) {
            const battler = character.battler();
            hitChecker = (battler as any).attackHitChecker;
        } else if (character.isSkillObject()) {
            const skillObject = character.skillObject();
            hitChecker = skillObject.attackHitChecker;
        }
        if (!hitChecker) {
            throw new Error(`Event is not ARPG_Battler or ARPG_SkillObject`);
        }
    } else if (hitBoxType === "damage") {
        if (character.isBattler()) {
            const battler = character.battler();
            hitChecker = battler.damageHitChecker;
        } else if (character.isFieldObject()) {
            const fieldObject = character.fieldObject();
            hitChecker = fieldObject.damageHitChecker;
        }
        if (!hitChecker) {
            throw new Error(`Event is not ARPG_Battler or ARPG_FieldObject`);
        }
    } else if (hitBoxType === "custom") {
        let customHitChecker;
        if (character.isBattler()) {
            customHitChecker = character.battler().customHitCheckers.get(customHitBoxTag);
            if (!customHitChecker) {
                customHitChecker = new HitChecker("custom", customHitBoxTag);
                character.battler().customHitCheckers.set(customHitBoxTag, customHitChecker);
                character.battler().addComponent(customHitChecker);
            }
        } else if (character.isSkillObject()) {
            customHitChecker = character.skillObject().customHitCheckers.get(customHitBoxTag);
            if (!customHitChecker) {
                customHitChecker = new HitChecker<Game_Event>("custom", customHitBoxTag);
                character.skillObject().customHitCheckers.set(customHitBoxTag, customHitChecker);
                character.skillObject().addComponent(customHitChecker);
            }
        } else if (character.isFieldObject()) {
            customHitChecker = character.fieldObject().customHitCheckers.get(customHitBoxTag);
            if (!customHitChecker) {
                customHitChecker = new HitChecker<Game_Event>("custom", customHitBoxTag);
                character.fieldObject().customHitCheckers.set(customHitBoxTag, customHitChecker);
                character.fieldObject().addComponent(customHitChecker);
            }
        }
        if (!customHitChecker) {
            throw new Error(`Event is not ARPG_Battler or ARPG_SkillObject or ARPG_FieldObject`);
        }
        hitChecker = customHitChecker;
    }
    return hitChecker;
}

PluginManager.registerCommand(ARPG_CorePluginName, "CheckDamageElement", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    let result = false;
    const character = this.arpgCharacter();
    if (character) {
        if (character.isBattler()) {
            result = character.battler().checkDamageElement(params.ElementName);
        } else if (character.isFieldObject()) {
            result = character.fieldObject().checkDamageElement(params.ElementName);
        }
    }
    $gameSwitches.setValue(params.StoreResultSwitchId, result);
});

PluginManager.registerCommand(ARPG_CorePluginName, "SetHitBox", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character) return;
    const hitChecker = findHitChecker(character, params.HitBoxType, params.CustomHitBoxTag);
    hitChecker.clearHitBoxs();
    for (const hitBoxParam of params.HitBoxList) {
        const rect = new Rectangle(hitBoxParam.X, hitBoxParam.Y, hitBoxParam.Width, hitBoxParam.Height);
        if (params.HitBoxType === "attack") {
            const hitBox = new HitBox("attack", character, rect, ARPG_CorePluginParams.HitBoxSetting.AttackHitBoxColor);
            hitChecker.addHitBox(hitBox);
        } else if (params.HitBoxType === "damage") {
            const hitBox = new HitBox("damage", character, rect, ARPG_CorePluginParams.HitBoxSetting.DamageHitBoxColor);
            hitChecker.addHitBox(hitBox);
        } else if (params.HitBoxType === "custom") {
            let color;
            const info = ARPG_CorePluginParams.HitBoxSetting.CustomHitBoxColorList.find(info => info.CustomHitBoxTag === params.CustomHitBoxTag);
            if (info) {
                color = info.Color;
            } else {
                color = ARPG_CorePluginParams.HitBoxSetting.CustomHitBoxDefaultColor;
            }
            const hitBox = new HitBox("custom", character, rect, color, params.CustomHitBoxTag);
            hitChecker.addHitBox(hitBox);
        }
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "ChangeHitBoxEnableOrDisable", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character) return;

    const hitChecker = findHitChecker(character, params.HitBoxType, params.CustomHitBoxTag);
    if (!!params.Enabled) {
        hitChecker.removeDisableReason("ChangeHitBoxEnableOrDisable")
    } else {
        hitChecker.addDisableReason("ChangeHitBoxEnableOrDisable");
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "HitCheck", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);

    const subjectCharacter = this.findCharacterBySpecification(params.SubjectCharacterSpecification);
    if (!subjectCharacter) return;
    const subjectHitChecker = findHitChecker(subjectCharacter, params.SubjectHitBoxType, params.SubjectCustomHitBoxTag);

    if (params.IsTargetSpecification) {
        const targetCharacter = this.findCharacterBySpecification(params.TargetCharacterSpecification);
        const targetHitChecker = findHitChecker(targetCharacter, params.TargetHitBoxType, params.TargetCustomHitBoxTag);

        const result = subjectHitChecker.checkHitByOtherHitChecker(targetHitChecker);
        $gameSwitches.setValue(params.StoreResultSwitchId, result);
    } else {
        const results = subjectHitChecker.checkHit(params.TargetHitBoxType, params.TargetCustomHitBoxTag);
        $gameSwitches.setValue(params.StoreResultSwitchId, results.size > 0);
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "GetBattlerStatus", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character.isBattler()) throw new Error(`battler is not found. (EventId=${params.CharacterSpecification})`);
    const battler: any = character.battler();
    const value = battler[params.StatusType];
    if (value == null) {
        throw new Error(`StatusType is invalid. (StatusType=${params.StatusType})`);
    }
    $gameVariables.setValue(params.DestVariableId, value);
});

PluginManager.registerCommand(ARPG_CorePluginName, "SetBattlerStatus", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character.isBattler()) throw new Error(`battler is not found. (EventId=${params.CharacterSpecification})`);
    const battler = character.battler();
    const value = params.ValueByVariable > 0 ? $gameVariables.value(params.ValueByVariable) : params.Value;
    switch (params.StatusType) {
        case "hp":
            battler.hp = value;
            break;
        case "mp":
            battler.mp = value;
            break;
        case "tp":
            battler.tp = value;
            break;
        default:
            throw new Error(`StatusType is invalid. (StatusType=${params.StatusType})`);
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "GetBattlerARPGParameter", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character.isBattler()) throw new Error(`battler is not found. (EventId=${params.CharacterSpecification})`);
    const battler = character.battler();
    let value;
    switch (params.ARPGParameterType) {
        case "skillCancelDamageRate":
            value = battler.arpgParameters().skillCancelDamageRate;
            break;
        case "justGuardFrame":
            const justGuardFrame = battler.arpgParameters().justGuardFrame;
            value = justGuardFrame == null ? 0 : justGuardFrame;
            break;
        default:
            throw new Error(`ARPGParameterType is invalid. (ARPGParameterType=${params.ARPGParameterType})`);
    }
    $gameVariables.setValue(params.DestVariableId, value);
});

PluginManager.registerCommand(ARPG_CorePluginName, "SetBattlerARPGParameter", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character.isBattler()) throw new Error(`battler is not found. (EventId=${params.CharacterSpecification})`);
    const battler = character.battler();
    const value = params.ValueByVariable > 0 ? $gameVariables.value(params.ValueByVariable) : params.Value;
    switch (params.ARPGParameterType) {
        case "skillCancelDamageRate":
            battler.arpgParameters().skillCancelDamageRate = value;
            break;
        case "justGuardFrame":
            battler.arpgParameters().justGuardFrame = value;
            break;
        default:
            throw new Error(`ARPGParameterType is invalid. (ARPGParameterType=${params.ARPGParameterType})`);
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "GetBattlerARPGFlag", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character.isBattler()) throw new Error(`battler is not found. (EventId=${params.CharacterSpecification})`);
    const battler = character.battler();
    let value: boolean;
    switch (params.ARPGFlagType) {
        case "noDamageFlag":
            value = battler.arpgParameters().noDamageFlag;
            break;
        case "noAttackFlag":
            value = battler.arpgParameters().noAttackFlag;
            break;
        default:
            throw new Error(`ARPGFlagType is invalid. (ARPGFlagType=${params.ARPGFlagType})`);
    }
    $gameSwitches.setValue(params.DestSwitchId, value);
});

PluginManager.registerCommand(ARPG_CorePluginName, "SetBattlerARPGFlag", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character.isBattler()) throw new Error(`battler is not found. (EventId=${params.CharacterSpecification})`);
    const battler = character.battler();
    const value = params.ValueBySwitch > 0 ? $gameSwitches.value(params.ValueBySwitch) : params.Value;
    switch (params.ARPGFlagType) {
        case "noDamageFlag":
            battler.arpgParameters().noDamageFlag = value;
            break;
        case "noAttackFlag":
            battler.arpgParameters().noAttackFlag = value;
            break;
        default:
            throw new Error(`ARPGFlagType is invalid. (ARPGFlagType=${params.ARPGFlagType})`);
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "CharacterBlowAway", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    const deg = new Degree(params.DegreeByVariable > 0 ? $gameVariables.value(params.DegreeByVariable) : params.Degree);
    const initialVelocity = params.InitialVelocityByVariable > 0 ? $gameVariables.value(params.InitialVelocityByVariable) : params.InitialVelocity;
    const duration = params.DurationByVariable > 0 ? $gameVariables.value(params.DurationByVariable) : params.Duration;
    character.startBlowAway(deg, initialVelocity, duration);
    if (!!params.Wait) {
        this._blowAwayWaitCharacter = character;
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "CharacterActionWait", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    const duration = params.DurationByVariable > 0 ? $gameVariables.value(params.DurationByVariable) : params.Duration;
    character.startActionWait(duration);
    this._actionWaitCharacter = character;
});

PluginManager.registerCommand(ARPG_CorePluginName, "TargetSelect", function(this: Game_Interpreter, args: any[]) {
    const typeDefine = {
        SelectResultSwitchId: "number",
        SelectedTargetCharacterKindVariableId: "number",
        SelectedTargetEventIdVariableId: "number",
        Wait: "boolean",
        Cancelable: "boolean",
    };
    const params = PluginParamsParser.parse(args, typeDefine);
    if ($gameTemp.arpgGlobalTempData().selectResultSwitchId > 0) {
        $gameSwitches.setValue(params.SelectResultSwitchId, false);
    }
    $gameTemp.arpgGlobalTempData().selectResultSwitchId = params.SelectResultSwitchId;
    $gameTemp.arpgGlobalTempData().selectedTargetCharacterKindVariableId = params.SelectedTargetCharacterKindVariableId;
    $gameTemp.arpgGlobalTempData().selectedTargetEventIdVariableId = params.SelectedTargetEventIdVariableId;
    $gameMap.startTargetSelect({ wait: params.Wait, cancelable: params.Cancelable });
    this._needTargetSelectWait = true;
});

PluginManager.registerCommand(ARPG_CorePluginName, "SearchNearBattler", function(this: Game_Interpreter, args: any[]) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.SubjectCharacterSpecification);
    let found = false;
    if (character.isBattler()) {
        const { character: foundCharacter } = ARPG_Utils.searchNearBattler(character, params.Target);
        if (foundCharacter) {
            found = true;
            $gameVariables.setValue(params.StoreCharacterKindVariableId, ARPG_Utils.characterKindValue(foundCharacter));
            if (foundCharacter instanceof Game_Event) {
                $gameVariables.setValue(params.StoreEventIdVariableId, foundCharacter.eventId());
            }
        }
    }
    $gameSwitches.setValue(params.StoreResultSwitchId, found);
});

PluginManager.registerCommand(ARPG_CorePluginName, "SetPlayerGuardMode", function(this: Game_Interpreter, args: any[]) {
    const params = PluginParamsParser.parse(args);
    if ($gamePlayer.isBattler()) {
        if (params.GuardMode) {
            $gamePlayer.battler().startGuard("SetPlayerGuardMode");
        } else {
            $gamePlayer.battler().endGuard("SetPlayerGuardMode");
        }
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "ChangeControlActor", function(this: Game_Interpreter, args: any[]) {
    $gameTemp.requestChangeNextActor();
});

PluginManager.registerCommand(ARPG_CorePluginName, "ShowMessagePopup", function(this: Game_Interpreter, args: any[]) {
    const params = PluginParamsParser.parse(args);
    const w = params.WindowWidth == null ? 640 : params.WindowWidth;
    const h = 64;
    const x = Graphics.boxWidth / 2 - w / 2;
    const y = 0;
    const rect = new Rectangle(x, y, w, h);
    $gameMap.showCommonMessageWindow(params.Text, rect, { time: params.Time });
});

PluginManager.registerCommand(ARPG_CorePluginName, "TransparentObjectCast", function(this: Game_Interpreter, args: any[]) {
    const params = PluginParamsParser.parse(args);

    const width: number = params.Width;
    const height: number = params.Height;

    let x = 0;
    let y = 0;
    switch (params.TransparentObjectPosition.Specification) {
        case "character":
            const target = this.findCharacterBySpecification(params.TransparentObjectPosition.CharacterSpecification);
            const targetPos = target.centerPositionPoint();
            x = targetPos.x - width / 2;
            y = targetPos.y - height / 2;
            break;
        case "custom":
            const xByVariable = params.TransparentObjectPosition.CustomPosition.XByVariable;
            const yByVariable = params.TransparentObjectPosition.CustomPosition.YByVariable;
            x = xByVariable > 0 ? $gameVariables.value(xByVariable) : params.TransparentObjectPosition.CustomPosition.X;
            y = yByVariable > 0 ? $gameVariables.value(yByVariable) : params.TransparentObjectPosition.CustomPosition.Y;
            break;
    }

    const deg = new Degree(params.DegreeByVariable > 0 ? $gameVariables.value(params.DegreeByVariable) : params.Degree);
    const far = params.FarByVariable > 0 ? $gameVariables.value(params.FarByVariable) : params.Far;
    const collidedPos = $gameMap.transparentObjectCastTo(new DotMovePoint(x, y), deg, far, { width, height });
    $gameSwitches.setValue(params.CollisionResultSwitchId, !!collidedPos);
    if (collidedPos) {
        if (params.CollidedXVariableId > 0) $gameVariables.setValue(params.CollidedXVariableId, collidedPos.x);
        if (params.CollidedYVariableId > 0) $gameVariables.setValue(params.CollidedYVariableId, collidedPos.y);
    }
});

PluginManager.registerCommand(ARPG_CorePluginName, "SetCheckMapValid", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character) return;
    if (params.EnableOrDisable == true) {
        character.setNoCheckMapValid(false);
    } else {
        character.setNoCheckMapValid(true);
    }
});
