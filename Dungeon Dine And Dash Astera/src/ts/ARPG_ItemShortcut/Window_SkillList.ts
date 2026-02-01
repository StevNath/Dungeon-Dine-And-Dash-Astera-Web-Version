import { mixin } from "CommonLibrary/mixin";
import { ARPG_Utils } from "ARPG_Core/ARPG_Utils";

class Window_SkillList_Mixin extends Window_SkillList {
    processOk() {
        const hasAction = ARPG_Utils.hasActionItem(this.item()!);
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
        const skill = this.itemAt(index);
        if (skill) {
            const costWidth = this.costWidth();
            const rect = this.itemLineRect(index);
            const enabled = this.isEnabled(skill) || ARPG_Utils.hasActionItem(skill);
            this.changePaintOpacity(enabled);
            this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
            this.drawSkillCost(skill, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    }
}

mixin(Window_SkillList, Window_SkillList_Mixin);
