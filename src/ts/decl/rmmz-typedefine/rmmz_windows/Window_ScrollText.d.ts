declare class Window_ScrollText extends Window_Base {
    protected _reservedRect: Rectangle;
    protected _text: string | null;
    protected _allTextHeight: number;
    initialize(rect: Rectangle): void;
    update(): void;
    startMessage(): void;
    refresh(): void;
    updatePlacement(): void;
    contentsHeight(): number;
    updateMessage(): void;
    scrollSpeed(): number;
    isFastForward(): boolean;
    fastForwardRate(): number;
    terminateMessage(): void;
}
