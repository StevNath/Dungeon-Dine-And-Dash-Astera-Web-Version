declare class Scene_Title extends Scene_Base {
    protected _commandWindow: any;
    protected _gameTitleSprite: any;
    protected _backSprite1: Sprite;
    protected _backSprite2: Sprite;
    initialize(): void;
    create(): void;
    start(): void;
    update(): void;
    isBusy(): any;
    terminate(): void;
    createBackground(): void;
    createForeground(): void;
    drawGameTitle(): void;
    adjustBackground(): void;
    createCommandWindow(): void;
    commandWindowRect(): Rectangle;
    commandNewGame(): void;
    commandContinue(): void;
    commandOptions(): void;
    playTitleMusic(): void;
}
