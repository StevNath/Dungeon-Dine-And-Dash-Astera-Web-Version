declare class Scene_Load extends Scene_File {
    protected _loadSuccess: boolean;
    initialize(): void;
    terminate(): void;
    mode(): "load";
    helpWindowText(): string;
    firstSavefileId(): number;
    onSavefileOk(): void;
    executeLoad(savefileId: number): void;
    onLoadSuccess(): void;
    onLoadFailure(): void;
    reloadMapIfUpdated(): void;
}
