declare class Game_Troop extends Game_Unit<Game_Enemy> {
    static LETTER_TABLE_HALF: string[];
    static LETTER_TABLE_FULL: string[];
    protected _interpreter: Game_Interpreter;
    protected _turnCount: number;
    protected _enemies: Game_Enemy[];
    protected _troopId: number;
    protected _eventFlags: {
        [key: number]: boolean;
    };
    protected _namesCount: {
        [key: string]: number;
    };
    initialize(): void;
    isEventRunning(): boolean;
    updateInterpreter(): void;
    turnCount(): number;
    members(): Game_Enemy[];
    clear(): void;
    troop(): RMMZData.Troop;
    setup(troopId: number): void;
    makeUniqueNames(): void;
    updatePluralFlags(): void;
    letterTable(): string[];
    enemyNames(): string[];
    meetsConditions(page: any): boolean;
    setupBattleEvent(): void;
    increaseTurn(): void;
    expTotal(): number;
    goldTotal(): number;
    goldRate(): 1 | 2;
    makeDropItems(): ItemObject[];
    isTpbTurnEnd(): boolean;
}
