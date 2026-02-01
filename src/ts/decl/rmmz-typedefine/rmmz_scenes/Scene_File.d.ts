declare class Scene_File extends Scene_MenuBase {
    protected _listWindow: Window_SavefileList;
    initialize(): void;
    create(): void;
    helpAreaHeight(): number;
    start(): void;
    savefileId(): number;
    isSavefileEnabled(savefileId: number): boolean;
    createHelpWindow(): void;
    helpWindowRect(): Rectangle;
    createListWindow(): void;
    listWindowRect(): Rectangle;
    mode(): "save" | "load" | null;
    needsAutosave(): boolean;
    activateListWindow(): void;
    helpWindowText(): string;
    firstSavefileId(): number;
    onSavefileOk(): void;
}
