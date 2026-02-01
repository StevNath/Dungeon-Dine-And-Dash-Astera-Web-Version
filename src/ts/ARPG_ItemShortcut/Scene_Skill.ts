import { ShortcutRegisterSceneModule } from "./ShortcutRegisterSceneModule";
import { mixin } from "CommonLibrary/mixin";

declare global {
    interface Scene_Skill extends ShortcutRegisterSceneModule {
    }
}

const _Scene_Skill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
    _Scene_Skill_create.call(this);
    this.createItemShortcutWindows();
};

const _Scene_Skill_update = Scene_Skill.prototype.update;
Scene_Skill.prototype.update = function(this: Scene_Skill) {
    _Scene_Skill_update.call(this);
    if (this._shortcutWindow.index() < 0) {
        this._shortcutWindow.select($shortcutTempData.skillMenuSelectIndex);
    } else {
        $shortcutTempData.skillMenuSelectIndex = this._shortcutWindow.index();
    }
};

Scene_Skill.prototype.onUseItem = function() {
    this.actor().setLastMenuSkill(this.item());
    this.determineItem();
};

mixin(Scene_Skill, ShortcutRegisterSceneModule);
