import { ARPG_ItemShortcutPluginParams } from "Main";

export class Window_RegistShortcutOrUse extends Window_Command {
    private _useItemEnabled!: boolean;
    private _useRegisterShortcutEnabled!: boolean;

    initialize(rect: Rectangle): void {
        super.initialize(rect);
        this._useItemEnabled = false;
        this._useRegisterShortcutEnabled = false;
    }

    makeCommandList(): void {
        this.addCommand(ARPG_ItemShortcutPluginParams.Text.UseItem, "use", this._useItemEnabled);
        this.addCommand(ARPG_ItemShortcutPluginParams.Text.RegisterShortcut, "registShortcut", this._useRegisterShortcutEnabled);
    }

    setUseItemEnabled(isEnabled: boolean): void {
        this._useItemEnabled = isEnabled;
    }

    setUseRegisterShortcutEnabled(isEnabled: boolean): void {
        this._useRegisterShortcutEnabled = isEnabled;
    }
}
