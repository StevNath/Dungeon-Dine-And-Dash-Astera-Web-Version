declare class Window_EquipItem extends Window_ItemList {
    protected _actor: Game_Actor | null;
    protected _slotId: number;
    protected _statusWindow: Window_EquipStatus;
    initialize(rect: Rectangle): void;
    maxCols(): number;
    colSpacing(): number;
    setActor(actor: Game_Actor): void;
    setSlotId(slotId: number): void;
    includes(item: RMMZData.Weapon | RMMZData.Armor | null): boolean | null;
    etypeId(): number;
    isEnabled(): boolean;
    selectLast(): void;
    setStatusWindow(statusWindow: Window_EquipStatus): void;
    updateHelp(): void;
    playOkSound(): void;
}
