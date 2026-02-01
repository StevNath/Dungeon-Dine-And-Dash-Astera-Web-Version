declare class Window_BattleActor extends Window_BattleStatus {
    initialize(...args: any[]): void;
    show(): void;
    hide(): void;
    select(index: number): void;
    processTouch(): void;
}
