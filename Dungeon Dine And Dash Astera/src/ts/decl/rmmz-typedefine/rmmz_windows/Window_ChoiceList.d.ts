declare class Window_ChoiceList extends Window_Command {
    protected _background: number;
    protected _messageWindow: Window_Message;
    protected _cancelButton: Sprite_Button;
    constructor();
    initialize(): void;
    setMessageWindow(messageWindow: Window_Message): void;
    createCancelButton(): void;
    start(): void;
    update(): void;
    updateCancelButton(): void;
    selectDefault(): void;
    updatePlacement(): void;
    updateBackground(): void;
    placeCancelButton(): void;
    windowX(): number;
    windowY(): number;
    windowWidth(): number;
    windowHeight(): number;
    numVisibleRows(): number;
    maxLines(): 4 | 8;
    maxChoiceWidth(): number;
    makeCommandList(): void;
    drawItem(index: number): void;
    isCancelEnabled(): boolean;
    needsCancelButton(): boolean;
    callOkHandler(): void;
    callCancelHandler(): void;
}
