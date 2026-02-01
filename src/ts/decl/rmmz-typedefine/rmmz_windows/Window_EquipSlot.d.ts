declare class Window_EquipSlot extends Window_StatusBase {
    protected _actor: Game_Actor | null;
    protected _itemWindow: Window_EquipItem;
    protected _statusWindow: Window_EquipStatus;
    initialize(rect: Rectangle): void;
    setActor(actor: Game_Actor): void;
    update(): void;
    maxItems(): number;
    item(): RMMZData.Armor | RMMZData.Weapon | null;
    itemAt(index: number): RMMZData.Armor | RMMZData.Weapon | null;
    drawItem(index: number): void;
    slotNameWidth(): number;
    isEnabled(index: number): boolean;
    isCurrentItemEnabled(): boolean;
    setStatusWindow(statusWindow: Window_EquipStatus): void;
    setItemWindow(itemWindow: Window_EquipItem): void;
    updateHelp(): void;
}
