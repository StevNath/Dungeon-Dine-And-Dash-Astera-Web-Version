import { mixin } from "../CommonLibrary/mixin";

class Game_System_Mixin extends Game_System {
    static _isSaveEnabled = Game_System.prototype.isSaveEnabled;

    isSaveEnabled(): boolean {
        const result = Game_System_Mixin._isSaveEnabled.call(this);
        if (!result) return false;
        if ($gameMap.isEnabledARPGMode()) return false;
        return true;
    }
}

mixin(Game_System, Game_System_Mixin);
