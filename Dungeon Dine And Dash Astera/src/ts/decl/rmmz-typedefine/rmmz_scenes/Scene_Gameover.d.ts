declare class Scene_Gameover extends Scene_Base {
    _backSprite: Sprite;
    initialize(): void;
    create(): void;
    start(): void;
    update(): void;
    stop(): void;
    terminate(): void;
    playGameoverMusic(): void;
    createBackground(): void;
    adjustBackground(): void;
    isTriggered(): boolean;
    gotoTitle(): void;
}
