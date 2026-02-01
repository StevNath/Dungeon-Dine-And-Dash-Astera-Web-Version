declare const DotMoveSystem_FunctionExPluginName: string;
declare interface Game_CharacterBase {
    _dpf?: number;
    _acceleration: number;
    _inertia: number;
    _accelerationPlus: number;
    _maxAcceleration: number;
    _enableWallSlide: boolean;
    _currentDpf: number;
    _jumpXPlus?: number;
    _jumpYPlus?: number;
    _smartJumpLastThrough?: boolean;
    canPushEvent(): boolean;
    originDistancePerFrame(): number;
    updateCurrentDpf(): void;
    setDpf(dpf: number | undefined): void;
    setAcc(maxAcc: number, accPlus: number): void;
    setInertia(inertia: number): void;
    isNeedUpdateAcceleration(): boolean;
    updateAcceleration(): void;
    inertiaMoveProcess(): void;
    cancelAcceleration(): void;
    smartJump(xPlus: number, yPlus: number, baseJumpPeak?: number, through?: boolean): void;
    smartJumpByDeg(deg: number, far: number, baseJumpPeak: number, through: boolean): void;
    smartJumpAbs(x: number, y: number, baseJumpPeak?: number, through?: boolean): void;
    isSmartJumping(): boolean;
    updateSmartJump(): void;
    realDpf(): number;
    isEnabledWallSlide(): boolean;
    setEnableWallSlide(bool: boolean): void;
}
declare interface Game_Player {
    _transferOffsetX: number;
    _transferOffsetY: number;
    _enableTransferOffset: boolean;
    setEnableTransferOffset(bool: boolean): void;
}
declare interface Game_Follower {
    _transferOffsetX: number;
    _transferOffsetY: number;
    calcFollowerDpf(precedingCharacterFar: number): number;
}
declare interface Game_Event {
    _pushableEvent?: boolean;
    isPushableEvent(): boolean;
}
declare namespace DotMoveSystem {
    interface CharacterCollisionChecker {
        checkEventsPrepare(): number[];
        getMassRects(x: number, y: number): DotMoveRectangle[];
        getMassCollisionType(x: number, y: number): number;
        checkCollisionMassLeftUp(subjectRect: DotMoveRectangle, d: number, ix: number, iy: number): CollisionResult<FunctionEx.TriangleMassInfo>[];
        checkCollisionMassDownLeft(subjectRect: DotMoveRectangle, d: number, ix: number, iy: number): CollisionResult<FunctionEx.TriangleMassInfo>[];
        checkCollisionMassRightDown(subjectRect: DotMoveRectangle, d: number, ix: number, iy: number): CollisionResult<FunctionEx.TriangleMassInfo>[];
        checkCollisionMassUpRight(subjectRect: DotMoveRectangle, d: number, ix: number, iy: number): CollisionResult<FunctionEx.TriangleMassInfo>[];
        calcMassTriangle(id: number, characterRect: DotMoveRectangle, direction: number, ix: number, iy: number): DotMoveRectangle;
    }
    interface CharacterDotMoveProcess {
        checkCollisionResultIsAllTriangleMass(collisionResults: CollisionResult<unknown>[], type: number): boolean;
    }
    interface CharacterMover {
        _lastDirection: number;
        _changeDirectionCount: number;
        _direction8: number;
        _reserveChangeDirection: boolean;
        _reserveSetDirection?: number;
        dotMoveByDirection(direction: number, dpf?: number, opt?: {
            changeDir?: boolean;
        }): void;
        updateChangeDirection(): void;
        setDirection8(direction8: number): void;
        direction8(): number;
        changeDirectionWhenDotMove(direction: number): void;
    }
    interface CharacterMover {
        eventPushProcess(): void;
    }
}
declare namespace DotMoveSystem.FunctionEx {
    class PluginParamsParser {
        private _predictEnable;
        static parse(params: any, typeData?: any, predictEnable?: boolean): any;
        constructor(predictEnable?: boolean);
        parse(params: any, typeData?: any): any;
        expandParam(strParam: string, loopCount?: number): any;
        convertParam(param: any, type: any, loopCount?: number): any;
        cast(param: any, type: any): any;
        predict(param: any): string;
    }
    class TriangleMassInfo extends MassInfo {
        protected _type: number;
        get type(): number;
        set type(_type: number);
        initialize(x: number, y: number): void;
    }
}
