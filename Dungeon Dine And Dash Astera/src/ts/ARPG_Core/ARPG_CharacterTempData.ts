import { ARPG_Battler } from "./ARPG_Battler";
import { ARPG_SkillObject } from "./ARPG_SkillObject";
import { ComponentRunner } from "../CommonLibrary/ComponentRunner";
import { ARPG_FieldObject } from "./ARPG_FieldObject";

export class ARPG_CharacterTempData {
    lastARPGMode: boolean = false;
    componentRunner?: ComponentRunner<Game_Character>;
    battler?: ARPG_Battler;
    skillObject?: ARPG_SkillObject;
    fieldObject?: ARPG_FieldObject;
}
