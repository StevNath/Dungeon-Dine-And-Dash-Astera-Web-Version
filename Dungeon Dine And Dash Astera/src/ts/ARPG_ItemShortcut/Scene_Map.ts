import { Window_MapShortcut } from "./Window_MapShortcut";
import { Sprite_Label } from "ARPG_Core/Sprite_Label";

declare global {
    interface Scene_Map {
        _shortcutWindowLastIndex: number;
        _shortcutWindow: Window_MapShortcut;
        _shortcutLabel: Sprite_Label;

        createShortcutWindow(): void;
        shortcutWindowRect(): Rectangle;
        createShortcutLabel(): void;
        updateShortcutLabel(): void;
        updateShortcut(): void;
        refreshShortcutLabel(): void;
    }
}

const _Scene_Map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
    _Scene_Map_initialize.call(this);
    this._shortcutWindowLastIndex = -1;
};

const _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    this.updateShortcut();
};

const _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);
    this.updateShortcut();
};

Scene_Map.prototype.updateShortcut = function() {
    if ($shortcutStatus.isEnabledItemShortcut()) {
        if (this._shortcutWindow.index() < 0) {
            this._shortcutWindow.select($shortcutTempData.mapSelectIndex);
        } else {
            $shortcutTempData.mapSelectIndex = this._shortcutWindow.index();
        }
        this._shortcutWindow.activate();
        this._shortcutWindow.show();
    } else {
        this._shortcutWindow.deactivate();
        this._shortcutWindow.hide();
    }

    if ($shortcutTempData.checkRefreshShortcutWindowRequest()) {
        $shortcutStatus.refresh();
        this._shortcutWindow.refresh();
        this.refreshShortcutLabel();
    } else {
        this.updateShortcutLabel();
    }
};

Scene_Map.prototype.updateShortcutLabel = function() {
    if (this._shortcutWindow.index() !== this._shortcutWindowLastIndex) {
        this.refreshShortcutLabel();
        this._shortcutWindowLastIndex = this._shortcutWindow.index();
    }
};

Scene_Map.prototype.refreshShortcutLabel = function() {
    if ($shortcutStatus.isEnabledItemShortcut()) {
        const actorId = $gameParty.leader().actorId();
        this._shortcutWindowLastIndex = this._shortcutWindow.index();
        const item = $shortcutStatus.shortcut(actorId, this._shortcutWindow.index());
        if (item) {
            this._shortcutLabel.text = item.object()!.name;
        } else {
            this._shortcutLabel.text = "";
        }
    } else {
        this._shortcutLabel.text = "";
    }
};

const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    this.createShortcutWindow();
    _Scene_Map_createAllWindows.call(this);
}

Scene_Map.prototype.createShortcutWindow = function() {
    this._shortcutWindow = new Window_MapShortcut(this.shortcutWindowRect());
    this._shortcutWindow.hide();
    this._shortcutWindow.refresh();
    this._shortcutWindow.activate();
    this.addWindow(this._shortcutWindow);
};

Scene_Map.prototype.shortcutWindowRect = function() {
    const width = 50 * $shortcutStatus.numSlots();
    const height = 70;
    const x = Graphics.boxWidth - width;
    const y = Graphics.boxHeight - height;
    return new Rectangle(x, y, width, height);
};

const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    this.createShortcutLabel();
};

Scene_Map.prototype.createShortcutLabel = function(this: Scene_Map) {
    const rect = this.shortcutWindowRect();
    this._shortcutLabel = new Sprite_Label(rect.width, 48);
    this._shortcutLabel.x = rect.x;
    this._shortcutLabel.y = rect.y - this._shortcutLabel.height + 8;
    this._shortcutLabel.hide();
    this._spriteset.addShortcutLabel(this._shortcutLabel);
};
