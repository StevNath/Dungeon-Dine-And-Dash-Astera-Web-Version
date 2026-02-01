import { Window_CommonMessage } from "ARPG_Core/Window_CommonMessage";
import { ARPG_Utils } from "ARPG_Utils";
import { mixin } from "../CommonLibrary/mixin";
import { ARPG_CorePluginParams } from "./ARPG_Config";

declare global {
    interface Scene_Map {
        _setupBossHpGaugeCompleted: boolean;

        createSkillNameWindowCallback(window: Window_CommonMessage): void;
        deleteSkillNameWindowCallback(window: Window_CommonMessage): void;
    }
}

if (!Scene_Map.prototype.hasOwnProperty("isAutosaveEnabled")) {
    Scene_Map.prototype.isAutosaveEnabled = function() {
        return Scene_Base.prototype.isAutosaveEnabled.call(this);
    };
}

class Scene_Map_Mixin extends Scene_Map {
    static _initialize = Scene_Map.prototype.initialize;
    static _start = Scene_Map.prototype.start;
    static _update = Scene_Map.prototype.update;
    static _checkGameover = Scene_Map.prototype.checkGameover;
    static _isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
    static _updateMain = Scene_Map.prototype.updateMain;
    static _isAutosaveEnabled = Scene_Map.prototype.isAutosaveEnabled;

    initialize() {
        Scene_Map_Mixin._initialize.call(this);
        this._setupBossHpGaugeCompleted = false;
    }

    start() {
        Scene_Map_Mixin._start.call(this);
        $gameMap.startSceneIndication(this);
    }

    update() {
        Scene_Map_Mixin._update.call(this);
        if (!this._setupBossHpGaugeCompleted) {
            const battler = $gameTemp.arpgGlobalTempData().bossHpGaugeTargetEnemy;
            if (battler) {
                this._spriteset.setupBossHpGauge(battler);
                this._setupBossHpGaugeCompleted = true;
            }
        }
    }

    terminate() {
        Scene_Message.prototype.terminate.call(this);
        if (!SceneManager.isNextScene(Scene_Battle)) {
            this._spriteset.update();
            (this as any)._mapNameWindow.hide();
            this.hideMenuButton();
            SceneManager.snapForBackground();
        }
        $gameScreen.clearZoom();
        $gameMap.terminateSceneIndication(this);
    }

    createSpriteset() {
        if (!this._spriteset) {
            this._spriteset = new Spriteset_Map();
            (this as any).addChild(this._spriteset);
            this._spriteset.update();
        }
    }

    createSkillNameWindowCallback(window: Window_CommonMessage) {
        this.addWindow(window);
    }

    deleteSkillNameWindowCallback(window: Window_CommonMessage) {
        (this as any)._windowLayer.removeChild(window);
    }

    checkGameover() {
        // ARPGモード中のゲームオーバーについてはARPG_BattleManager#gameoverで処理する。
        if (!$gameMap.isEnabledARPGMode()) {
            Scene_Map_Mixin._checkGameover.call(this);
        }
    }

    isMenuEnabled(): boolean {
        const result = Scene_Map_Mixin._isMenuEnabled.call(this);
        if (!result) return false;
        if ($gameMap.isEnabledARPGMode()) {
            if ($gamePlayer.battler().isChanting()) return false;
        }
        return true;
    }

    isMenuCalled(): boolean {
        if (TouchInput.isCancelled()) return true;
        let keysym = ARPG_Utils.getKeySymbol("Menu");
        if (keysym == null) keysym = "menu";
        if (Input.isTriggered(keysym)) return true;
        return false;
    }

    updateMain() {
        $gameTemp.arpgGlobalTempData().controlCharacter.update();
        if (!$gameMap.isStopped()) {
            Scene_Map_Mixin._updateMain.call(this);
        }
    }

    isAutosaveEnabled(): boolean {
        const result = Scene_Map_Mixin._isAutosaveEnabled.call(this);
        if (!result) return false;
        if ($gameMap.isEnabledARPGMode()) return false;
        return true;
    }
}

mixin(Scene_Map, Scene_Map_Mixin);
