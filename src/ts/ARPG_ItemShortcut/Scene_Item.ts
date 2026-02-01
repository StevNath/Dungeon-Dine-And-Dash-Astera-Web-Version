import { ShortcutRegisterSceneModule } from "./ShortcutRegisterSceneModule";
import { mixin } from "CommonLibrary/mixin";

declare global {
    interface Scene_Item extends ShortcutRegisterSceneModule {
    }
}

const _Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
    _Scene_Item_create.call(this);
    this.createItemShortcutWindows();
};

const _Scene_Item_update = Scene_Item.prototype.update;
Scene_Item.prototype.update = function(this: Scene_Item) {
    _Scene_Item_update.call(this);
    if (this._shortcutWindow.index() < 0) {
        this._shortcutWindow.select($shortcutTempData.itemMenuSelectIndex);
    } else {
        $shortcutTempData.itemMenuSelectIndex = this._shortcutWindow.index();
    }
};

Scene_Item.prototype.onUseItem = function() {
    $gameParty.setLastItem(this.item());
    this.determineItem();
};

mixin(Scene_Item, ShortcutRegisterSceneModule);
