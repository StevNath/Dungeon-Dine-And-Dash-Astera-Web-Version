declare class Scene_Options extends Scene_MenuBase {
    protected _optionsWindow: Window_Options;
    initialize(): void;
    create(): void;
    terminate(): void;
    createOptionsWindow(): void;
    optionsWindowRect(): Rectangle;
    maxCommands(): number;
    maxVisibleCommands(): number;
}
