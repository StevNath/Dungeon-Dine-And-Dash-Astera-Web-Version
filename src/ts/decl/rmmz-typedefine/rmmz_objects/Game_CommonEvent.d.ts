declare class Game_CommonEvent {
    protected _commonEventId: number;
    protected _interpreter: Game_Interpreter | null;
    constructor(commonEventId: number);
    initialize(commonEventId: number): void;
    event(): RMMZData.CommonEvent;
    list(): RMMZData.EventCommand[];
    refresh(): void;
    isActive(): boolean;
    update(): void;
}
