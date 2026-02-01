import { mixin } from "CommonLibrary/mixin";

class Game_Actor_Mixin extends Game_Actor {
    static _forgetSkill = Game_Actor.prototype.forgetSkill;

    forgetSkill(skillId: number): void {
        Game_Actor_Mixin._forgetSkill.call(this, skillId);
        $shortcutTempData.requestRefreshShortcutWindow();
    }
}

mixin(Game_Actor, Game_Actor_Mixin);
