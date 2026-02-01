import { mixin } from "../../CommonLibrary/mixin";

declare global {
    interface Game_SelfSwitches {
        clearSelfSwitches(mapId: number, eventId?: number, switchName?: string): void;
    }
}

class Game_SelfSwitches_Mixin extends Game_SelfSwitches {
    clearSelfSwitches(mapId: number, eventId?: number, switchName?: string): void {
        for (const key in this._data) {
            const keyParams = key.split(",");
            const keyMapId = parseInt(keyParams[0]);
            const keyEventId = parseInt(keyParams[1]);
            const keySwitchName = keyParams[2];
            if (keyMapId === mapId
                && (eventId == null || keyEventId === eventId)
                && (switchName == null || keySwitchName === switchName)) {
                delete this._data[key];
            }
        }
    }
}

mixin(Game_SelfSwitches, Game_SelfSwitches_Mixin);
