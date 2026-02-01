declare class Scene_GameEnd extends Scene_MenuBase {
    _commandWindow: Window_GameEnd;
    initialize(): void;
    create(): void;
    stop(): void;
    createBackground(): void;
    createCommandWindow(): void;
    commandWindowRect(): Rectangle;
    commandToTitle(): void;
}
