import { Game_ControlCharacter } from "Game_ControlCharacter";
import { ARPG_Enemy } from "./ARPG_Enemy";
import { MessageWindowController } from "./MessageWindowController";

export class ARPG_GlobalTempData {
    bossHpGaugeTargetEnemy: ARPG_Enemy | undefined;
    controlCharacter: Game_ControlCharacter;
    skillNameWindowController: MessageWindowController;
    selectingTarget?: Game_Character;
    selectResultSwitchId: number = 0;
    selectedTargetCharacterKindVariableId: number = 0;
    selectedTargetEventIdVariableId: number = 0;

    constructor() {
        this.controlCharacter = new Game_ControlCharacter();
        this.skillNameWindowController = new MessageWindowController();
        this.controlCharacter.setup(this.skillNameWindowController);
    }
}
