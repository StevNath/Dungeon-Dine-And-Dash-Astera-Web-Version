declare class Game_Temp {
    protected _isPlaytest: boolean;
    protected _destinationX: number | null;
    protected _destinationY: number | null;
    protected _touchTarget: any;
    protected _touchState: string;
    protected _needsBattleRefresh: boolean;
    protected _commonEventQueue: number[];
    protected _animationQueue: IAnimationRequest[];
    protected _balloonQueue: IBalloonRequest[];
    protected _lastActionData: number[];
    constructor();
    initialize(): void;
    isPlaytest(): boolean;
    setDestination(x: number, y: number): void;
    clearDestination(): void;
    isDestinationValid(): boolean;
    destinationX(): number | null;
    destinationY(): number | null;
    setTouchState(target: any, state: string): void;
    clearTouchState(): void;
    touchTarget(): any;
    touchState(): string;
    requestBattleRefresh(): void;
    clearBattleRefreshRequest(): void;
    isBattleRefreshRequested(): boolean;
    reserveCommonEvent(commonEventId: number): void;
    retrieveCommonEvent(): RMMZData.CommonEvent;
    clearCommonEventReservation(): void;
    isCommonEventReserved(): boolean;
    requestAnimation(targets: (Game_Character | Game_Battler)[], animationId: number, mirror?: boolean): void;
    retrieveAnimation(): IAnimationRequest | undefined;
    requestBalloon(target: Game_Character, balloonId: number): void;
    retrieveBalloon(): IBalloonRequest | undefined;
    lastActionData(type: number): number;
    setLastActionData(type: number, value: number): void;
    setLastUsedSkillId(skillID: number): void;
    setLastUsedItemId(itemID: number): void;
    setLastSubjectActorId(actorID: number): void;
    setLastSubjectEnemyIndex(enemyIndex: number): void;
    setLastTargetActorId(actorID: number): void;
    setLastTargetEnemyIndex(enemyIndex: number): void;
}
interface IAnimationRequest {
    targets: (Game_Character | Game_Battler)[];
    animationId: number;
    mirror: boolean;
}
interface IBalloonRequest {
    target: Game_Character;
    balloonId: number;
}
