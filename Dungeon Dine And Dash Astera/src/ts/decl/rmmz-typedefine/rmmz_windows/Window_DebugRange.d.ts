declare class Window_DebugRange extends Window_Selectable {
    static lastTopRow: number;
    static lastIndex: number;
    protected _maxSwitches: number;
    protected _maxVariables: number;
    protected _editWindow: Window_DebugEdit;
    initialize(rect: Rectangle): void;
    maxItems(): number;
    update(): void;
    mode(index?: number): "switch" | "variable";
    topId(index: number): number;
    isSwitchMode(index: number): boolean;
    drawItem(index: number): void;
    isCancelTriggered(): boolean;
    processCancel(): void;
    setEditWindow(editWindow: Window_DebugEdit): void;
}
