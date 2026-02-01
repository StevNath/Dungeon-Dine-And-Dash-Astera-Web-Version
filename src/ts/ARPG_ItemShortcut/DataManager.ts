import { ShortcutTempData } from "ShortcutTempData";
import { ShortcutStatus } from "./ShortcutStatus";

const _DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    _DataManager_createGameObjects.call(this);
    $shortcutStatus = new ShortcutStatus();
    $shortcutTempData = new ShortcutTempData();
};

const _DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    const result = _DataManager_makeSaveContents.call(this);
    result.shortcutStatus = $shortcutStatus.makeSaveData();
    return result;
};

const _DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    _DataManager_extractSaveContents.call(this, contents);
    $shortcutStatus = new ShortcutStatus();
    $shortcutStatus.loadSaveData(contents.shortcutStatus);
};
