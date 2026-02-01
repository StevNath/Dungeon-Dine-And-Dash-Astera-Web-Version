import { ARPG_Utils } from "ARPG_Core/ARPG_Utils";
import { PlayerBehavior } from "ARPG_Core/PlayerBehavior";
import { Component } from "CommonLibrary/Component";
import { mixin } from "CommonLibrary/mixin";

class PlayerBehavior_Mixin extends PlayerBehavior {
    static _onInit = (PlayerBehavior.prototype as any).setup;

    protected setup(): void {
        PlayerBehavior_Mixin._onInit.call(this);
        this.addComponent(new UseShortcutItemProcess());
    }
}

mixin(PlayerBehavior, PlayerBehavior_Mixin);

class UseShortcutItemProcess extends Component<Game_Player> {
    protected update(): void {
        super.update();
        let requested = $shortcutTempData.checkUseShortcutItemRequested();
        const keysym = ARPG_Utils.getKeySymbol("UseShortcutItem");
        if (keysym && Input.isTriggered(keysym)) {
            requested = true;
        }
        if (requested) {
            this.useShortcutItem();
        }
    }

    private useShortcutItem(): void {
        const actorId = $gameParty.leader().actorId();
        const index = (SceneManager._scene as any)._shortcutWindow.index();
        const item = $shortcutStatus.shortcut(actorId, index);
        if (item) {
            let skillOrItem: "skill" | "item";
            if (item.isSkill()) {
                skillOrItem = "skill";
            } else {
                skillOrItem = "item";
            }
            this.user().battler().useSkill(skillOrItem, item.object()!.id);
        } else {
            SoundManager.playBuzzer();
        }
    }
}
