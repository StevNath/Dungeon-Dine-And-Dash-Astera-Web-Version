import { mixin } from "CommonLibrary/mixin";

class Game_Map_Mixin extends Game_Map {
    static _refresh = Game_Map.prototype.refresh;

    // NOTE: アイテム入手時にショートカットをリフレッシュする。
    refresh(): void {
        Game_Map_Mixin._refresh.call(this);
        $shortcutTempData.requestRefreshShortcutWindow();
    }
}

mixin(Game_Map, Game_Map_Mixin);
