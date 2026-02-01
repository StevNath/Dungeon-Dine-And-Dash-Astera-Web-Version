declare class Window_BattleEnemy extends Window_Selectable {
    protected _enemies: any[];
    initialize(rect: Rectangle): void;
    maxCols(): number;
    maxItems(): number;
    enemy(): any;
    enemyIndex(): any;
    drawItem(index: number): void;
    show(): void;
    hide(): void;
    refresh(): void;
    select(index: number): void;
    processTouch(): void;
}
