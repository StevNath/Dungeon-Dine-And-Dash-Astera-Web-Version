declare class Window_ItemList extends Window_Selectable {
    protected _category: string | null;
    protected _data: any[];
    initialize(rect: Rectangle): void;
    setCategory(category: string | null): void;
    maxCols(): number;
    colSpacing(): number;
    maxItems(): number;
    item(): any;
    itemAt(index: number): any;
    isCurrentItemEnabled(): boolean;
    includes(item: RMMZData.Weapon | RMMZData.Armor | RMMZData.Item | null): boolean | null;
    needsNumber(): boolean;
    isEnabled(item: RMMZData.Weapon | RMMZData.Armor | RMMZData.Item): boolean;
    makeItemList(): void;
    selectLast(): void;
    drawItem(index: number): void;
    numberWidth(): number;
    drawItemNumber(item: any, x: number, y: number, width: number): void;
    updateHelp(): void;
    refresh(): void;
}
