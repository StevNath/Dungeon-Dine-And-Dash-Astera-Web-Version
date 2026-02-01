import { CommonEventComponent } from "../CommonLibrary/CommonEventComponent";
import { ARPG_CorePluginParams } from "./ARPG_Config";

export class BattlerCommonEventComponent<T extends Game_Character> extends CommonEventComponent<T> {
    private _lock: boolean;

    constructor(commonEventId: number, lock: boolean = false) {
        super(commonEventId);
        this._lock = lock;
    }

    protected start(): void {
        super.start();
        const character = this.user();
        if (character instanceof Game_Event) {
            const parallelInterpreter = character.interpreter();
            if (parallelInterpreter) {
                if (this._lock) parallelInterpreter.lock("common_event");
            }
            this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.UserKindCommonVariableId, 3);
            this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.UserEventIdCommonVariableId, character.eventId());
        } else if (character instanceof Game_Player) {
            this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.UserKindCommonVariableId, 1);
        }
    }

    protected terminate(): void {
        super.terminate();
        const character = this.user();
        if (character instanceof Game_Event) {
            const parallelInterpreter = character.interpreter();
            if (parallelInterpreter) {
                if (this._lock) parallelInterpreter.unlock("common_event");
            }
        }
    }
}
