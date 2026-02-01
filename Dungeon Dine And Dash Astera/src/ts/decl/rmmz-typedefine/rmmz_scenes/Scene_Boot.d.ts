declare class Scene_Boot extends Scene_Base {
    protected _databaseLoaded: boolean;
    initialize(): void;
    create(): void;
    isReady(): boolean;
    onDatabaseLoaded(): void;
    setEncryptionInfo(): void;
    loadSystemImages(): void;
    loadPlayerData(): void;
    loadGameFonts(): void;
    isPlayerDataLoaded(): boolean;
    start(): void;
    startNormalGame(): void;
    resizeScreen(): void;
    adjustBoxSize(): void;
    adjustWindow(): void;
    screenScale(): number;
    updateDocumentTitle(): void;
    checkPlayerLocation(): void;
}
