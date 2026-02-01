declare class Window_MenuStatus extends Window_StatusBase {
    protected _formationMode: boolean;
    protected _pendingIndex: number;
    initialize(rect: Rectangle): void;
    maxItems(): number;
    numVisibleRows(): number;
    itemHeight(): number;
    actor(index: number): Game_Actor;
    drawItem(index: number): void;
    drawPendingItemBackground(index: number): void;
    drawItemImage(index: number): void;
    drawItemStatus(index: number): void;
    processOk(): void;
    isCurrentItemEnabled(): boolean;
    selectLast(): void;
    formationMode(): boolean;
    setFormationMode(formationMode: boolean): void;
    pendingIndex(): number;
    setPendingIndex(index: number): void;
}
