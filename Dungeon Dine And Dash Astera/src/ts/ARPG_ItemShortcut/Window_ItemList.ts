import { ARPG_Utils } from "ARPG_Core/ARPG_Utils";
import { mixin } from "CommonLibrary/mixin";

class Window_ItemList_Mixin extends Window_ItemList {
    processOk() {
        const hasAction = ARPG_Utils.hasActionItem(this.item());
        if (this.isCurrentItemEnabled() || hasAction) {
            this.playOkSound();
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    }

    drawItem(index: number) {
        const item = this.itemAt(index);
        if (item) {
            const numberWidth = this.numberWidth();
            const rect = this.itemLineRect(index);
            const enabled = this.isEnabled(item) || ARPG_Utils.hasActionItem(item);
            this.changePaintOpacity(enabled);
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    }
}

mixin(Window_ItemList, Window_ItemList_Mixin);
