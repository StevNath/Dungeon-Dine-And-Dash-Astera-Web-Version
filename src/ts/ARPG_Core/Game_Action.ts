import { ARPG_Utils } from "ARPG_Utils";
import { mixin } from "../CommonLibrary/mixin";

class Game_Action_Mixin extends Game_Action {
    calcElementRate(target: Game_Battler) {
        const attackElementIds = new Set<number>(this.subject().attackElements());
        for (const elementId of ARPG_Utils.itemAttackElementIds(this.item())) {
            attackElementIds.add(elementId);
        }
        return this.elementsMaxRate(target, this.subject().attackElements().concat(...attackElementIds));
    }
}

mixin(Game_Action, Game_Action_Mixin);
