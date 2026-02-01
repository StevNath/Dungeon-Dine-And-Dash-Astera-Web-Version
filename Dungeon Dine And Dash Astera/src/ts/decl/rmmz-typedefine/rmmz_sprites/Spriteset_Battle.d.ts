declare class Spriteset_Battle extends Spriteset_Base {
    protected _battlebackLocated: boolean;
    protected _backgroundFilter: PIXI.filters.BlurFilter;
    protected _backgroundSprite: Sprite;
    protected _back1Sprite: Sprite_Battleback;
    protected _back2Sprite: Sprite_Battleback;
    protected _battleField: Sprite;
    protected _enemySprites: Sprite_Enemy[];
    protected _actorSprites: Sprite_Actor[];
    initialize(): void;
    loadSystemImages(): void;
    createLowerLayer(): void;
    createBackground(): void;
    createBattleback(): void;
    createBattleField(): void;
    battleFieldOffsetY(): number;
    update(): void;
    updateBattleback(): void;
    createEnemies(): void;
    compareEnemySprite(a: Sprite_Enemy, b: Sprite_Enemy): number;
    createActors(): void;
    updateActors(): void;
    findTargetSprite(target: any): any;
    battlerSprites(): Sprite_Battler[];
    isEffecting(): boolean;
    isAnyoneMoving(): boolean;
    isBusy(): boolean;
}
