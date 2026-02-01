import { ARPG_Utils } from "ARPG_Core/ARPG_Utils";
import { Window_RegistShortcutOrUse } from "./Window_RegistShortcutOrUse";
import { Window_Shortcut } from "./Window_Shortcut";

const DialogWindowWidth = 400;

export abstract class ShortcutRegisterSceneModule extends Scene_ItemBase {
    protected _registShortcutOrUseWindow!: Window_RegistShortcutOrUse;
    protected _shortcutWindow!: Window_Shortcut;

    abstract onUseItem(): void;

    createItemShortcutWindows() {
        this.createRegistShortcutOrUseWindow();
        this.createShortcutWindow();
    }

    createRegistShortcutOrUseWindow() {
        this._registShortcutOrUseWindow = new Window_RegistShortcutOrUse(this.registShortcutOrUseWindowRect());
        this._registShortcutOrUseWindow.setHandler("ok", this.onRegistShortcutOrUseOk.bind(this));
        this._registShortcutOrUseWindow.setHandler("cancel", this.onRegistShortcutOrUseCancel.bind(this));
        this._registShortcutOrUseWindow.hide();
        this._registShortcutOrUseWindow.deactivate();
        this.addWindow(this._registShortcutOrUseWindow);
    }

    createShortcutWindow() {
        this._shortcutWindow = new Window_Shortcut(this.shortcutWindowRect());
        this._shortcutWindow.setHandler("ok", this.onShortcutOk.bind(this));
        this._shortcutWindow.setHandler("cancel", this.onShortcutCancel.bind(this));
        this._shortcutWindow.setHandler("shift", this.onShortcutRemove.bind(this));
        this._shortcutWindow.hide();
        this._shortcutWindow.deactivate();
        this.addWindow(this._shortcutWindow);
    }

    onRegistShortcutOrUseOk() {
        if (this._registShortcutOrUseWindow.currentSymbol() === "registShortcut") {
            this._registShortcutOrUseWindow.deactivate();
            this._shortcutWindow.refresh();
            this._shortcutWindow.show();
            this._shortcutWindow.activate();
        } else if (this._registShortcutOrUseWindow.currentSymbol() === "use") {
            this.onUseItem();
            this._registShortcutOrUseWindow.deactivate();
            this._registShortcutOrUseWindow.hide();
        } else {
            throw new Error(`${this._registShortcutOrUseWindow.currentSymbol()} is not found.`);
        }
    }

    onRegistShortcutOrUseCancel() {
        this._registShortcutOrUseWindow.deactivate();
        this._registShortcutOrUseWindow.hide();
        this._itemWindow.activate();
    }

    onShortcutOk() {
        this._registShortcutOrUseWindow.activate();
        this._registShortcutOrUseWindow.show();
        this._shortcutWindow.deactivate();
        this._shortcutWindow.hide();
        const actorId = this.actor().actorId();
        $shortcutStatus.setShortcut(actorId, this._shortcutWindow.index(), new Game_Item(this.item()));
        $shortcutTempData.mapSelectIndex = this._shortcutWindow.index();
    }

    onShortcutCancel() {
        this._registShortcutOrUseWindow.activate();
        this._registShortcutOrUseWindow.show();
        this._shortcutWindow.deactivate();
        this._shortcutWindow.hide();
    }

    onShortcutRemove() {
        this._shortcutWindow.removeShortcut();
        this._shortcutWindow.refresh();
    }

    onActorCancel() {
        this.hideActorWindow();
        this._registShortcutOrUseWindow.show();
        this._registShortcutOrUseWindow.activate();
    }

    onItemOk() {
        const item = this._itemWindow.item();
        this._itemWindow.deactivate();
        this._registShortcutOrUseWindow.setUseItemEnabled(this._itemWindow.isCurrentItemEnabled());
        let useRegisterShortcutEnabled = false;
        if (ARPG_Utils.hasActionItem(item) && this._actor === $gameParty.leader()) {
            useRegisterShortcutEnabled = true;
        }
        this._registShortcutOrUseWindow.setUseRegisterShortcutEnabled(useRegisterShortcutEnabled);
        this._registShortcutOrUseWindow.refresh();
        this._registShortcutOrUseWindow.show();
        this._registShortcutOrUseWindow.activate();
    }

    registShortcutOrUseWindowRect() {
        const w = DialogWindowWidth;
        const h = 120;
        const x = (Graphics.boxWidth - w) / 2;
        const y = (Graphics.boxHeight - h) / 2;
        return new Rectangle(x, y, w, h);
    }

    shortcutWindowRect() {
        const registShortcutOrUseWindowRect = this.registShortcutOrUseWindowRect();
        const w = 50 * $shortcutStatus.numSlots();
        const h = 70;
        const x = (Graphics.boxWidth - w) / 2;
        const y = registShortcutOrUseWindowRect.y + registShortcutOrUseWindowRect.height;
        return new Rectangle(x, y, w, h);
    }
}
