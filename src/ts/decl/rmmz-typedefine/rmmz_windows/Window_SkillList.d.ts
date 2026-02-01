declare class Window_SkillList extends Window_Selectable {
    protected _actor: Game_Actor | null;
    protected _stypeId: number;
    protected _data: RMMZData.Item[];
    initialize(rect: Rectangle): void;
    setActor(actor: Game_Actor): void;
    setStypeId(stypeId: number): void;
    maxCols(): number;
    colSpacing(): number;
    maxItems(): number;
    item(): RMMZData.Item | null;
    itemAt(index: number): RMMZData.Item | null;
    isCurrentItemEnabled(): boolean;
    includes(item: RMMZData.Item): boolean;
    isEnabled(item: RMMZData.Item): boolean;
    makeItemList(): void;
    selectLast(): void;
    drawItem(index: number): void;
    costWidth(): number;
    drawSkillCost(skill: RMMZData.Item, x: number, y: number, width: number): void;
    updateHelp(): void;
    refresh(): void;
}
