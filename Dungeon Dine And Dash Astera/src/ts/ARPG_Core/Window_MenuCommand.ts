import { ARPG_Utils } from "ARPG_Utils";
import { mixin } from "../CommonLibrary/mixin";

class Window_MenuCommand_Mixin extends Window_MenuCommand {
    static _isFormationEnabled = Window_MenuCommand.prototype.isFormationEnabled;

    isFormationEnabled() {
        const result = Window_MenuCommand_Mixin._isFormationEnabled.call(this);
        if (!result) return false;
        if (!ARPG_Utils.isChangeActorEnabled()) return false;
        return true;
    }
}

mixin(Window_MenuCommand, Window_MenuCommand_Mixin);
