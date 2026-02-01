declare class Window_ShopStatus extends Window_StatusBase {
    protected _item: ItemObject | null;
    protected _pageIndex: number;
    initialize(rect: Rectangle): void;
    refresh(): void;
    setItem(item: ItemObject | null): void;
    isEquipItem(): boolean | null;
    drawPossession(x: number, y: number): void;
    drawEquipInfo(x: number, y: number): void;
    statusMembers(): Game_Actor[];
    pageSize(): number;
    maxPages(): number;
    drawActorEquipInfo(x: number, y: number, actor: Game_Actor): void;
    drawActorParamChange(x: number, y: number, actor: Game_Actor, item1: ItemObject): void;
    paramId(): 2 | 3;
    currentEquippedItem(actor: Game_Actor, etypeId: number | undefined): RMMZData.Armor | RMMZData.Weapon | null;
    update(): void;
    updatePage(): void;
    isPageChangeEnabled(): boolean;
    isPageChangeRequested(): boolean;
    changePage(): void;
}
