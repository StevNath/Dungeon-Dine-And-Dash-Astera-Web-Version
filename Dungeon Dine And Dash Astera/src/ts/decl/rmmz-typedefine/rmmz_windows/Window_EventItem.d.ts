declare class Window_EventItem extends Window_ItemList {
    protected _messageWindow: Window_Message;
    protected _cancelButton: Sprite_Button;
    initialize(rect: Rectangle): void;
    setMessageWindow(messageWindow: Window_Message): void;
    createCancelButton(): void;
    start(): void;
    update(): void;
    updateCancelButton(): void;
    updatePlacement(): void;
    placeCancelButton(): void;
    includes(item: RMMZData.Item): boolean | null;
    needsNumber(): boolean;
    isEnabled(item: RMMZData.Item): boolean;
    onOk(): void;
    onCancel(): void;
}
