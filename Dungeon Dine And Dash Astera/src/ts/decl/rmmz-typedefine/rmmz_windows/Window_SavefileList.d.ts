declare class Window_SavefileList extends Window_Selectable {
    protected _mode: "save" | "load" | null;
    protected _autosave: boolean;
    initialize(rect: Rectangle): void;
    setMode(mode: "save" | "load" | null, autosave: boolean): void;
    maxItems(): number;
    numVisibleRows(): number;
    itemHeight(): number;
    drawItem(index: number): void;
    indexToSavefileId(index: number): number;
    savefileIdToIndex(savefileId: number): number;
    isEnabled(savefileId: number): boolean;
    savefileId(): number;
    selectSavefile(savefileId: any): void;
    drawTitle(savefileId: string | number, x: number, y: number): void;
    drawContents(info: ISaveInfo, rect: Rectangle): void;
    drawPartyCharacters(info: ISaveInfo, x: any, y: number): void;
    drawPlaytime(info: ISaveInfo, x: number, y: number, width: number | undefined): void;
    playOkSound(): void;
}
