declare class Scene_Save extends Scene_File {
    initialize(): void;
    mode(): "save";
    helpWindowText(): string;
    firstSavefileId(): number;
    onSavefileOk(): void;
    executeSave(savefileId: number): void;
    onSaveSuccess(): void;
    onSaveFailure(): void;
}
