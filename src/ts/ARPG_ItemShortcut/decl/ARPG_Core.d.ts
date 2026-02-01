declare module "CommonLibrary/ComponentRunner" {
    import { Component } from "CommonLibrary/Component";
    export class ComponentRunner<T> {
        private _components;
        private _user;
        private _end;
        constructor(user: T);
        prepareUpdate(): void;
        update(): void;
        addComponent(component: Component<T>): void;
        removeComponent(component: Component<T>): void;
        hasComponent(component: Component<T> | undefined): boolean;
        hasComponentByClass(componentClass: Function): boolean;
        end(): void;
        isEnd(): boolean;
    }
}
declare module "CommonLibrary/Component" {
    export abstract class Component<T> {
        private _user;
        private _end;
        private _terminated;
        private _started;
        private _componentRunner;
        private _stopped;
        private _calledSuperMethodNames;
        user(): T;
        setUser(user: T): void;
        isStarted(): boolean;
        isStopped(): boolean;
        isBusy(): boolean;
        stop(): void;
        resume(): void;
        isEnd(): boolean;
        isTerminated(): boolean;
        end(fastTerminate?: boolean): void;
        prepareUpdateComponent(): void;
        updateComponent(): void;
        addComponent(component: Component<T>): void;
        removeComponent(component: Component<T>): void;
        hasComponent(component: Component<T> | undefined): boolean;
        hasComponentByClass(componentClass: Function): boolean;
        protected setup(): void;
        protected start(): void;
        protected prepareUpdate(): void;
        protected update(): void;
        protected terminate(): void;
        private checkSuperMethodCalled;
    }
}
declare module "CommonLibrary/ChainComponent" {
    import { Component } from "CommonLibrary/Component";
    export class ChainComponent<T> extends Component<T> {
        private _componentIndex;
        private _components;
        private _running?;
        constructor(components: (Component<T> | Function | undefined)[]);
        protected start(): void;
        protected update(): void;
        private updateChain;
    }
}
declare module "CommonLibrary/CommonEventComponent" {
    import { Component } from "CommonLibrary/Component";
    export class CommonEventComponent<T extends Game_Character> extends Component<T> {
        protected _commonEventId: number;
        protected _interpreter: Game_Interpreter;
        constructor(commonEventId: number);
        interpreter(): Game_Interpreter;
        protected start(): void;
        protected update(): void;
        protected terminate(): void;
    }
}
declare module "CommonLibrary/Container" {
    export class Container extends PIXI.Container {
        protected _hidden: boolean;
        constructor(...args: any[]);
        initialize(...args: any[]): void;
        update(): void;
        hide(): void;
        show(): void;
        updateVisibility(): void;
        move(x: number, y: number): void;
    }
}
declare module "CommonLibrary/Degree" {
    export class Degree {
        private _value;
        get value(): number;
        static UP: Degree;
        static UP_RIGHT: Degree;
        static RIGHT: Degree;
        static RIGHT_DOWN: Degree;
        static DOWN: Degree;
        static DOWN_LEFT: Degree;
        static LEFT: Degree;
        static LEFT_UP: Degree;
        static fromDirection(direction: number): Degree;
        static fromRad(rad: number): Degree;
        constructor(...args: [number]);
        initialize(value: number): void;
        toRad(): number;
        toDirection8(): number;
        toDirection4(lastDirection: number): number;
        isInRange(min: Degree | number, max: Degree | number): boolean;
        add(degree: Degree | number): Degree;
        sub(degree: Degree | number): Degree;
    }
}
declare module "CommonLibrary/HttpResponse" {
    export class HttpResponse {
        private _result;
        private _xhr;
        constructor(result: string, xhr: XMLHttpRequest);
        result(): string;
        status(): number;
        response(): any;
    }
}
declare module "CommonLibrary/HttpRequest" {
    import { HttpResponse } from "CommonLibrary/HttpResponse";
    export class HttpRequest {
        private _path;
        private _method;
        private _mimeType?;
        static get(path: string, opt?: {
            mimeType?: string;
        }): Promise<HttpResponse>;
        static post(path: string, params: any, opt?: {
            mimeType?: string;
        }): Promise<HttpResponse>;
        constructor(path: string, method: string, opt?: {
            mimeType?: string;
        });
        send(params?: null): Promise<HttpResponse>;
    }
}
declare module "CommonLibrary/MapLoader" {
    export class MapLoader {
        protected _mapId: number;
        protected _mapData?: any;
        constructor(mapId: any);
        mapId(): number;
        isLoaded(): boolean;
        mapData(): any;
        loadMap(): void;
        loadData(fileName: string): Promise<void>;
    }
}
declare module "CommonLibrary/PluginParamsParser" {
    export class PluginParamsParser {
        private _predictEnable;
        static parse(params: any, typeData?: any, predictEnable?: boolean): any;
        constructor(predictEnable?: boolean);
        parse(params: any, typeData?: any): any;
        expandParam(strParam: string, loopCount?: number): any;
        convertParam(param: any, type: any, loopCount?: number): any;
        cast(param: any, type: any): any;
        predict(param: any): string;
    }
}
declare module "CommonLibrary/Processor" {
    import { Component } from "CommonLibrary/Component";
    export abstract class Processor<T> extends Component<T> {
        private _generator?;
        protected update(): void;
        protected abstract process(): Generator;
        protected waitProcess(waitTime: number, exitCheckFunc?: any): Generator<undefined, void, unknown>;
        protected waitComponent(component: Component<T>): Generator<undefined, void, unknown>;
    }
}
declare module "CommonLibrary/TimerComponent" {
    import { Component } from "CommonLibrary/Component";
    export class TimerComponent<T> extends Component<T> {
        private _time;
        private _timeoutFlag;
        private _timeoutCallback?;
        constructor(timeoutCallback?: Function);
        update(): void;
        startTimer(time: number): void;
        checkTimeout(): boolean;
        isTimerRunning(): boolean;
        forceTimeout(): void;
        cancel(): void;
        private timeoutProcess;
    }
}
declare module "CommonLibrary/mixin" {
    export function mixin(dest: {
        prototype: any;
    }, src: {
        prototype: any;
    }): void;
}
declare module "ARPG_Core/ARPG_Utils" {
    export class ARPG_Utils {
        static _keyTable: {
            [key: string]: string | undefined;
        };
        static searchNearBattler(subjectCharacter: Game_Character, target: "all" | "opponent" | "friend"): {
            character: Game_Character | undefined;
            far: number;
        };
        private static searchNearCharacter;
        static countEnemies(): number;
        static isFront(subject: Game_Character, target: Game_Character, range: number): boolean;
        static hasActionItem(item: RMMZData.Item): boolean;
        static allBattlerCharacters(): Game_Character[];
        static allAliveBattlerCharacters(): Game_Character[];
        static allActorCharacters(): Game_Character[];
        static allAliveActorCharacters(): Game_Character[];
        static allEnemyCharacters(): Game_Character[];
        static allAliveEnemyCharacters(): Game_Character[];
        static searchSkillId(skillName: string): number | undefined;
        static characterKindValue(character: Game_Character): number;
        static registerKey(name: string, key: any): void;
        static getKeySymbol(name: string): string | undefined;
        static isChangeActorEnabled(): boolean;
    }
}
declare module "ARPG_Core/ARPG_Skill" {
    export class ARPG_Skill {
        static DEFAULT_NO_ATTACK_FRAME: number;
        static DEFAULT_NO_DAMAGE_FRANE: number;
        private _skillOrItem;
        private _id;
        private _data;
        private _params;
        private _noAttackFrame;
        private _noDamageFrame;
        private _actionName;
        private _actionCommonEventId;
        private _showSkillName;
        private _cancelAcceleration;
        private _disableMove;
        get skillOrItem(): "item" | "skill";
        get id(): number;
        constructor(skillOrItem: "item" | "skill", idOrName: number | string);
        private findSkillIdByName;
        private findItemIdByName;
        isSkill(): boolean;
        isItem(): boolean;
        params(): any;
        noAttackFrame(): number;
        noDamageFrame(): number;
        actionName(): string;
        actionCommonEventId(): number;
        data(): RMMZData.Item;
        checkItemScope(list: Array<number>): boolean;
        isForOpponent(): boolean;
        isForFriend(): boolean;
        isForEveryone(): boolean;
        isForAliveFriend(): boolean;
        isForDeadFriend(): boolean;
        isForUser(): boolean;
        isShowSkillName(): boolean;
        isCancelAcceleration(): boolean;
        isMoveDisabled(): boolean;
        private searchCommonEventId;
    }
}
declare module "ARPG_Core/ARPG_EffectResult" {
    import { GuardResult } from "ARPG_Core/ARPG_Battler";
    import { Degree } from "CommonLibrary/Degree";
    export const DamageKind: {
        NONE: number;
        HP_DAMAGE: number;
        MP_DAMAGE: number;
        TP_DAMAGE: number;
    };
    export type DamageKind = typeof DamageKind[keyof typeof DamageKind];
    export const DamageType: {
        NORMAL: number;
        MISSED: number;
        EVADED: number;
        CRITICAL: number;
    };
    export type DamageType = typeof DamageType[keyof typeof DamageType];
    export class ARPG_EffectResult {
        private _actionResult;
        private _damageDeg?;
        private _guardResult;
        constructor(actionResult: Game_ActionResult, damageDeg: Degree | undefined, guardResult: GuardResult | undefined);
        actionResult(): Game_ActionResult;
        damageKind(): DamageKind;
        damageType(): DamageType;
        hpDamageValue(): number;
        mpDamageValue(): number;
        tpDamageValue(): number;
        damageDeg(): Degree | undefined;
        damageDir4(): number | undefined;
        guardResult(): GuardResult;
        private copyActionResult;
    }
}
declare module "ARPG_Core/ARPG_Effect" {
    import { Degree } from "CommonLibrary/Degree";
    import { ARPG_Battler, GuardResult } from "ARPG_Core/ARPG_Battler";
    import { ARPG_EffectResult } from "ARPG_Core/ARPG_EffectResult";
    import { ARPG_Skill } from "ARPG_Core/ARPG_Skill";
    export class ARPG_Effect {
        private _subject;
        private _target;
        private _skill;
        private _damageDeg?;
        private _guardResult?;
        constructor(subject: ARPG_Battler, target: ARPG_Battler, skill: ARPG_Skill, deg: Degree | undefined);
        applyToTarget(): ARPG_EffectResult;
        testApplyToTarget(): boolean;
        damageDir4(): number | undefined;
        damageDeg(): Degree | undefined;
        setDamageDeg(damageDeg: Degree | undefined): void;
        noDamageFrame(): number;
        setGuardResult(guardResult: GuardResult): void;
    }
}
declare module "ARPG_Core/Sprite_HitBox" {
    import { HitBox } from "ARPG_Core/HitBox";
    export class Sprite_HitBox extends Sprite {
        protected _hitBox: HitBox;
        constructor(hitBox: HitBox);
        initialize(hitBox: HitBox): void;
        initMembers(): void;
        createBitmap(): Bitmap;
        hitBox(): HitBox;
        checkHitBox(hitBox: HitBox): boolean;
        update(): void;
        updatePosition(): void;
        updateVisibility(): void;
    }
}
declare module "ARPG_Core/HitBox" {
    import { HitChecker } from "ARPG_Core/HitChecker";
    import { Sprite_HitBox } from "ARPG_Core/Sprite_HitBox";
    export type HitBoxType = "attack" | "damage" | "custom";
    export class HitBox extends Game_Character {
        private _hitChecker?;
        private _owner;
        private _hitArea;
        private _hitBoxColor;
        private _type;
        private _customTag?;
        get owner(): Game_Character;
        get hitArea(): Rectangle;
        set hitArea(_hitArea: Rectangle);
        get hitBoxColor(): string;
        get type(): HitBoxType;
        get customTag(): string | undefined;
        constructor(type: HitBoxType, owner: Game_Character, hitArea: Rectangle, hitBoxColor: string, customTag?: string);
        initialize(...args: any): void;
        update(): void;
        setHitChecker(hitChecker: HitChecker): void;
        updatePosition(): void;
        width(): number;
        height(): number;
        checkHitCharactersByHitBox(type: HitBoxType, customTag?: string): Set<Game_Character>;
        getHitBoxSprite(): Sprite_HitBox | undefined;
        screenX(): number;
        screenY(): number;
        screenZ(): number;
        isEnabled(): boolean;
    }
}
declare module "ARPG_Core/HitChecker" {
    import { Component } from "CommonLibrary/Component";
    import { HitBox } from "ARPG_Core/HitBox";
    import type { HitBoxType } from "ARPG_Core/HitBox";
    export class HitChecker<T extends Game_Character = Game_Character> extends Component<T> {
        private _hitBoxs;
        private _type;
        private _customTag?;
        private _disableReasons;
        get hitBoxs(): HitBox[];
        get type(): HitBoxType;
        get customTag(): string | undefined;
        constructor(type: HitBoxType, customTag?: string);
        update(): void;
        addHitBox(hitBox: HitBox): void;
        clearHitBoxs(): void;
        checkHit(hitBoxType: HitBoxType, customTag?: string): Set<Game_Character>;
        checkHitByOtherHitChecker(otherHitChecker: HitChecker<Game_Character>): boolean;
        addDisableReason(reason: string): void;
        removeDisableReason(reason: string): void;
        isEnabled(): boolean;
    }
}
declare module "ARPG_Core/ErrorManager" {
    export class ErrorManager {
        static skillActivationUnusedSkillError(): Error;
        static applySkillEffectUnusedSkillError(): Error;
        static applySkillEffectUnActivate(): Error;
        static testApplySkillEffectUnusedSkillError(): Error;
        static makeSkillObjectUnActivate(): Error;
        static makeSkillObjectNotBattlerOrSkillObject(): Error;
    }
}
declare module "ARPG_Core/BattlerCommonEventComponent" {
    import { CommonEventComponent } from "CommonLibrary/CommonEventComponent";
    export class BattlerCommonEventComponent<T extends Game_Character> extends CommonEventComponent<T> {
        private _lock;
        constructor(commonEventId: number, lock?: boolean);
        protected start(): void;
        protected terminate(): void;
    }
}
declare module "ARPG_Core/BattlerRecvDamageCommonEventComponent" {
    import { ARPG_EffectResult } from "ARPG_Core/ARPG_EffectResult";
    import { BattlerCommonEventComponent } from "ARPG_Core/BattlerCommonEventComponent";
    export class BattlerRecvDamageCommonEventComponent<T extends Game_Character> extends BattlerCommonEventComponent<T> {
        private _damageEffectResult;
        constructor(commonEventId: number, damageEffectResult: ARPG_EffectResult);
        protected start(): void;
    }
}
declare module "ARPG_Core/ARPG_BattlerParameters" {
    export class ARPG_BattlerParameters {
        private _skillCancelDamageRate;
        private _justGuardFrame?;
        private _noDamageFlag;
        private _noAttackFlag;
        get skillCancelDamageRate(): number;
        set skillCancelDamageRate(value: number);
        get justGuardFrame(): number | undefined;
        set justGuardFrame(value: number | undefined);
        get noDamageFlag(): boolean;
        set noDamageFlag(_noDamageFlag: boolean);
        get noAttackFlag(): boolean;
        set noAttackFlag(_noAttackFlag: boolean);
    }
}
declare module "ARPG_Core/BattlerDeadComponent" {
    import { Component } from "CommonLibrary/Component";
    export class BattlerDeadComponent extends Component<Game_Character> {
        private _deadProcessComponent;
        constructor(deadProcessComponent: Component<Game_Character> | undefined);
        protected start(): void;
        protected update(): void;
        protected terminate(): void;
    }
}
declare module "ARPG_Core/ARPG_Actor" {
    import { ARPG_Battler } from "ARPG_Core/ARPG_Battler";
    import { ARPG_EffectResult } from "ARPG_Core/ARPG_EffectResult";
    import { Component } from "CommonLibrary/Component";
    import { ARPG_BattlerParameters } from "ARPG_Core/ARPG_BattlerParameters";
    export class ARPG_Actor extends ARPG_Battler {
        private _actorId;
        constructor(actorId: number);
        battler(): Game_Actor;
        actor(): Game_Actor;
        name(): string;
        arpgParameters(): ARPG_BattlerParameters;
        isActor(): boolean;
        checkOpponent(battler: ARPG_Battler): boolean;
        changeActor(actorId: number): void;
        protected makeRecvDamageComponent(result: ARPG_EffectResult): Component<Game_Character> | undefined;
        private onDead;
        weaponActionSkillIds(): number[];
        protected normalAttackSkillId(): number;
        protected onGuardStart(): void;
        protected onGuardEnd(): void;
    }
}
declare module "ARPG_Core/ARPG_CustomManager" {
    import { ARPG_Battler, GuardResult } from "ARPG_Core/ARPG_Battler";
    import { ARPG_EffectResult } from "ARPG_Core/ARPG_EffectResult";
    import { ARPG_Enemy } from "ARPG_Core/ARPG_Enemy";
    import { ARPG_Skill } from "ARPG_Core/ARPG_Skill";
    import { CommonEventComponent } from "CommonLibrary/CommonEventComponent";
    import { Component } from "CommonLibrary/Component";
    import { ARPG_Actor } from "ARPG_Core/ARPG_Actor";
    export class ARPG_CustomManager {
        static _actionTable: Map<string, Function>;
        static addAction(actionName: string, actionFunc: Function): void;
        static getAction(actionName: string): Function | undefined;
        static actionComponent(user: ARPG_Battler, skill: ARPG_Skill): Component<Game_Character> | undefined;
        static actorGuardStart(actor: ARPG_Actor): Component<Game_Character> | undefined;
        static actorGuardEnd(actor: ARPG_Actor): Component<Game_Character> | undefined;
        static actorRecvDamageComponent(actor: ARPG_Actor, result: ARPG_EffectResult, guardResult: GuardResult): Component<Game_Character> | undefined;
        static actorDeadComponent(actor: ARPG_Actor, result: ARPG_EffectResult): Component<Game_Character> | undefined;
        static enemyRecvDamageComponent(enemy: ARPG_Enemy, result: ARPG_EffectResult): Component<Game_Event> | undefined;
        static enemyDefeatComponent(enemy: ARPG_Enemy, result: ARPG_EffectResult): Component<Game_Event> | undefined;
        static gameoverComponent(): Component<Game_Character> | undefined;
        static chantComponent(battler: ARPG_Battler, chantCommonEventId: number): Component<Game_Character> | undefined;
        static levelUpComponent(actor: Game_Actor): CommonEventComponent<Game_Character> | undefined;
    }
}
declare module "ARPG_Core/ARPG_Battler" {
    import { ARPG_Skill } from "ARPG_Core/ARPG_Skill";
    import { ARPG_Effect } from "ARPG_Core/ARPG_Effect";
    import { TimerComponent } from "CommonLibrary/TimerComponent";
    import { Component } from "CommonLibrary/Component";
    import { HitChecker } from "ARPG_Core/HitChecker";
    import { Processor } from "CommonLibrary/Processor";
    import { ARPG_EffectResult } from "ARPG_Core/ARPG_EffectResult";
    import { ARPG_BattlerParameters } from "ARPG_Core/ARPG_BattlerParameters";
    export type GuardResult = "NORMAL_GUARD" | "JUST_GUARD" | "NO_GUARD";
    export interface IRequestUseSkillOrItem {
        skillOrItem: "skill" | "item";
        idOrName: number | string;
        isConsumeCost: boolean;
    }
    export abstract class ARPG_Battler extends Component<Game_Character> {
        usingSkill?: ARPG_Skill;
        protected _noDamageTimer: TimerComponent<Game_Character>;
        protected _noAttackTimer: TimerComponent<Game_Character>;
        protected _damageHitChecker: HitChecker;
        protected _attackHitChecker: HitChecker;
        protected _useSkillProcessor?: ARPG_UseSkillProcessor;
        protected _customHitCheckers: Map<string, HitChecker>;
        protected _isConsumeCost: boolean;
        protected _totalDamageWhenUsingSkill: number;
        protected _skillCancelWhenDamageEnable: boolean;
        private _guardReasons;
        private _collideAttackSkillId?;
        private _justGuardTimer;
        private _skillActivating;
        private _chantComponent?;
        private _requestUseSkillQueue;
        private _behaviorComponent?;
        private _damageReceiving;
        get damageHitChecker(): HitChecker<Game_Character>;
        get attackHitChecker(): HitChecker<Game_Character>;
        get customHitCheckers(): Map<string, HitChecker<Game_Character>>;
        get hp(): number;
        set hp(value: number);
        get mp(): number;
        set mp(value: number);
        get tp(): number;
        set tp(value: number);
        get mhp(): number;
        get mmp(): number;
        get def(): number;
        get atk(): number;
        get mat(): number;
        get mdf(): number;
        get agi(): number;
        get luk(): number;
        get hit(): any;
        get eva(): any;
        get cri(): any;
        get cev(): any;
        get mev(): any;
        get mrf(): any;
        get cnt(): any;
        get hrg(): any;
        get mrg(): any;
        get trg(): any;
        get tgr(): number;
        get grd(): number;
        get rec(): number;
        get pha(): number;
        get mcr(): number;
        get tcr(): number;
        get pdr(): number;
        get mdr(): number;
        get fdr(): number;
        get exr(): number;
        abstract battler(): Game_Battler;
        abstract name(): string;
        abstract arpgParameters(): ARPG_BattlerParameters;
        protected start(): void;
        refresh(): void;
        private refreshHitChecker;
        protected update(): void;
        isActor(): boolean;
        isEnemy(): boolean;
        isDead(): boolean;
        isAlive(): boolean;
        isGuarding(): boolean;
        startGuard(reason: string): void;
        endGuard(reason: string): void;
        protected onGuardStart(): void;
        protected onGuardEnd(): void;
        checkSuccessGuard(damageEffect: ARPG_Effect): GuardResult;
        startNoDamage(frame: number): void;
        isNoDamage(): boolean;
        startNoAttack(frame: number): void;
        isNoAttack(): boolean;
        gainHp(value: number): void;
        gainSilentTp(value: number): void;
        canPaySkillCost(skill: ARPG_Skill): boolean;
        paySkillCost(skill: ARPG_Skill): void;
        setCollideAttackSkillId(skillId: number): void;
        collideAttackSkillId(): number;
        recvDamage(damageEffect: ARPG_Effect): void;
        protected abstract makeRecvDamageComponent(result: ARPG_EffectResult): Component<Game_Character> | undefined;
        private onEndRecvDamage;
        canUsableSkill(): boolean;
        useSkill(skillOrItem: "item" | "skill", idOrName: number | string, opt?: {
            queuing?: boolean;
            isConsumeCost?: boolean;
        }): void;
        isSkillUsing(): boolean;
        isDamageReceiving(): boolean;
        protected useSkillInternal(skill: ARPG_Skill, opt?: {
            isConsumeCost?: boolean;
        }): void;
        consumeCost(skill: ARPG_Skill): void;
        checkConsumeCost(skill: ARPG_Skill): boolean;
        skillActivation(chantCommonEventId?: number): void;
        private stopCharacterMove;
        private resumeCharacterMove;
        private stopEventInterpreter;
        private resumeEventInterpreter;
        setSkillCancelWhenDamageEnable(enabled: boolean): void;
        isDamageSkillCancelEnabled(): boolean;
        requestRefreshShortcutWindowHook(): void;
        applySkillEffect(skill: ARPG_Skill | undefined): void;
        testApplySkillEffect(skill: ARPG_Skill | undefined): boolean;
        isSkillActivating(): boolean;
        endSkillActivation(): void;
        makeSkillObject(srcMapId: number, srcEventIdOrName: number | string, skill: ARPG_Skill | undefined, x?: number, y?: number): Game_Event;
        behaviorComponent(): Component<Game_Character> | undefined;
        setBehaviorComponent(component: Component<Game_Character> | undefined): void;
        abstract checkOpponent(battler: ARPG_Battler): boolean;
        protected updateRecvDamage(): void;
        applyCollideDamageEffectToTarget(target: ARPG_Battler, arpgSkill: ARPG_Skill): void;
        isChanting(): boolean;
        private recvDamageProcessBySkillObjectCharacter;
        private recvDamageProcessByBattlerCharacter;
        protected skillCancelWhenRecvDamage(result: ARPG_EffectResult): void;
        private doSkillCancel;
        private checkTargetBattler;
        private checkTargetEnemy;
        private checkTargetActor;
    }
    class ARPG_UseSkillProcessor extends Processor<Game_Character> {
        private _battler;
        private _skill;
        private _damageCanceled;
        constructor(battler: ARPG_Battler, skill: ARPG_Skill);
        protected start(): void;
        protected process(): Generator<undefined, void, unknown>;
        damageCancel(): void;
        protected terminate(): void;
    }
}
declare module "ARPG_Core/ARPG_Enemy" {
    import { ARPG_Battler } from "ARPG_Core/ARPG_Battler";
    import { Component } from "CommonLibrary/Component";
    import { ARPG_EffectResult } from "ARPG_Core/ARPG_EffectResult";
    import { ARPG_BattlerParameters } from "ARPG_Core/ARPG_BattlerParameters";
    export interface IARPG_EnemyOption {
        collideAttackSkillId?: number;
        damageCommonEventId?: number;
        defeatEnemyCommonEventId?: number;
    }
    export interface INormalHpGaugeOption {
        hpGaugeColor1?: string;
        hpGaugeColor2?: string;
        hpGaugePosition?: "up" | "down";
        hpGaugeYOffset?: number;
        hpGaugeHeight?: number;
    }
    export class ARPG_Enemy extends ARPG_Battler {
        private _enemy;
        private _needHpGauge;
        private _showHpGauge;
        private _normalHpGaugeOption?;
        private _damageCommonEventId?;
        private _defeatEnemyCommonEventId?;
        private _defeated;
        private _arpgParameters;
        constructor(enemyId: number, opt?: IARPG_EnemyOption);
        protected update(): void;
        battler(): Game_Enemy;
        enemy(): Game_Enemy;
        name(): string;
        arpgParameters(): ARPG_BattlerParameters;
        isEnemy(): boolean;
        checkOpponent(battler: ARPG_Battler): boolean;
        exp(): number;
        gold(): number;
        isNeedCharacterHpGauge(): boolean;
        isCharacterHpGaugeVisibled(): boolean;
        setupNormalHpGauge(opt?: INormalHpGaugeOption): void;
        setHpGaugeVisible(visible: boolean): void;
        normalHpGaugeOption(): INormalHpGaugeOption | undefined;
        protected makeRecvDamageComponent(result: ARPG_EffectResult): Component<Game_Character> | undefined;
        private onDefeat;
        isDefeated(): boolean;
        damageCommonEventId(): number;
        defeatEnemyCommonEventId(): number;
    }
}
declare module "ARPG_Core/ARPG_Config" {
    export const ARPG_CorePluginName: string;
    export interface IPluginParams_Key {
        KeyName: string;
        KeySymbol: string;
        KeyCode: number;
        ButtonIndex: number;
    }
    export interface IPluginParams_HitBox {
        X: number;
        Y: number;
        Width: number;
        Height: number;
    }
    export interface IPluginParams_SE {
        FileName: string;
        Volume: number;
        Pitch: number;
        Pan: number;
        Pos: number;
    }
    export interface IARPG_CorePluginParams {
        CopyEventSetting: {
            CopyEventTag: string;
            DynamicEventSrcMapIds: number[];
        };
        BattlerSetting: {
            UserKindCommonVariableId: number;
            UserEventIdCommonVariableId: number;
            DamageDegCommonVariableId: number;
            DamageKindCommonVariableId: number;
            DamageTypeCommonVariableId: number;
            DamageValueCommonVariableId: number;
        };
        ActorSetting: {
            NormalAttackSkillId: number;
            DamageCommonEventId: number;
            DeadCommonEventId: number;
            NormalGuardCommonEventId: number;
            JustGuardCommonEventId: number;
            StartGuardCommonEventId: number;
            EndGuardCommonEventId: number;
            JustGuardFrame: number;
            ActorHitBox: {
                DamageHitBoxList: IPluginParams_HitBox[];
            };
            GameOverCommonEventId: number;
            LevelUpCommonEventId: number;
        };
        EnemySetting: {
            CollideAttackSkillId: number;
            DamageCommonEventId: number;
            DefeatEnemyCommonEventId: number;
        };
        SkillObjectSetting: {
            SkillObjectUserKindSelfVariableId: number;
            SkillObjectUserEventIdSelfVariableId: number;
            CollisionDetectExSelfSwitchId: number;
        };
        HitBoxSetting: {
            VisibleHitAreaSwitchId: number;
            AttackHitBoxColor: string;
            DamageHitBoxColor: string;
            CustomHitBoxDefaultColor: string;
            CustomHitBoxColorList: ({
                CustomHitBoxTag: string;
                Color: string;
            })[];
        };
        EnemyHpGaugeSetting: {
            NormalEnemyHpGaugePosition: string;
            NormalEnemyHpGaugeYOffset: number;
            NormalEnemyHpGaugeHeight: number;
            NormalEnemyHpGaugeColor1: string;
            NormalEnemyHpGaugeColor2: string;
            BossEnemyHpGaugeColor1: string;
            BossEnemyHpGaugeColor2: string;
            BossEnemyHpGaugeLabel: string;
            BossEnemyHpGaugeYOffset: number;
            BossEnemyHpGaugeWidth: number;
            BossEnemyHpGaugeHeight: number;
        };
        KeySetting: {
            ActorNormalAttack: IPluginParams_Key;
            ActorGuard: IPluginParams_Key;
            VisibleHitBox: IPluginParams_Key;
            ChangeControlActor: IPluginParams_Key;
        };
        SESetting: {
            ActorChange: IPluginParams_SE;
        };
        UseDamagePopup: boolean;
        UseImageDamage: boolean;
        UseImageTargetSelectCursor: boolean;
        TargetSelectCursorImageFileName: string;
        EnableChangeControlActorSwitchId: number;
        EnableARPGSwitchId: number;
        SelectedTargetCharacterKindVariableId: number;
        SelectedTargetEventIdVariableId: number;
        ErrorMessageLanguage: string;
    }
    export const ARPG_CorePluginParams: IARPG_CorePluginParams;
}
declare module "ARPG_Core/ARPG_DamagePopup/Sprite_FieldDamage" {
    export class Sprite_FieldDamage extends Sprite_Damage {
        static _initialize: () => void;
        static _createMiss: () => void;
        static _createDigits: (value: number) => void;
        static _destroy: (options?: any) => void;
        protected _damageBitmap?: Bitmap;
        private _actionResult?;
        initialize(): void;
        digitWidth(): number;
        digitHeight(): number;
        setActionResult(actionResult: Game_ActionResult): void;
        setup(target: Game_Battler): void;
        createMiss(): void;
        createDigits(value: number): void;
        createChildImageSprite(): any;
        destroy(options: any): void;
    }
}
declare module "ARPG_Core/ARPG_DamagePopup/Sprite_Character" {
    import { Sprite_FieldDamage } from "ARPG_Core/ARPG_DamagePopup/Sprite_FieldDamage";
    export {};
    global {
        interface Sprite_Character {
            _damages: Sprite_FieldDamage[];
        }
    }
}
declare module "ARPG_Core/ARPG_DamagePopup/Scene_Map" { }
declare module "ARPG_Core/ARPG_DamagePopup/Main" {
    import "ARPG_Core/ARPG_DamagePopup/Sprite_Character";
    import "ARPG_Core/ARPG_DamagePopup/Scene_Map";
}
declare module "ARPG_Core/ARPG_DynamicEvent/Game_Event" {
    global {
        interface Game_Event {
            new (mapId: number, eventId: number, opt?: {
                isDynamicEvent?: boolean;
                srcMapId?: number;
                srcEventId?: number;
            }): Game_Event;
            initialize(mapId: number, eventId: number, opt?: {
                isDynamicEvent?: boolean;
                srcMapId?: number;
                srcEventId?: number;
            }): Game_Event;
            isDynamicEvent(): boolean;
            isErased(): boolean;
        }
    }
}
declare module "ARPG_Core/ARPG_DynamicEvent/Game_Map" {
    global {
        interface Game_Map {
            makeDynamicEvent(srcMapId: number, srcEventIdOrName: number | string, x?: number, y?: number): Game_Event;
        }
    }
}
declare module "ARPG_Core/ARPG_DynamicEvent/Game_SelfSwitches" {
    global {
        interface Game_SelfSwitches {
            clearSelfSwitches(mapId: number, eventId?: number, switchName?: string): void;
        }
    }
}
declare module "ARPG_Core/ARPG_DynamicEvent/Game_Temp" {
    global {
        interface Game_Temp {
            _mapDataCaches: Map<number, any>;
            _firstMapDataCacheMapId: number | undefined;
            mapDataCache(mapId: number): any;
            setMapDataCache(mapId: number, mapData: any): void;
        }
    }
}
declare module "ARPG_Core/ARPG_DynamicEvent/Scene_Map" {
    import { MapLoader } from "CommonLibrary/MapLoader";
    export class Scene_Map_Mixin extends Scene_Map {
        static _initialize: () => void;
        static _create: () => void;
        static _isReady: () => boolean;
        static _onMapLoaded: () => void;
        protected _mapLoaders: MapLoader[];
        initialize(): void;
        create(): void;
        isReady(): boolean;
        onMapLoaded(): void;
        preMapLoad(): void;
    }
}
declare module "ARPG_Core/ARPG_DynamicEvent/Spriteset_Map" {
    global {
        interface Spriteset_Map {
            updateCreateCharacterSprites(): void;
            createCharacterSprite(character: Game_Character): void;
        }
    }
}
declare module "ARPG_Core/ARPG_DynamicEvent/Sprite_Character" {
    global {
        interface Sprite_Character {
            character(): Game_CharacterBase;
        }
    }
}
declare module "ARPG_Core/ARPG_DynamicEvent/Main" {
    import "ARPG_Core/ARPG_DynamicEvent/Game_Event";
    import "ARPG_Core/ARPG_DynamicEvent/Game_Map";
    import "ARPG_Core/ARPG_DynamicEvent/Game_Temp";
    import "ARPG_Core/ARPG_DynamicEvent/Scene_Map";
    import "ARPG_Core/ARPG_DynamicEvent/Spriteset_Map";
    import "ARPG_Core/ARPG_DynamicEvent/Sprite_Character";
    import "ARPG_Core/ARPG_DynamicEvent/Game_SelfSwitches";
}
declare module "ARPG_Core/ARPG_State/Main" {
    global {
        interface Game_Battler {
            updateStatesDuration(): void;
        }
    }
}
declare module "ARPG_Core/ARPG_TargetSelect/Main" {
    import { Component } from "CommonLibrary/Component";
    global {
        interface Game_Map {
            startTargetSelect(opt: {
                wait?: boolean;
                cancelable?: boolean;
                onlyNeraTheScreen?: boolean;
            }): void;
            isTargetSelecting(): boolean;
            isTargetSelectCancelable(): boolean;
            endTargetSelect(): void;
            touchCharacter(character: Game_Character): void;
        }
    }
    export class TargetSelecter extends Component<Game_Character> {
        private _selectTargetType;
        private _onlyNearTheScreen;
        constructor(selectTargetType: "actor" | "enemy", opt?: {
            onlyNearTheScreen?: boolean;
        });
        start(): void;
        update(): void;
        touchCharacter(character: Game_Character): void;
        private nextSelect;
        private prevSelect;
        private doChangeSelectingTarget;
        private doSelect;
        private searchNextCharacter;
        private searchPrevCharacter;
        private allCharactersByTargetType;
    }
    export class Sprite_TargetSelect extends Sprite {
        static CURSOR_MOVE_DURATION: number;
        private _mover;
        private _lastTarget?;
        initialize(): void;
        update(): void;
        moveToTarget(target: Sprite, fast?: boolean): void;
        private calcCursorMoveSpeed;
    }
}
declare module "ARPG_Core/ARPG_BattleManager" {
    import { Component } from "CommonLibrary/Component";
    import { ARPG_Battler } from "ARPG_Core/ARPG_Battler";
    import { ARPG_Skill } from "ARPG_Core/ARPG_Skill";
    import { ARPG_Actor } from "ARPG_Core/ARPG_Actor";
    export class ARPG_BattleManager extends Component<Game_Character> {
        private _showSkillNameCount;
        deadActor(actor: ARPG_Actor): void;
        gameover(): void;
        showSkillNameWindow(user: ARPG_Battler, skill: ARPG_Skill): void;
        endShowSkillNameWindow(): void;
    }
}
declare module "ARPG_Core/ARPG_SkillObject" {
    import { Degree } from "CommonLibrary/Degree";
    import { ARPG_Battler } from "ARPG_Core/ARPG_Battler";
    import { Component } from "CommonLibrary/Component";
    import { ARPG_Effect } from "ARPG_Core/ARPG_Effect";
    import { ARPG_Skill } from "ARPG_Core/ARPG_Skill";
    import { HitChecker } from "ARPG_Core/HitChecker";
    export class ARPG_SkillObject extends Component<Game_Event> {
        private _skill;
        private _userBattler;
        private _attackDeg?;
        private _attackHitChecker;
        private _customHitCheckers;
        private _skillObjectPositionController;
        get attackHitChecker(): HitChecker<Game_Event>;
        get customHitCheckers(): Map<string, HitChecker<Game_Character>>;
        constructor(skill: ARPG_Skill, user: ARPG_Battler);
        setup(): void;
        skill(): ARPG_Skill;
        userBattler(): ARPG_Battler;
        setAttackDeg(deg?: Degree): void;
        attackDeg(): Degree | undefined;
        isUserPositionSynchronized(): boolean;
        setUserPositionSynchronize(synchronize: boolean): void;
        makeSkillObject(srcMapId: number, srcEventIdOrName: number | string, skill: ARPG_Skill | undefined, x?: number, y?: number): Game_Event;
        createEffect(subject: ARPG_Battler, target: ARPG_Battler, skill: ARPG_Skill): ARPG_Effect;
        applyDamageEffectToBattler(battler: ARPG_Battler, arpgSkill: ARPG_Skill): void;
    }
}
declare module "ARPG_Core/ARPG_FieldObject" {
    import { Component } from "CommonLibrary/Component";
    import { HitChecker } from "ARPG_Core/HitChecker";
    export class ARPG_FieldObject extends Component<Game_Event> {
        protected _customHitCheckers: Map<string, HitChecker>;
        get customHitCheckers(): Map<string, HitChecker<Game_Character>>;
        protected start(): void;
    }
}
declare module "ARPG_Core/ARPG_CharacterTempData" {
    import { ARPG_Battler } from "ARPG_Core/ARPG_Battler";
    import { ARPG_SkillObject } from "ARPG_Core/ARPG_SkillObject";
    import { ComponentRunner } from "CommonLibrary/ComponentRunner";
    import { ARPG_FieldObject } from "ARPG_Core/ARPG_FieldObject";
    export class ARPG_CharacterTempData {
        lastARPGMode: boolean;
        componentRunner?: ComponentRunner<Game_Character>;
        battler?: ARPG_Battler;
        skillObject?: ARPG_SkillObject;
        fieldObject?: ARPG_FieldObject;
    }
}
declare module "ARPG_Core/Window_CommonMessage" {
    export class Window_CommonMessage extends Window_Base {
        private _text;
        get text(): string;
        set text(_text: string);
        protected refresh(): void;
    }
}
declare module "ARPG_Core/MessageWindowController" {
    import { Component } from "CommonLibrary/Component";
    export type MessageWindowType = "common";
    export class MessageWindowController extends Component<Game_Character> {
        private static readonly DEFAULT_SHOW_WINDOW_TIME;
        private static readonly SHOW_WINDOW_GUARD_TIME;
        private _windowDatas;
        private _createWindowCallback?;
        private _deleteWindowCallback?;
        private _showWindowTimer;
        private _setupCompleted;
        private _afterFirst;
        private _manualWait;
        private _showWindowGuardTimer;
        protected start(): void;
        showWindow(text: string, rect: Rectangle, opt?: {
            time?: number;
            type?: MessageWindowType;
        }): void;
        startManualWait(): void;
        endManualWait(): void;
        isManualWaiting(): boolean;
        clearAllWindows(): void;
        sceneStart(createWindowCallback: Function, deleteWindowCallback: Function): void;
        sceneTerminate(): void;
        private calcWindowYPos;
        private showWindowTimerTimeout;
        private showWindowGuardTimerTimeout;
    }
}
declare module "ARPG_Core/Game_ControlCharacter" {
    import { MessageWindowController } from "ARPG_Core/MessageWindowController";
    export class Game_ControlCharacter extends Game_Character {
        setup(skillNameWindowController: MessageWindowController): void;
    }
}
declare module "ARPG_Core/ARPG_GlobalTempData" {
    import { Game_ControlCharacter } from "ARPG_Core/Game_ControlCharacter";
    import { ARPG_Enemy } from "ARPG_Core/ARPG_Enemy";
    import { MessageWindowController } from "ARPG_Core/MessageWindowController";
    export class ARPG_GlobalTempData {
        bossHpGaugeTargetEnemy: ARPG_Enemy | undefined;
        controlCharacter: Game_ControlCharacter;
        skillNameWindowController: MessageWindowController;
        selectingTarget?: Game_Character;
        selectResultSwitchId: number;
        selectedTargetCharacterKindVariableId: number;
        selectedTargetEventIdVariableId: number;
        constructor();
    }
}
declare module "ARPG_Core/Sprite_CommonGauge" {
    export interface ICommonGaugeConfig {
        hpGaugeColor1?: string;
        mpGaugeColor1?: string;
        tpGaugeColor1?: string;
        ctGaugeColor1?: string;
        hpGaugeColor2?: string;
        mpGaugeColor2?: string;
        tpGaugeColor2?: string;
        ctGaugeColor2?: string;
        normalColor?: string;
    }
    export class Sprite_CommonGauge extends Sprite_Gauge {
        private _config;
        private _gaugeWidth;
        private _gaugeHeight;
        constructor(width: number, height: number, config: ICommonGaugeConfig);
        initialize(...args: any[]): void;
        gaugeWidth(): number;
        gaugeHeight(): number;
        bitmapWidth(): number;
        bitmapHeight(): number;
        gaugeColor1(): string;
        gaugeColor2(): string;
        drawGauge(): void;
        gaugeX(): number;
        textHeight(): number;
        redraw(): void;
    }
}
declare module "ARPG_Core/Sprite_Label" {
    export interface ILabelOption {
        fontSize?: number;
        fontFace?: string;
        align?: CanvasTextAlign;
    }
    export class Sprite_Label extends Sprite {
        private _text;
        private _align;
        constructor(width: number, height: number, opt?: ILabelOption);
        initialize(width: number, height: number, opt?: ILabelOption): void;
        get text(): string;
        set text(_text: string);
        get fontSize(): any;
        set fontSize(_fontSize: any);
        get fontFace(): any;
        set fontFace(_fontFace: any);
        get align(): any;
        set align(_align: any);
        private redrawText;
    }
}
declare module "ARPG_Core/BossHpGaugeContainer" {
    import { ARPG_Battler } from "ARPG_Core/ARPG_Battler";
    import { Container } from "CommonLibrary/Container";
    export class BossHpGaugeContainer extends Container {
        private _bossHpGauge;
        private _bossHpGaugeLabel;
        initialize(): void;
        setupBossHpGauge(battler: ARPG_Battler): void;
        private createBossHpGauge;
        private createBossHpGaugeLabel;
    }
}
declare module "ARPG_Core/CharacterBlowAwayProcessor" {
    import { Degree } from "CommonLibrary/Degree";
    import { Processor } from "CommonLibrary/Processor";
    export class CharacterBlowAwayProcessor extends Processor<Game_Character> {
        private _deg;
        private _initialVelocity;
        private _duration;
        constructor(deg: Degree, initialVelocity: number, duration: number);
        protected start(): void;
        protected process(): Generator<undefined, void, unknown>;
        protected terminate(): void;
    }
}
declare module "ARPG_Core/CharacterCollisionChecker" { }
declare module "ARPG_Core/CharacterMover" { }
declare module "ARPG_Core/LevelUpProcessor" {
    import { Processor } from "CommonLibrary/Processor";
    export class LevelUpProcessor extends Processor<Game_Character> {
        private _actor;
        private _displayLevelUpProcessor;
        constructor(actor: Game_Actor, levelUpMessage: string, newSkills: RMMZData.Item[]);
        process(): Generator<undefined, void, unknown>;
    }
}
declare module "ARPG_Core/Game_Actor" {
    import { ARPG_BattlerParameters } from "ARPG_Core/ARPG_BattlerParameters";
    global {
        interface Game_Actor {
            _arpgParameters: ARPG_BattlerParameters;
            arpgParameters(): ARPG_BattlerParameters;
        }
    }
}
declare module "ARPG_Core/Game_Character" {
    import { Component } from "CommonLibrary/Component";
    import { ARPG_Battler } from "ARPG_Core/ARPG_Battler";
    import { ARPG_SkillObject } from "ARPG_Core/ARPG_SkillObject";
    import { ARPG_CharacterTempData } from "ARPG_Core/ARPG_CharacterTempData";
    import { Degree } from "CommonLibrary/Degree";
    import { ARPG_FieldObject } from "ARPG_Core/ARPG_FieldObject";
    global {
        interface Game_Character {
            _disableMoveReason?: string[];
            _noCheckMapValid?: boolean;
            isInTheScreen(xMargin: number, yMargin: number): boolean;
            addDisableMoveReason(reason: string): void;
            removeDisableMoveReason(reason: string): void;
            isDisableMove(): boolean;
            isNoCheckMapValid(): boolean;
            setNoCheckMapValid(noCheckMapValid: boolean): void;
            battler<T extends ARPG_Battler>(): T;
            isBattler(): boolean;
            skillObject(): ARPG_SkillObject;
            fieldObject(): ARPG_FieldObject;
            isSkillObject(): boolean;
            isFieldObject(): boolean;
            startARPGProcess(): void;
            endARPGProcess(): void;
            setupActor(actorId: number): void;
            cancelAcceleration(): void;
            waitGenerator(waitTime: number): void;
            moveTowardNearActor(): void;
            moveAwayNearActor(): void;
            addComponent(component: Component<Game_Character>): void;
            removeComponent(component: Component<Game_Character>): void;
            hasComponent(component: Component<Game_Character> | undefined): boolean;
            hasComponentByClass(componentClass: Function): boolean;
            arpgTempData(): ARPG_CharacterTempData;
            createArpgTempData(): ARPG_CharacterTempData;
            useShadow(): void;
            isNeedCharacterHpGauge(): boolean;
            isCharacterHpGaugeVisibled(): boolean;
            hpGaugeColor1(): string | undefined;
            hpGaugeColor2(): string | undefined;
            hpGaugePosition(): "up" | "down";
            hpGaugeYOffset(): number;
            hpGaugeHeight(): number;
            startBlowAway(deg: Degree, initialVelocity: number, duration: number): void;
            isBlowingAway(): boolean;
            moveCancel(): void;
            onPress(): void;
            onClick(): void;
        }
    }
}
declare module "ARPG_Core/Game_CharacterBase" {
    export {};
    global {
        interface Game_CharacterBase {
            getSprite(): Sprite_Character | undefined;
        }
    }
}
declare module "ARPG_Core/Game_Event" {
    import { IARPG_EnemyOption } from "ARPG_Core/ARPG_Enemy";
    import { ARPG_Battler } from "ARPG_Core/ARPG_Battler";
    global {
        interface Game_Event {
            isErased(): boolean;
            setupEnemy(enemyId: number, opt?: IARPG_EnemyOption): void;
            setupFieldObject(): void;
            isValid(): boolean;
            setupSkillObject(skillOrItem: "item" | "skill", id: number, user: ARPG_Battler): void;
            interpreter(): Game_Interpreter | undefined;
            stopSelfMovement(reason: string): void;
            resumeSelfMovement(reason: string): void;
            isStoppedSelfMovement(): boolean;
        }
    }
}
declare module "ARPG_Core/Game_Interpreter" {
    import { ARPG_Skill } from "ARPG_Core/ARPG_Skill";
    global {
        interface Game_Interpreter {
            _needChantWait: boolean;
            _needTargetSelectWait: boolean;
            _blowAwayWaitCharacter?: Game_Character;
            lock(reason: string): void;
            unlock(reason: string): void;
            isLocked(): boolean;
            findCharacterBySpecification(characterSpecification: any): Game_Character;
            findArpgSkillBySpecification(param: any): ARPG_Skill;
            arpgCharacter(): Game_Character | undefined;
            event(): Game_Event | undefined;
        }
    }
}
declare module "ARPG_Core/TransparentObject" {
    import { Degree } from "CommonLibrary/Degree";
    export class TransparentObject extends Game_Character {
        private _remainFar;
        constructor();
        initialize(...args: any): void;
        castTo(deg: Degree, far: number): boolean;
        distancePerFrame(): number;
        moveCallback(moved: boolean, dpf: number): void;
        checkCollisionTargetCharacter(x: number, y: number, d: number, character: Game_CharacterBase): boolean;
    }
}
declare module "ARPG_Core/Game_Map" {
    import { DotMovePoint } from "DotMoveSystem";
    import { ARPG_BattleManager } from "ARPG_Core/ARPG_BattleManager";
    import { HitBox } from "ARPG_Core/HitBox";
    import { MessageWindowType } from "ARPG_Core/MessageWindowController";
    import { TransparentObject } from "ARPG_Core/TransparentObject";
    import { Degree } from "CommonLibrary/Degree";
    global {
        interface Game_Map {
            _arpgBattleManager?: ARPG_BattleManager;
            _arpgMode: boolean;
            _stopped: boolean;
            _transparentObject?: TransparentObject;
            stop(): void;
            resume(): void;
            isStopped(): boolean;
            arpgBattleManager(): ARPG_BattleManager | undefined;
            allHitBoxs(): Set<HitBox>;
            outOfMap(character: Game_CharacterBase): boolean;
            showCommonMessageWindow(text: string, rect: Rectangle, opt?: {
                time?: number;
                type?: MessageWindowType;
            }): void;
            startSceneIndication(scene: Scene_Map): void;
            terminateSceneIndication(scene: Scene_Map): void;
            startARPGMode(): void;
            endARPGMode(): void;
            isEnabledARPGMode(): boolean;
            transparentObjectCastTo(pos: DotMovePoint, deg: Degree, far: number, opt?: {
                width?: number;
                height?: number;
            }): DotMovePoint | undefined;
        }
    }
}
declare module "ARPG_Core/PlayerBehavior" {
    import { Component } from "CommonLibrary/Component";
    export class PlayerBehavior extends Component<Game_Player> {
        private _attackProcess;
        private _guardProcess;
        protected setup(): void;
        delayAttackable(delayTime: number): void;
    }
}
declare module "ARPG_Core/Game_Player" {
    import { PlayerBehavior } from "ARPG_Core/PlayerBehavior";
    global {
        interface Game_Player {
            _playerBehavior?: PlayerBehavior;
            onStartTargetSelect(): void;
            onEndTargetSelect(): void;
            stopMoveByInput(reason: string): void;
            resumeMoveByInput(reason: string): void;
            isStoppedMoveByInput(): boolean;
        }
    }
}
declare module "ARPG_Core/Game_System" { }
declare module "ARPG_Core/Game_Temp" {
    import { ARPG_CharacterTempData } from "ARPG_Core/ARPG_CharacterTempData";
    import { ARPG_GlobalTempData } from "ARPG_Core/ARPG_GlobalTempData";
    export type ARPGMode = "start" | "end";
    global {
        interface Game_Temp {
            _arpgGlobalTempData: ARPG_GlobalTempData;
            _arpgCharacterTempDatas: Map<Game_Character, ARPG_CharacterTempData>;
            _fieldDamagePopupRequest: Map<Game_CharacterBase, Game_ActionResult>;
            _changeNextActorRequest: IChangeActorRequest | undefined;
            arpgGlobalTempData(): ARPG_GlobalTempData;
            requestARPGMode(arpgMode: ARPGMode): void;
            checkARPGModeRequest(): ARPGMode | undefined;
            arpgCharacterTempData(character: Game_Character): ARPG_CharacterTempData;
            clearUnusedArpgCharacterTempDatas(): void;
            requestFieldDamagePopup(character: Game_CharacterBase, result: Game_ActionResult): void;
            checkRequestedFieldDamagePopup(character: Game_CharacterBase): Game_ActionResult | undefined;
            requestChangeNextActor(request?: IChangeActorRequest): void;
            checkRequestedChangeNextActor(): IChangeActorRequest | undefined;
        }
    }
    export interface IChangeActorRequest {
        force?: boolean;
    }
}
declare module "ARPG_Core/Spriteset_Map" {
    import { ARPG_Battler } from "ARPG_Core/ARPG_Battler";
    import { HitBox } from "ARPG_Core/HitBox";
    import { Sprite_HitBox } from "ARPG_Core/Sprite_HitBox";
    import { BossHpGaugeContainer } from "ARPG_Core/BossHpGaugeContainer";
    global {
        interface Spriteset_Map {
            _bossHpGaugeContainer: BossHpGaugeContainer;
            _hitBoxSprites: Set<Sprite_HitBox>;
            createBossHpGaugeContainer(): void;
            setupBossHpGauge(battler: ARPG_Battler, hpGaugeColor1?: string, hpGaugeColor2?: string): void;
            updateBossHpGauge(): void;
            findTargetHitBoxSprite(target: HitBox): Sprite_HitBox | undefined;
        }
    }
}
declare module "ARPG_Core/Sprite_MapEventGauge" {
    import { ICommonGaugeConfig, Sprite_CommonGauge } from "ARPG_Core/Sprite_CommonGauge";
    export class Sprite_MapEventGauge extends Sprite_CommonGauge {
        static _update: () => void;
        static _createBitmap: () => void;
        inner: Point;
        private _characterSprite;
        private _position;
        private _yOffset;
        private _currentBitmapWidth;
        constructor(characterSprite: Sprite_Character, position: "up" | "down", yOffset: number, height: number, config: ICommonGaugeConfig);
        initialize(...args: any[]): void;
        initMembers(): void;
        redraw(): void;
        update(): void;
        createBitmap(): void;
    }
}
declare module "ARPG_Core/Sprite_Character" {
    import { Sprite_MapEventGauge } from "ARPG_Core/Sprite_MapEventGauge";
    interface IInnerChild extends Sprite {
        inner?: Point;
        innerVisible?: boolean;
    }
    global {
        interface Sprite_Character {
            _hpGauge: Sprite_MapEventGauge;
            _innerChildren: IInnerChild[];
            _pressed: boolean;
            character(): Game_CharacterBase;
            addInnerChild(child: Sprite): void;
            removeInnerChild(child: Sprite): void;
            updateInnerChildren(): void;
            updateHpGauge(): void;
            createHpGauge(): void;
            processTouch(): void;
            isPressed(): boolean;
            isClickEnabled(): boolean;
            isBeingTouched(): boolean;
            hitTest(x: number, y: number): boolean;
            spriteWidth(): number;
            spriteHeight(): number;
            onPress(): void;
            onClick(): void;
        }
    }
}
declare module "ARPG_Core/Scene_Map" {
    import { Window_CommonMessage } from "ARPG_Core/Window_CommonMessage";
    global {
        interface Scene_Map {
            _setupBossHpGaugeCompleted: boolean;
            createSkillNameWindowCallback(window: Window_CommonMessage): void;
            deleteSkillNameWindowCallback(window: Window_CommonMessage): void;
        }
    }
}
declare module "ARPG_Core/Tilemap" {
    global {
        interface Tilemap {
            stopAnimation(): void;
            resumeAnimation(): void;
        }
    }
}
declare module "ARPG_Core/Window_MenuCommand" { }
declare module "ARPG_Core/Main" {
    /*!/*:ja
    @target MZ
    @plugindesc ARPGコア v1.3.0
    @author うなぎおおとろ
    
    @help
    【概要】
    本プラグインはツクールMZのシステムをARPGに変換する機能を提供します。
    
    ■ 特徴
    本プラグインはアクションRPGに必要なプレイヤーやエネミーのステータス管理、
    当たり判定の設定、攻撃処理の設定といった機能を提供します。
    
    ダメージを与えるオブジェクト(剣による斬撃や弾の発射など)は全てイベントを動的に設定することで
    実現します。このため、非常にカスタマイズ性の高いプラグインになっています。
    
    また、ダメージを受けた場合の処理などもコモンイベントによって作成することが可能です。
    例えば、サンプルゲームではダメージを受けた場合、キャラクターがダメージを受けた方向にノックバックしますが、
    これはコモンイベントからキャラクター吹き飛ばし用のプラグインコマンドを実行することで実現しています。
    この機能を活用すれば、例えば連続して攻撃を当てた場合のみ吹き飛ばすといったコンボ的なシステムを導入することも可能です。
    
    また、本プラグインではドット移動プラグインの上に構築していますので、あらゆるキャラクターの移動を
    ドット単位で制御でき、非常にアクション性の高いゲームを作ることが可能です。
    例えば敵キャラとプレイヤーの角度を計算し、その方向に向けて弾を飛ばすことで、
    プレイヤーを追撃する攻撃なども実現できます。
    
    ■ 依存プラグイン
    本プラグインの導入に当たっては以下のプラグインを必須とします。
    
    ・ドット移動システム(DotMoveSystem.js)
    キャラクターをドット単位で制御するために使用します。
    
    ・ドット移動機能拡張プラグイン(DotMoveSystem_FunctionEx.js)
    ドット移動システム本体に様々な拡張機能を追加するプラグインです。
    
    ・セルフ変数プラグイン(SelfVariable.js)
    セルフ変数や拡張セルフスイッチ、コモンイベント変数/スイッチを提供するプラグインです。
    ARPGコアでは様々なゲーム中でのフラグを自動的にセルフ変数として
    イベントに設定することがありますので(スキルを使用したユーザーのIDなど)、
    そのために使用します。
    
    これらの依存プラグインを含めた本プラグインの導入順については以下のように導入してください。
    ・DotMoveSystem.js
    ・DotMoveSystem_FunctionEx.js
    ・SelfVariable.js
    ・ARPG_Core.js
    
    【機能詳細】
    [全般]
    ■ ARPGモードの開始と終了
    プラグインコマンドの「ARPGモード切り替え」でONを設定するとARPGモードを開始します。
    OFFにした場合はARPGモードを終了します。
    ARPGモードになるとフィールドでの敵との戦闘が可能になります。
    現在のARPGモードがONであるかはプラグインパラメータ「ARPGモードスイッチ」で
    設定したスイッチによって確認することができます。
    
    ※注意1: マップを移動した場合、ARPGモードは自動的にOFFに切り替わります。
    ※注意2: ARPGモードスイッチを変更しても効果はありません。ARPGモードの切り替えは
    必ずこのコマンドによって行う必要があります。
    ※注意3: ARPG戦闘中はセーブを行うことができません。
    
    
    [コピーイベント/動的イベント関連]
    ■ イベントのコピー
    イベントのメモ欄に以下のように記述すると、プラグインパラメータで指定した
    動的イベントコピー元マップの一覧から指定したイベントをコピーします。
    <cp: コピー元イベント名前またはイベントID>
    
    また、以下のように記述することでコピー元のマップを限定することも可能です。
    <cp: コピー元マップID,コピー元イベント名前またはイベントID>
    
    ※注意: コピー元となるマップのIDについては全てプラグインパラメータ
           「コピーイベント共通設定/動的イベント生成元マップID一覧」に設定する必要があります。
    
    ■ 動的イベントの生成
    プラグインコマンド「動的イベント生成」を実行することで動的にイベントを生成することができます。
    動的イベントのコピー元となるイベントはプラグインパラメータ「動的イベント生成元マップID一覧」に
    登録されたマップに配置する必要があります。
    
    ■ 動的イベントの削除
    生成した動的イベントはイベントコマンド「イベントの一時消去」を
    実行することで完全に消去されます。
    
    
    [アクター関連]
    ■ ガードについて
    ARPG戦闘中にAキーを押している間、プレイヤーはガードを行います。
    ガード中にプレイヤーの向きと反対方向から攻撃を受けた場合、ガード中であればダメージを半減します。
    また、攻撃をガードする直前でガードした場合はジャストガードとなり、ダメージを完全に無力化します。
    
    ガード成功判定に使用する攻撃の方向については「スキルオブジェクトの攻撃角度」を参照してください。
    
    ガード機能を使用しない場合、プラグインパラメータ「キー共通設定/アクターガードキー」の
    キー名を「未割り当て」に設定してください。
    
    また、ガード機能は使用するがジャストガードを使用しない場合、
    ジャストガードのフレーム数に0を設定してください。
    
    ■ プラグインコマンドによるガード設定
    ガードはAキーを押す以外にもプラグインコマンドを実行してガードさせることも可能です。
    プラグインコマンド「プレイヤーガードモード設定」でガードモードをONに設定すると、
    その間はガードした状態になります。OFFに設定するとガードを解除します。
    この機能は主にキーボードやゲームパッドがない環境でガードを行うことを想定しています。
    
    ■ アクター切り替え
    Sキーを押すと、プレイヤーのアクターを切り替えることができます。
    この機能はARPGモードのON/OFFにかかわらず使用可能です。
    
    また、プラグインコマンド「操作アクター変更」を実行することでも
    アクターの切り替えが可能です。
    
    プラグインパラメータ「操作アクター変更許可スイッチID」で設定した
    スイッチがOFFになるとキー入力によるアクター切り替えが無効になります。
    プラグインコマンドによる操作アクターの変更はスイッチのON/OFFにかかわらず
    使用することが可能です。
    
    ※注意: アクターが攻撃中またはダメージを受けている途中の場合は
    アクターを切り替えることはできません。また、アクターの切り替えができない間は
    メニュー画面の並び替え機能も使用できません。
    
    
    [エネミー関連]
    ■ 敵キャラの設定について
    敵キャラのイベント内において、並列処理、または自動実行によって
    プラグインコマンド「エネミー設定」を実行することで、それを実行したイベントは
    敵キャラとして扱われます。
    なお、「エネミー設定」は必ずARPGモードがONの場合に実行してください。
    
    敵キャラ設定時に引数で「衝突攻撃スキルID」「敵撃破コモンイベントID」
    「エネミーダメージコモンイベントID」を設定することができますが、
    これらの値に0を指定した場合、プラグインパラメータ「エネミー共通設定」
    にある同一名のパラメータの値が適用されます。
    
    ■ 敵キャラのHP表示
    プラグインコマンド「エネミー設定」で「HPゲージ」を設定することで、敵キャラのHPを表示することが可能です。
    "ノーマル"を設定した場合、敵キャラに直接HPゲージを表示します。
    "ボス"を設定した場合、画面上部に大きなHPゲージを表示します。
    
    
    [スキル関連]
    ■ スキルの作成
    スキルのメモ欄に<action: コモンイベント名またはID>と記載すると、
    そのスキルを実行したときに該当のコモンイベントが呼び出されます。
    このコモンイベントのことを「アクションコモンイベント」といいます。
    アクションコモンイベント内では、プラグインコマンド「スキル発動」を実行することで、
    スキルを発動し、MPあるいはTPの消費が行われます。
    
    この状態で、「スキルオブジェクト生成」を行うことで、スキルオブジェクトが生成されます。
    スキルオブジェクトとは、バトラーに当たるとダメージを与えたりHPを回復させたりなど
    スキルの効果をバトラーに与えることができるイベントのことです。
    シューティングゲームでプレイヤーや敵キャラが発射した弾がスキルオブジェクトと考えると
    イメージがつきやすいかと思います。
    スキルオブジェクトがバトラーに衝突した場合、スキルで設定した効果が衝突したバトラーに適用されます。
    なお、スキルオブジェクトの当たり判定についてはデフォルトではスキルオブジェクトとした
    イベントのサイズがそのまま当たり判定となりますが、以下の「■ 当たり判定の設定」
    の手順によって自由に当たり判定をカスタマイズすることが可能です。
    
    「スキル発動」を実行しなかった場合、MP/TPの消費は行われません。これを利用して
    スキルアクションのコモンイベント実行時にスキル発動条件が成立(例えば近くに敵キャラがいるか等)しなかった場合は
    スキルを実行しないといったようなことも実現可能です。
    
    ※注意: スキル発動を行わずにスキルオブジェクト生成を行うことはできません。行った場合はエラーが表示されます。
    
    ■ アクションコモンイベント内で使用可能なコモンイベント変数
    スキル使用時に実行されるコモンイベントでは「ユーザー種別格納コモンイベント変数」と
    「ユーザーイベントID格納コモンイベント変数」を使用することができます。
    
    ユーザー種別格納コモンイベント変数にはアクションコモンイベントを実行したユーザーとなる
    キャラクターの種別が自動的に格納されます。
    
    ユーザーイベントID格納コモンイベント変数にはアクションコモンイベントを実行したユーザーとなる
    キャラクターがイベントだった場合にイベントIDが自動的に格納されます。
    
    この2つを組み合わせることで各種プラグインコマンドのキャラクター指定引数にて
    スキルを使用したキャラクターを指定することができるようになります。
    
    ※ これらの変数は必ずコモンイベント変数としてください。
    
    ■ スキルオブジェクトとして生成したイベント内で使用可能なセルフ変数
    プラグインコマンド「スキルオブジェクト生成」によって生成されたイベントでは
    セルフ変数「スキルオブジェクトユーザー種別格納セルフ変数」と
    「スキルオブジェクトユーザーイベントID格納セルフ変数」を使用することができます。
    
    スキルオブジェクトユーザー種別格納セルフ変数にはスキルオブジェクト生成を実行した
    ユーザーとなるキャラクターの種別が格納されます。
    
    スキルオブジェクトユーザーイベントID格納セルフ変数にはスキルオブジェクト生成を実行した
    ユーザーとなるキャラクターがイベントだった場合にイベントIDが格納されます。
    
    ※ これらの変数は必ずセルフイベント変数としてください。
    
    ■ ダメージを受けた時に使用中のスキルをキャンセルする
    プラグインコマンド「ダメージスキルキャンセル有効/無効切り替え」を有効に設定すると、
    ダメージを受けた時にスキルがキャンセルされ、スキルコモンイベントを強制終了します。
    
    また、プラグインコマンド「スキル発動」で詠唱コモンイベントIDを指定すると、
    スキル発動までそのコモンイベントを実行し、その間はダメージによるスキルキャンセルが有効になります。
    「ダメージスキルキャンセル有効/無効切り替え」でも同様のことは実現できますが、
    スキル詠唱が目的の場合はこちらを利用した方がシンプルです。
    
    ※スキルキャンセルとする最大HPダメージ比率はプラグインコマンド「バトラーARPGパラメータ設定」で
    「スキルキャンセルダメージレート」を設定することによって変更可能です。
    設定しなかった場合は1ダメージでも受けるとスキルキャンセルとなります。
    
    ■ スキルオブジェクトの攻撃角度
    スキルオブジェクトに対してプラグインコマンド「攻撃角度指定」を実行することで
    スキルオブジェクトに攻撃角度を設定することが可能です。
    ここで設定した攻撃角度はガード時にスキルオブジェクトの方を向いているかの
    判定を行う用途に使用されます。
    
    また、ここで設定された値はダメージを受けた時に実行されたコモンイベント内で
    コモンイベント変数「ダメージ角度格納コモン変数」を読みだすことで取得することが可能です。
    これをプラグインコマンド「キャラクター吹き飛ばし」と組み合わせることで
    ダメージを受けた方向にキャラクターを吹き飛ばすといったことが実現可能です。
    
    ■ スキルオブジェクトの位置と使用者の移動を連動させる
    スキルオブジェクトに対してプラグインコマンド「スキルオブジェクト使用者位置同期」を実行することで
    スキルオブジェクトの位置と使用者の移動を連動させることができます。
    この機能を使用することで例えばダッシュしながら攻撃するといったことも可能になります。
    
    ■ スキル効果の適用
    スキル発動後、プラグインコマンド「スキル効果適用」を実行すると、
    該当のスキルの効果を使用者に適用することができます。
    ※ スキルのダメージのみが適用されます。使用効果は適用されません。
    
    また、プラグインコマンド「スキル効果適用テスト」を実行した場合、
    スキル効果の適用が可能であるかを事前にチェックすることができます。
    この機能を使うことで例えばHP満タンの場合は回復アイテムは
    使用できないといったことが実現可能です。
    
    ■ スキル発動時のスキル名表示
    スキルのメモ欄に以下のように記載することでスキル発動時に
    ポップアップウィンドウを表示することができます。
    この場合、スキルの"メッセージ"で設定したテキストが表示されます。
    <showSkillName>
    
    ■ ダメージを受けた時の無敵時間の設定
    スキルのメモ欄に以下のように記載することでスキルによる
    ダメージを受けた時の無敵時間を設定することができます。
    <noDamageFrame: 無敵時間>
    
    例: 無敵時間を60フレームに設定する場合
    <noDamageFrame: 60>
    
    ※ この設定を省略した場合、無敵時間は30フレームになります。
    
    ■ スキル使用後の攻撃禁止時間の設定
    スキルのメモ欄に以下のように記載することでスキル使用後の
    攻撃禁止時間を設定することができます。
    <noAttackFrame: 攻撃禁止時間>
    
    例: 攻撃禁止時間を120フレームに設定する場合
    <noAttackFrame: 120>
    
    ※ この設定を省略した場合、攻撃禁止時間は60フレームになります。
    
    ■ スキル発動時の慣性移動キャンセルの指定
    スキルのメモ欄に以下のように記載することでスキル発動時に
    慣性移動をキャンセルすることができます。
    <cancelAcceleration: true>
    
    以下のように設定した場合はスキル発動後もそのまま慣性移動を行います。
    <cancelAcceleration: false>
    
    ※ この設定を省略した場合、慣性移動キャンセルは有効になります。
    
    ■ スキル発動時の移動禁止の指定
    スキルのメモ欄に以下のように記載することでスキル発動時に
    移動を禁止することができます。
    <disableMove: true>
    
    以下のように設定した場合はスキル発動後もそのまま慣性移動を行います。
    <disableMove: false>
    
    ※ この設定を省略した場合、移動禁止は有効になります。
    ※ 禁止するのはキーまたはタッチによるプレイヤー移動および自律移動のみとなります。
       イベントコマンドからの移動は禁止されません。
    
    
    [フィールドオブジェクト関連]
    ■ フィールドオブジェクト
    フィールドオブジェクトとはプレイヤーでもエネミーでもないが当たり判定が設定可能な
    オブジェクトのことを指します。剣で破壊可能な草や、矢が当たるとONになるスイッチなどを
    想定しています。
    フィールドオブジェクトの当たり判定は「カスタム判定」のみ設定することができます。
    カスタム判定の詳細については「■ 当たり判定の設定」を参照してください。
    
    
    [当たり判定関連]
    ■ 当たり判定の設定
    プラグインコマンド「当たり判定設定」で当たり判定の設定を行うことができます。
    当たり判定は以下の種類があります。
    攻撃判定: この判定が「ダメージ判定」と接触した場合、ダメージ判定の設定者にダメージを与えます。
    ダメージ判定: この判定が「攻撃判定」と接触した場合、攻撃判定の設定者からダメージを受けます。
    カスタム判定: ユーザーが独自に定義可能な当たり判定です。ここで設定した当たり判定は
                 プラグインコマンド「当たり判定チェック」でチェックすることができます。
    
    当たり判定は以下のキャラクターに対して設定することが可能です。
    それ以外のキャラクターに対して当たり判定を設定するとエラーになります。
    ・プレイヤー(全ての当たり判定が設定可能)
    ・エネミー(全ての当たり判定が設定可能)
    ・フィールドオブジェクト(カスタム判定のみ設定可能)
    ・スキルオブジェクト(攻撃判定/カスタム判定のみ設定可能)
    
    ※ プレイヤーの当たり判定はプラグインパラメータ「プレイヤー当たり判定設定」で行えます。
    
    ■ プラグインコマンドによる当たり判定チェック
    攻撃判定とダメージ判定に応じたダメージ処理はプラグイン側で自動的に行われますが、
    プラグインコマンド「当たり判定チェック」によって
    好きなタイミングで当たり判定のチェックを行うことが可能です。
    
    ■ 当たり判定の可視化
    プラグインパラメータ「ヒットボックス共通設定/ヒットボックス可視化切り替え」で指定した
    スイッチをONにすると、ヒットボックスが可視化されます。
    
    また、プラグインパラメータ「ヒットボックス可視化切り替えキー」で
    設定したキー(デフォルトではF6)を押すと、自動的にヒットボックスの可視化状態を切り替えることが可能です。
    なお、この機能はテストプレイ中のみ有効です。
    ※ スイッチの設定でヒットボックスを可視化した場合はテストプレイでなくても可視化可能です。
    
    
    [その他]
    ■ 時間経過で解消されるステートの設定
    ARPGでは時間経過でステートを解消したい場面も多くあるかと思いますので、
    そのための機能を用意しています。
    ステートのメモ欄で以下の記載をすることで指定したフレーム数が経過したタイミングで
    ステートを解消することができるようになります。
    <duration: フレーム数>
    
    例えば10秒後にステートを解消する場合は以下のように設定します。(1秒=60フレーム)
    <duration: 60>
    
    この設定だけではステートの重ね掛けを行った場合でも残りフレーム数は更新されません。
    ステートの重ね掛けで残りフレーム数を更新する場合、以下の内容をメモ欄に記載する必要があります。
    <overWriteDuration>
    
    ■ 武器ごとのスキル設定
    武器の種類に応じて通常攻撃時のスキルを切り替えることが可能です。
    武器のメモ欄に以下の記載をすることで指定したスキルを実行します。
    <skill: スキル名>
    
    ※ 二刀流を設定した場合、2回分スキルを実行します。
    
    ■ 透明オブジェクト発射
    透明なオブジェクトを発射し、当たり判定チェックを行うことができます。
    例えば前方に敵がいるかをチェックするなどの用途で使用することが可能です。
    透明オブジェクトの衝突対象については「プライオリティが通常キャラと同じに設定されたイベント」
    と同じになります。
    
    ※注意
    透明オブジェクトを生成した位置にすでにキャラクターがいた場合、
    透明オブジェクトはそのキャラクターをすり抜け対象にします。
    
    ■ ターゲット選択機能
    プラグインコマンド「ターゲット選択」を実行することで
    ゲーム上でカーソルによるプレイヤーまたはエネミーの選択が可能です。
    これによって例えば選択した敵キャラに向けて弾を発射するといったことが
    可能になります。
    
    また、ウェイトをONにした場合は選択中は時間を停止することができ、
    OFFにした場合はリアルタイムで選択することができます。
    
    キャンセル可能をONにするとターゲット選択中にキャンセルボタンを押した場合、
    ターゲット選択をキャンセルすることが可能です。
    この場合、選択結果格納スイッチに格納される結果はOFFになります。
    
    ■ イベントの画面内判定
    プラグインパラメータ「キャラクター画面内判定」を実行することで
    指定したキャラクターが画面内にいるかを判定することができます。
    
    
    【補足情報】
    各種プラグインパラメータやプラグインコマンドで「キャラクター指定」を
    行う場合、変数でキャラクターを指定することが可能です。
    その場合、各種変数の値の意味については以下の通りとなります。
    
    ■ キャラクター種別の変数の値
    プレイヤー: 1
    フォロワー: 2
    イベント: 3
    乗り物: 4
    
    ■ フォロワーインデックスの変数の値
    一人目: 1
    二人目: 2
    (以下略)
    
    ■ 乗り物の変数の値
    小型船: 1
    大型船: 2
    飛行船: 3
    
    
    @command ChangeARPGMode
    @text ARPGモード切り替え
    @desc ARPGモードの有効/無効を切り替えます。
    
    @arg ARPGMode
    @text ARPGモード
    @type boolean
    @default true
    @desc 切り替え先のARPGモードを指定します。
    
    
    @command MakeDynamicEvent
    @text 動的オブジェクト生成
    @desc 動的オブジェクトを生成します。
    
    @arg SrcMapId
    @type number
    @text 生成元マップID
    @default 1
    @desc 生成元マップIDを指定します。
    
    @arg SrcEventIdOrName
    @type string
    @text 生成元イベントID or イベント名
    @default 0
    @desc 生成元イベントIDまたはイベント名を指定します。
    
    @arg X
    @type number
    @text X座標
    @default 0
    @desc イベントを生成するX座標を指定します。
    
    @arg XByVariable
    @type variable
    @text X座標(変数指定)
    @default 0
    @desc イベントを生成するX座標を変数で指定します。直接X値を設定した場合は本パラメータは0を指定してください。
    
    @arg Y
    @type number
    @text Y座標
    @default 0
    @desc イベントを生成するY座標を指定します。
    
    @arg YByVariable
    @type variable
    @text Y座標(変数指定)
    @default 0
    @desc イベントを生成するY座標を変数で指定します。直接Y値を設定した場合は本パラメータは0を指定してください。
    
    @arg MadeDynamicEventId
    @text 生成動的イベントID格納変数
    @type variable
    @default 0
    @desc
    生成した動的イベントのIDを格納する変数IDを指定します。
    
    
    @command GetCharacterFloatPosition
    @text キャラクター小数座標取得
    @desc キャラクターの小数座標を取得します。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg LeftUpOrCenter
    @text 左上 or 中心
    @type select
    @option 左上
    @value leftup
    @option 中心
    @value center
    @default leftup
    @desc キャラクターの左上座標または中心座標のどちらを取得するかを選択します。
    
    @arg StoreFloatXVariableId
    @text 小数X座標格納変数ID
    @type variable
    @default 0
    @desc 取得した小数X座標を格納する変数IDを指定します。
    
    @arg StoreFloatYVariableId
    @text 小数Y座標格納変数ID
    @type variable
    @default 0
    @desc 取得した小数Y座標を格納する変数IDを指定します。
    
    
    @command CalcDeg
    @text キャラクター間角度取得
    @desc 主体キャラクターから見た対象キャラクターの角度を取得します。
    
    @arg SubjectCharacterSpecification
    @text 主体キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 主体となるキャラクターを指定します。
    
    @arg TargetCharacterSpecification
    @text 対象キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg StoreDegreeVariableId
    @text 角度格納変数ID
    @type variable
    @default 0
    @desc 取得した角度を格納する変数IDを指定します。
    
    
    @command CalcFar
    @text キャラクター間距離取得
    @desc 主体キャラクターと対象キャラクターとの距離を取得します。
    
    @arg SubjectCharacterSpecification
    @text 主体キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 主体となるキャラクターを指定します。
    
    @arg TargetCharacterSpecification
    @text 対象キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg StoreFarVariableId
    @text 距離格納変数ID
    @type variable
    @default 0
    @desc 取得した距離を格納する変数IDを指定します。
    
    
    @command CheckInTheScreen
    @text キャラクター画面内判定
    @desc キャラクターが画面内にいるかを判定します。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg XMargin
    @text X軸マージン
    @type number
    @decimals 2
    @default 2
    @desc X軸の画面外マージン幅を指定します。単位はマス数です。
    
    @arg YMargin
    @text Y軸マージン
    @type number
    @decimals 2
    @default 2
    @desc Y軸の画面外マージン幅を指定します。単位はマス数です。
    
    @arg StoreResultSwitchId
    @text 結果格納スイッチID
    @type switch
    @default 1
    @desc 画面内にいる場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。
    
    
    @command CheckMoved
    @text キャラクター移動有無チェック
    @desc キャラクターがそのフレーム内に移動したかをチェックします。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg StoreResultSwitchId
    @text 結果格納スイッチID
    @type switch
    @default 1
    @desc 移動した場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。
    
    
    @command TransparentObjectCast
    @text 透明オブジェクト発射
    @desc 透明オブジェクトを発射し、オブジェクトに衝突するかをチェックします。
    
    @arg TransparentObjectPosition
    @type struct<TransparentObjectPosition>
    @text 位置指定
    @desc 透明オブジェクトの生成位置を指定します。
    
    @arg Degree
    @text 角度
    @type number
    @decimals 2
    @default 0
    @desc 透明オブジェクトの発射角度を指定します。
    
    @arg DegreeByVariable
    @text 角度(変数指定)
    @type variable
    @default 0
    @desc 透明オブジェクトの発射角度を変数で指定します。
    
    @arg Far
    @text 距離
    @type number
    @decimals 2
    @default 0
    @desc 透明オブジェクトの発射距離を指定します。0を指定すると無限になります。
    
    @arg FarByVariable
    @text 距離(変数指定)
    @type variable
    @default 0
    @desc 透明オブジェクトの発射距離を変数で指定します。
    
    @arg Width
    @text 横幅
    @type number
    @decimals 2
    @default 1
    @desc 透明オブジェクトの横幅を指定します。
    
    @arg Height
    @text 縦幅
    @type number
    @decimals 2
    @default 1
    @desc 透明オブジェクトの縦幅を指定します。
    
    @arg CollisionResultSwitchId
    @text 衝突結果格納スイッチID
    @type switch
    @default 1
    @desc 衝突した場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。
    
    @arg CollidedXVariableId
    @text 衝突X座標格納変数ID
    @type variable
    @default 0
    @desc 衝突が発生した地点のX座標を格納する変数IDを指定します。
    
    @arg CollidedYVariableId
    @text 衝突X座標格納変数ID
    @type variable
    @default 0
    @desc 衝突が発生した地点のX座標を格納する変数IDを指定します。
    
    
    @command SetupEnemy
    @text エネミー設定
    @desc イベントのエネミー設定を行います。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg EnemyId
    @text エネミーID
    @type enemy
    @default 1
    @desc エネミーIDを指定します。
    
    @arg CollideAttackSkillId
    @text 衝突攻撃スキルID
    @type skill
    @default 0
    @desc
    エネミーがアクターに衝突したときにダメージ計算を行うスキルIDを指定します。
    
    @arg DamageCommonEventId
    @text エネミーダメージコモンイベントID
    @type common_event
    @default 0
    @desc
    エネミーがダメージを受けたときに実行するコモンイベントを指定します。
    
    @arg DefeatEnemyCommonEventId
    @text 敵撃破コモンイベントID
    @type common_event
    @default 0
    @desc
    敵撃破時に実行するコモンイベントIDを指定します。
    
    @arg HpGauge
    @text HPゲージ
    @type select
    @option なし
    @value none
    @option ノーマル
    @value normal
    @option ボス
    @value boss
    @default normal
    @desc HPゲージの表示を設定します。
    
    
    
    @command ChangeHpGaugeVisible
    @text エネミーHPゲージ表示切り替え
    @desc エネミーのHPゲージ表示/非表示を切り替えます。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg ShowOrHide
    @text 表示/非表示
    @type boolean
    @on 表示
    @off 非表示
    @default true
    @desc 表示または非表示を選択します。
    
    
    @command SetupFieldObject
    @text フィールドオブジェクト設定
    @desc イベントのフィールドオブジェクト設定を行います。
    
    
    @command UseSkill
    @text スキル使用
    @desc スキルを使用します。
    
    @arg SkillId
    @type skill
    @text スキルID
    @default 1
    @desc 使用するスキルのIDを指定します。名前指定または変数指定を行った場合、そちらが優先されます。
    
    @arg SkillByName
    @type string
    @text スキル(名前指定)
    @desc 使用するスキルの名前を指定します。名前指定を使用しない場合は空欄にしてください。
    
    @arg SkillIdByVariable
    @type variable
    @text スキルID(変数指定)
    @default 0
    @desc 使用するスキルのIDを変数で指定します。変数指定を使用しない場合は0にしてください。
    
    
    @command UseItem
    @text アイテム使用
    @desc アイテムを使用します。
    
    @arg ItemId
    @type item
    @text アイテムID
    @default 1
    @desc 使用するアイテムのIDを指定します。名前指定または変数指定を行った場合、そちらが優先されます。
    
    @arg ItemByName
    @type string
    @text アイテム(名前指定)
    @desc 使用するアイテムの名前を指定します。名前指定を使用しない場合は空欄にしてください。
    
    @arg ItemIdByVariable
    @type variable
    @text アイテムID(変数指定)
    @default 0
    @desc 使用するアイテムのIDを変数で指定します。変数指定を使用しない場合は0にしてください。
    
    
    @command SkillActivation
    @text スキル発動
    @desc スキルを発動します。本コマンドは必ずスキルのアクションコモンイベント内で呼び出してください。
    
    @arg ChantCommonEventId
    @type common_event
    @text 詠唱コモンイベントID
    @default 0
    @desc 詠唱処理を実行するコモンイベントのIDを指定します。
    
    
    @command ChangeSkillCancelWhenDamageEnableOrDisable
    @text ダメージスキルキャンセル有効/無効切り替え
    @desc ダメージによるスキルキャンセル有効/無効を切り替えます。本コマンドは必ずスキルのアクションコモンイベント内で呼び出してください。
    
    @arg EnableOrDisable
    @text 有効/無効
    @type boolean
    @on 有効
    @off 無効
    @default true
    @desc
    有効または無効を選択します。
    
    
    @command TestApplySkillEffect
    @text スキル効果適用テスト
    @desc 使用者にスキル効果が適用可能であるかをテストし、結果をスイッチに設定します。
    
    @arg IsSkillSpecification
    @text スキル指定有無
    @type boolean
    @default false
    @desc ONを指定すると対象となるスキルを指定します。指定しなかった場合、発動したスキルが適用されます。
    
    @arg SkillSpecification
    @text スキル指定
    @type struct<SkillSpecification>
    @default {"SkillOrItem":"skill","SkillId":"1","SkillByName":"","SkillIdByVariable":"0","ItemId":"1","ItemByName":"","ItemIdByVariable":"0"}
    @desc スキル指定有無をOnにした場合に対象となるスキルを指定します。
    
    @arg StoreResultSwitchId
    @text 結果格納スイッチID
    @type switch
    @default 1
    @desc 使用可能な場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。
    
    
    @command ApplySkillEffect
    @text スキル効果適用
    @desc 使用者にスキル効果を適用します。本コマンドは必ずスキルのアクションコモンイベント内で「スキル発動」の後に呼び出してください。
    
    @arg IsSkillSpecification
    @text スキル指定有無
    @type boolean
    @default false
    @desc ONを指定すると対象となるスキルを指定します。指定しなかった場合、発動したスキルが適用されます。
    
    @arg SkillSpecification
    @text スキル指定
    @type struct<SkillSpecification>
    @default {"SkillOrItem":"skill","SkillId":"1","SkillByName":"","SkillIdByVariable":"0","ItemId":"1","ItemByName":"","ItemIdByVariable":"0"}
    @desc スキル指定有無をOnにした場合に対象となるスキルを指定します。
    
    
    @command MakeSkillObject
    @text スキルオブジェクト生成
    @desc スキルオブジェクトを生成します。
    
    @arg SrcMapId
    @type number
    @text 生成元マップID
    @default 1
    @desc 生成元マップIDを指定します。
    
    @arg SrcEventIdOrName
    @text 生成元イベントID or イベント名
    @type string
    @default 0
    @desc 生成元イベントIDまたはイベント名を指定します。
    
    @arg SkillObjectPosition
    @type struct<SkillObjectPosition>
    @text 位置指定
    @desc スキルオブジェクトの生成位置を指定します。
    
    @arg IsSkillSpecification
    @text スキル指定有無
    @type boolean
    @default false
    @desc ONを指定すると対象となるスキルを指定します。指定しなかった場合、発動したスキルが適用されます。
    
    @arg SkillSpecification
    @text スキル指定
    @type struct<SkillSpecification>
    @default {"SkillOrItem":"skill","SkillId":"1","SkillByName":"","SkillIdByVariable":"0","ItemId":"1","ItemByName":"","ItemIdByVariable":"0"}
    @desc スキル指定有無をOnにした場合に対象となるスキルを指定します。
    
    @arg MadeDynamicEventId
    @text 生成動的イベントID格納変数
    @type variable
    @default 0
    @desc
    生成した動的イベントのIDを格納する変数IDを指定します。
    
    
    @command SetAttackDegree
    @text 攻撃角度指定
    @desc スキルオブジェクトの攻撃角度を指定します。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg AttackDegree
    @type number
    @text 攻撃角度
    @default 0
    @desc 攻撃角度を設定します。
    
    @arg AttackDegreeByVariable
    @type variable
    @text 攻撃角度(変数指定)
    @default 0
    @desc 攻撃角度を変数で設定します。
    
    
    @command SetUserPositionSynchronize
    @text スキルオブジェクト使用者位置同期
    @desc スキルオブジェクトの使用者位置同期の有無を指定します。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg Synchronize
    @type boolean
    @text 同期
    @on 有効
    @off 無効
    @default true
    @desc 同期の有効/無効を指定します。
    
    
    @command SetHitBox
    @text ヒットボックス設定
    @desc ヒットボックスの設定を行います。同じタイプに対して再度ヒットボックス設定を行った場合、既存の設定を上書きします。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg HitBoxType
    @text ヒットボックスタイプ
    @type select
    @option 攻撃
    @value attack
    @option ダメージ
    @value damage
    @option カスタム
    @value custom
    @default attack
    @desc ヒットボックスタイプを設定します。
    
    @arg CustomHitBoxTag
    @text カスタムヒットボックスタグ
    @type string
    @desc ヒットボックスタイプをカスタムにした場合のタグを指定します。
    
    @arg HitBoxList
    @type struct<Box>[]
    @text ヒットボックスリスト
    @default []
    @desc ヒットボックスを設定します。
    
    
    @command ChangeHitBoxEnableOrDisable
    @text ヒットボックス有効/無効切り替え
    @desc ヒットボックスの有効/無効切り替えを行います。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg HitBoxType
    @text ヒットボックスタイプ
    @type select
    @option 攻撃
    @value attack
    @option ダメージ
    @value damage
    @option カスタム
    @value custom
    @default attack
    @desc ヒットボックスタイプを設定します。
    
    @arg CustomHitBoxTag
    @text カスタムヒットボックスタグ
    @type string
    @desc ヒットボックスタイプをカスタムにした場合のタグを指定します。
    
    @arg Enabled
    @text 有効化
    @type boolean
    @desc trueを設定するとヒットボックスを有効化します。
    
    
    @command HitCheck
    @text 当たり判定チェック
    @desc ヒットボックスによる当たり判定チェックを行います。
    
    @arg SubjectCharacterSpecification
    @text 主体キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 主体となるキャラクターを指定します。
    
    @arg SubjectHitBoxType
    @text 主体ヒットボックスタイプ
    @type select
    @option 攻撃
    @value attack
    @option ダメージ
    @value damage
    @option カスタム
    @value custom
    @default attack
    @desc ヒットボックスタイプを設定します。
    
    @arg SubjectCustomHitBoxTag
    @text 主体カスタムヒットボックタグ
    @type string
    @desc カスタムヒットボックタグを設定します。
    
    @arg IsTargetSpecification
    @text 対象指定有無
    @type boolean
    @default false
    @desc ONを指定すると対象となるイベントを指定します。
    
    @arg TargetCharacterSpecification
    @text 対象キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象指定有無がONの場合に対象となるキャラクターを指定します。
    
    @arg TargetHitBoxType
    @text 対象ヒットボックスタイプ
    @type select
    @option 攻撃
    @value attack
    @option ダメージ
    @value damage
    @option カスタム
    @value custom
    @default attack
    @desc ヒットボックスタイプを設定します。
    
    @arg TargetCustomHitBoxTag
    @text 対象カスタムヒットボックタグ
    @type string
    @desc カスタムヒットボックタグを設定します。
    
    @arg StoreResultSwitchId
    @text 結果格納スイッチID
    @type switch
    @default 1
    @desc ヒットしていた場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。
    
    
    @command GetBattlerStatus
    @text バトラーステータス取得
    @desc 指定したバトラーのステータスを取得します。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg StatusType
    @type select
    @option mhp
    @option mmp
    @option hp
    @option mp
    @option tp
    @option atk
    @option mat
    @option mdf
    @option agi
    @option luk
    @option hit
    @option eva
    @option cri
    @option cev
    @option mev
    @option mrf
    @option cnt
    @option hrg
    @option mrg
    @option trg
    @option tgr
    @option grd
    @option rec
    @option pha
    @option mcr
    @option tcr
    @option pdr
    @option mdr
    @option fdr
    @option exr
    @text ステータスタイプ
    @default mhp
    @desc ステータスタイプを指定します。
    
    @arg DestVariableId
    @type variable
    @text 格納先変数
    @default 1
    @desc 取得したステータス値の格納先変数を指定します。
    
    
    @command SetBattlerStatus
    @text バトラーステータス設定
    @desc 指定したバトラーのステータスを設定します。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg StatusType
    @type select
    @option hp
    @option mp
    @option tp
    @text ステータスタイプ
    @default mhp
    @desc ステータスタイプを指定します。
    
    @arg Value
    @type number
    @text 値
    @default 0
    @desc 設定するステータス値を指定します。
    
    @arg ValueByVariable
    @type variable
    @text 値(変数指定)
    @default 0
    @desc 設定するステータス値が格納された変数IDを指定します。
    
    
    @command GetBattlerARPGParameter
    @text バトラーARPGパラメータ取得
    @desc 指定したバトラーのARPG専用パラメータを取得します。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg ARPGParameterType
    @type select
    @option スキルキャンセルダメージレート
    @value skillCancelDamageRate
    @option ジャストガードフレーム
    @value justGuardFrame
    @text ARPGパラメータタイプ
    @default skillCancelDamageRate
    @desc ARPGパラメータタイプを指定します。
    
    @arg DestVariableId
    @type variable
    @text 格納先変数
    @default 1
    @desc 取得したステータス値の格納先変数を指定します。
    
    
    @command SetBattlerARPGParameter
    @text バトラーARPGパラメータ設定
    @desc 指定したバトラーのARPG専用パラメータを設定します。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg ARPGParameterType
    @type select
    @option スキルキャンセルダメージレート
    @value skillCancelDamageRate
    @option ジャストガードフレーム
    @value justGuardFrame
    @text ARPGパラメータタイプ
    @default skillCancelDamageRate
    @desc ARPGパラメータタイプを指定します。
    @arg Value
    @type number
    @text 値
    @default 0
    @decimals 2
    @desc 設定するステータス値を指定します。
    
    @arg ValueByVariable
    @type variable
    @text 値(変数指定)
    @default 0
    @desc 設定するステータス値が格納された変数IDを指定します。
    
    
    @command GetBattlerARPGFlag
    @text バトラーARPGフラグ取得
    @desc 指定したバトラーのARPG専用フラグを取得します。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg ARPGFlagType
    @type select
    @option ノーダメージフラグ
    @value noDamageFlag
    @option 攻撃禁止フラグ
    @value noAttackFlag
    @text ARPGフラグタイプ
    @default noDamageFlag
    @desc ARPGフラグタイプを指定します。
    
    @arg DestSwitchId
    @type switch
    @text 格納先スイッチ
    @default 1
    @desc 取得したフラグ値の格納先スイッチを指定します。
    
    
    @command SetBattlerARPGFlag
    @text バトラーARPGフラグ設定
    @desc 指定したバトラーのARPG専用フラグを設定します。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg ARPGFlagType
    @type select
    @option ノーダメージフラグ
    @value noDamageFlag
    @option 攻撃禁止フラグ
    @value noAttackFlag
    @text ARPGフラグタイプ
    @default noDamageFlag
    @desc ARPGフラグタイプを指定します。
    
    @arg Value
    @type boolean
    @text 値
    @default true
    @desc 設定するフラグ値を指定します。
    
    @arg ValueBySwitch
    @type switch
    @text 値(スイッチ指定)
    @default 0
    @desc 設定するフラグ値が格納されたスイッチIDを指定します。
    
    
    @command SetCheckMapValid
    @text マップ有効範囲チェック有効/無効切り替え
    @desc マップの有効範囲チェックの有効/無効の切り替えを行います。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc
    対象となるキャラクターを指定します。
    
    @arg EnableOrDisable
    @text 有効/無効
    @type boolean
    @on 有効
    @off 無効
    @default true
    @desc
    有効または無効を選択します。
    
    
    @command CharacterBlowAway
    @text キャラクター吹き飛ばし
    @desc キャラクターを指定方向に吹き飛ばします。
    
    @arg CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 対象となるキャラクターを指定します。
    
    @arg Degree
    @text 角度
    @type number
    @default 0
    @desc 吹き飛ばす角度を指定します。
    
    @arg DegreeByVariable
    @text 角度(変数指定)
    @type variable
    @default 0
    @desc 吹き飛ばす角度を変数で指定します。
    
    @arg InitialVelocity
    @text 初速度
    @type number
    @decimals 2
    @default 0.5
    @desc 吹き飛ばす初速度を指定します。
    
    @arg InitialVelocityByVariable
    @text 初速度(変数指定)
    @type variable
    @default 0
    @desc 吹き飛ばす初速度を変数で指定します。
    
    @arg Duration
    @text 間隔
    @type number
    @decimals 2
    @default 10
    @desc 吹き飛ばす間隔を指定します。
    
    @arg DurationByVariable
    @text 間隔(変数指定)
    @type variable
    @default 0
    @desc 吹き飛ばす間隔を変数で指定します。
    
    @arg Wait
    @text ウェイト
    @type boolean
    @default true
    @desc trueを指定すると、吹き飛ばし完了までウェイトします。
    
    
    @command TargetSelect
    @text ターゲット選択
    @desc ターゲット選択を行います。
    
    @arg SelectResultSwitchId
    @text 選択結果格納スイッチID
    @type switch
    @default 0
    @desc
    ターゲットの選択に成功した場合ONが設定されるスイッチIDを指定します。
    
    @arg SelectedTargetCharacterKindVariableId
    @text 選択ターゲットキャラクター種別格納変数ID
    @type variable
    @default 0
    @desc
    選択したターゲットのキャラクター種別を格納する変数IDを指定します。
    
    @arg SelectedTargetEventIdVariableId
    @text 選択ターゲットイベントID格納変数ID
    @type variable
    @default 0
    @desc
    選択したターゲットのイベントIDを格納する変数IDを指定します。
    
    @arg Wait
    @text ウェイト
    @type boolean
    @default true
    @desc
    ONを設定した場合、ターゲット選択中はシーンを停止します。
    
    @arg Cancelable
    @text キャンセル可能
    @type boolean
    @default true
    @desc
    ONを設定した場合、ターゲット選択のキャンセルを有効にします。
    
    
    @command SearchNearBattler
    @text 近隣バトラー検索
    @desc 対象者から最も近いバトラーを検索します。
    
    @arg Target
    @text ターゲット
    @type select
    @option 全バトラー
    @value all
    @option 敵キャラ
    @value opponent
    @option 味方キャラ
    @value friend
    @default all
    @desc ターゲットを指定します。
    
    @arg SubjectCharacterSpecification
    @text 主体キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 主体となるキャラクターを指定します。
    
    @arg StoreResultSwitchId
    @text 結果格納スイッチID
    @type switch
    @default 1
    @desc 敵キャラが見つかった場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。
    
    @arg StoreCharacterKindVariableId
    @text キャラクター種別格納変数ID
    @type variable
    @default 0
    @desc 見つかったバトラーのキャラクター種別を格納する変数IDを指定します。
    
    @arg StoreEventIdVariableId
    @text イベントID格納変数ID
    @type variable
    @default 0
    @desc 見つかったバトラーがイベントの場合にイベントIDを格納する変数IDを指定します。
    
    
    @command SetPlayerGuardMode
    @text プレイヤーガードモード設定
    @desc プレイヤーのガードモードを設定します。
    
    @arg GuardMode
    @text ガードモード
    @type boolean
    @default true
    @desc
    ガードモードONまたはOFFを指定します。
    
    
    @command ChangeControlActor
    @text 操作アクター変更
    @desc 操作アクターを変更します。本コマンドはキー入力によるアクター変更と同じ挙動となります。
    
    
    @command ShowMessagePopup
    @text メッセージポップアップ表示
    @desc メッセージポップアップを表示します。
    
    @arg Text
    @text テキスト
    @type string
    @desc
    ポップアップ表示を行うテキストを指定します。
    
    @arg WindowWidth
    @text 横幅
    @type number
    @default 640
    @desc
    ポップアップウィンドウの横幅を指定します。
    
    @arg Time
    @text 時間
    @type number
    @default 60
    @desc
    ポップアップの表示時間を指定します。
    
    
    @param CopyEventSetting
    @text コピーイベント共通設定
    @type struct<CopyEventSetting>
    @default {"CopyEventTag":"cp","DynamicEventSrcMapIds":"[]"}
    @desc
    コピーイベントの共通設定を行います。
    
    @param BattlerSetting
    @text バトラー共通設定
    @type struct<BattlerSetting>
    @default {"DamageDegCommonVariableId":"0","UserKindCommonVariableId":"0","UserEventIdCommonVariableId":"0","DamageKindCommonVariableId":"0","DamageTypeCommonVariableId":"0","DamageValueCommonVariableId":"0"}
    @desc
    バトラーの共通設定を行います。
    
    @param ActorSetting
    @text アクター共通設定
    @type struct<ActorSetting>
    @default {"NormalAttackSkillId":"0","DamageCommonEventId":"0","NormalGuardCommonEventId":"0","JustGuardCommonEventId":"0","StartGuardCommonEventId":"0","EndGuardCommonEventId":"0","JustGuardFrame":"10","ActorHitBox":"{\"AttackHitBoxList\":\"[]\",\"DamageHitBoxList\":\"[]\"}","GameOverCommonEventId":"0","LevelUpCommonEventId":"0"}
    @desc
    アクターの共通設定を行います。
    
    @param EnemySetting
    @text エネミー共通設定
    @type struct<EnemySetting>
    @default {"CollideAttackSkillId":"0","DamageCommonEventId":"0","DefeatEnemyCommonEventId":"0"}
    @desc
    エネミーの共通設定を行います。
    
    @param SkillObjectSetting
    @text スキルオブジェクト共通設定
    @type struct<SkillObjectSetting>
    @default {"SkillObjectUserKindSelfVariableId":"0","SkillObjectUserEventIdSelfVariableId":"0","CollisionDetectExSelfSwitchId":"0"}
    @desc
    スキルオブジェクトの共通設定を行います。
    
    @param HitBoxSetting
    @text ヒットボックス共通設定
    @type struct<HitBoxSetting>
    @default {"VisibleHitAreaSwitchId":"0","AttackHitBoxColor":"#ff0000aa","DamageHitBoxColor":"#0000ffaa","CustomHitBoxDefaultColor":"#00ff00aa","CustomHitBoxColorList":"[]"}
    @desc
    ヒットボックスの共通設定を行います。
    
    @param EnemyHpGaugeSetting
    @text エネミーHPゲージ設定
    @type struct<EnemyHpGaugeSetting>
    @default {"NormalEnemyHpGaugePosition":"up","NormalEnemyHpGaugeYOffset":"-8","NormalEnemyHpGaugeHeight":"6","NormalEnemyHpGaugeColor1":"#00aa00","NormalEnemyHpGaugeColor2":"#22ff22","BossEnemyHpGaugeLabel":"BOSS","BossEnemyHpGaugeYOffset":"16","BossEnemyHpGaugeWidth":"500","BossEnemyHpGaugeHeight":"12","BossEnemyHpGaugeColor1":"#00aa00","BossEnemyHpGaugeColor2":"#22ff22"}
    @desc
    エネミーのHPゲージ設定を行います。
    
    @param KeySetting
    @text キー入力設定
    @type struct<KeySetting>
    @default {"ActorNormalAttack":"{\"KeyName\":\"ok\",\"KeySymbol\":\"\",\"KeyCode\":\"0\",\"ButtonIndex\":\"-1\"}","ActorGuard":"{\"KeyName\":\"other\",\"KeySymbol\":\"A\",\"KeyCode\":\"65\",\"ButtonIndex\":\"6\"}","VisibleHitBox":"{\"KeyName\":\"other\",\"KeySymbol\":\"F6\",\"KeyCode\":\"117\",\"ButtonIndex\":\"-1\"}","ChangeControlActor":"{\"KeyName\":\"other\",\"KeySymbol\":\"S\",\"KeyCode\":\"83\",\"ButtonIndex\":\"11\"}"}
    @desc
    キー入力の各種設定を行います。
    
    @param SESetting
    @text SE設定
    @type struct<SESetting>
    @default {"ActorChange":"{\"FileName\":\"Decision5\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}"}
    @desc
    SEの各種設定を行います。
    
    @param EnableARPGSwitchId
    @text ARPG有効化スイッチID
    @type switch
    @default 0
    @desc
    ARPGを有効化するスイッチIDを指定します。
    
    @param UseDamagePopup
    @text ダメージポップアップ使用
    @type boolean
    @default true
    @desc
    trueを設定すると攻撃によるダメージ発生時にダメージ値を表示します。
    
    @param UseImageDamage
    @text ダメージ画像使用
    @type boolean
    @default false
    @desc
    trueを設定するとsystem/Damage.pngの画像をダメージ表示に使用します。
    
    @param UseImageTargetSelectCursor
    @text ターゲット選択カーソル画像使用
    @type boolean
    @default false
    @desc
    trueを設定すると画像をターゲット選択カーソルに使用します。
    
    @param TargetSelectCursorImageFileName
    @text ターゲット選択カーソル画像ファイル名
    @type file
    @dir img
    @desc
    ターゲット選択カーソルの画像ファイル名を指定します。
    
    @param EnableChangeControlActorSwitchId
    @text 操作アクター変更許可スイッチID
    @type switch
    @default 0
    @desc
    操作アクターの変更を許可するスイッチIDを指定します。0を設定した場合は常に有効になります。
    
    @param ErrorMessageLanguage
    @text エラーメッセージ言語
    @type select
    @option 英語
    @value en
    @option 日本語
    @value ja
    @default ja
    @desc
    エラーメッセージの表示言語を指定します。
    */
    /*!/*~struct~CopyEventSetting:ja
    @param CopyEventTag
    @text コピーイベントタグ
    @type string
    @default cp
    @desc
    コピーするイベントを判定するためのタグ名を指定します。
    
    @param DynamicEventSrcMapIds
    @text 動的イベント生成元マップID一覧
    @type number[]
    @default []
    @desc
    動的イベント生成元のマップIDの一覧を設定します。
    */
    /*!/*~struct~BattlerSetting:ja
    @param DamageDegCommonVariableId
    @text ダメージ角度格納コモン変数
    @type variable
    @default 0
    @desc
    ダメージを受けた時の角度を格納するコモン変数を指定します。
    
    @param UserKindCommonVariableId
    @text ユーザー種別格納コモンイベント変数
    @type variable
    @default 0
    @desc
    バトラーでアクションコモンイベントを実行したときにユーザー種別(1: プレイヤー, 3: イベント)を格納する変数を指定します。
    
    @param UserEventIdCommonVariableId
    @text ユーザーイベントID格納コモンイベント変数
    @type variable
    @default 0
    @desc
    バトラーでアクションコモンイベントを実行したときにイベントIDを格納する変数を指定します。
    
    @param DamageKindCommonVariableId
    @text ダメージ種別コモン変数ID
    @type variable
    @default 0
    @desc
    ダメージを受けた時にダメージ種別が設定されるコモン変数を指定します。
    
    @param DamageTypeCommonVariableId
    @text ダメージタイプコモン変数ID
    @type variable
    @default 0
    @desc
    ダメージを受けた時にダメージタイプが設定されるコモン変数を指定します。
    
    @param DamageValueCommonVariableId
    @text ダメージ値コモン変数ID
    @type variable
    @default 0
    @desc
    ダメージを受けた時にダメージ値が設定されるコモン変数を指定します。
    */
    /*!/*~struct~ActorSetting:ja
    @param NormalAttackSkillId
    @text 通常攻撃スキルID
    @type skill
    @default 0
    @desc
    通常攻撃時のスキルIDを指定します。
    
    @param DamageCommonEventId
    @text アクターダメージコモンイベントID
    @type common_event
    @default 0
    @desc
    アクターがダメージを受けたときに実行するコモンイベントを指定します。
    
    @param DeadCommonEventId
    @text アクター戦闘不能コモンイベントID
    @type common_event
    @default 0
    @desc
    アクターが戦闘不能になったときに実行するコモンイベントを指定します。
    
    @param NormalGuardCommonEventId
    @text アクター通常ガードコモンイベントID
    @type common_event
    @default 0
    @desc
    アクターが通常ガードしたときに実行するコモンイベントを指定します。
    
    @param JustGuardCommonEventId
    @text アクタージャストガードコモンイベントID
    @type common_event
    @default 0
    @desc
    アクターがジャストガードしたときに実行するコモンイベントを指定します。
    
    @param StartGuardCommonEventId
    @text アクターガード開始コモンイベントID
    @type common_event
    @default 0
    @desc
    アクターがガードを開始したときに実行するコモンイベントを指定します。
    
    @param EndGuardCommonEventId
    @text アクターガード終了コモンイベントID
    @type common_event
    @default 0
    @desc
    アクターがガードを終了したときに実行するコモンイベントを指定します。
    
    @param JustGuardFrame
    @text ジャストガードフレーム
    @type number
    @min 0
    @default 10
    @desc
    ジャストガードの許容フレーム数を指定します。ジャストガードを使用しない場合は0を指定してください。
    
    @param ActorHitBox
    @text アクターヒットボックス
    @type struct<ActorHitBox>
    @default {"DamageHitBoxList":"[]"}
    @desc アクターのヒットボックス設定を行います。
    
    @param GameOverCommonEventId
    @text ゲームオーバーコモンイベントID
    @type common_event
    @default 0
    @desc
    ゲームオーバー時に実行するコモンイベントIDを指定します。0を指定した場合はゲームオーバーシーンに移動します。
    
    @param LevelUpCommonEventId
    @text レベルアップコモンイベントID
    @type common_event
    @default 0
    @desc
    レベルアップしたときに実行するコモンイベントを指定します。
    */
    /*!/*~struct~EnemySetting:ja
    @param CollideAttackSkillId
    @text 衝突攻撃スキルID
    @type skill
    @default 0
    @desc
    エネミーがアクターに衝突したときにダメージ計算を行うスキルIDを指定します。
    
    @param DamageCommonEventId
    @text エネミーダメージコモンイベントID
    @type common_event
    @default 0
    @desc
    エネミーがダメージを受けたときに実行するコモンイベントを指定します。
    
    @param DefeatEnemyCommonEventId
    @text 敵撃破コモンイベントID
    @type common_event
    @default 0
    @desc
    敵撃破時に実行するコモンイベントIDを指定します。
    */
    /*!/*~struct~SkillObjectSetting:ja
    @param SkillObjectUserKindSelfVariableId
    @text スキルオブジェクトユーザー種別格納セルフ変数
    @type variable
    @default 0
    @desc
    スキルオブジェクトを生成したユーザーの種別を格納するセルフ変数を指定します。
    
    @param SkillObjectUserEventIdSelfVariableId
    @text スキルオブジェクトユーザーイベントID格納セルフ変数
    @type variable
    @default 0
    @desc
    スキルオブジェクトを生成したユーザーの種別がイベントの場合にイベントIDを格納するセルフ変数を指定します。
    
    @param CollisionDetectExSelfSwitchId
    @text 衝突検出フラグ格納拡張セルフスイッチ
    @type switch
    @default 0
    @desc
    スキルオブジェクトがターゲットに衝突したときにONを格納する拡張セルフスイッチを指定します。
    */
    /*!/*~struct~HitBoxSetting:ja
    @param VisibleHitAreaSwitchId
    @text ヒットボックス可視化切り替えスイッチID
    @type switch
    @default 0
    @desc
    ヒットボックス可視化の有無を切り替えるスイッチIDを指定します。
    
    @param AttackHitBoxColor
    @text 攻撃判定ヒットボックスカラー
    @type string
    @default #ff0000aa
    @desc
    ヒットボックス可視化時の攻撃判定のカラーを指定します。
    
    @param DamageHitBoxColor
    @text ダメージ判定ヒットボックスカラー
    @type string
    @default #0000ffaa
    @desc
    ヒットボックス可視化時のダメージ判定のカラーを指定します。
    
    @param CustomHitBoxDefaultColor
    @text カスタムヒットボックスデフォルトカラー
    @type string
    @default #00ff00aa
    @desc
    ヒットボックス可視化時のカスタムヒットボックスのデフォルトカラーを指定します。
    
    @param CustomHitBoxColorList
    @text カスタムヒットボックスカラー一覧
    @type string<CustomHitBoxColor>
    @default []
    @desc
    ヒットボックス可視化時のカスタムヒットボックスのカラー一覧を指定します。
    */
    /*!/*~struct~EnemyHpGaugeSetting:ja
    @param NormalEnemyHpGaugePosition
    @text ノーマルエネミーHPゲージ位置
    @type select
    @option 上
    @value up
    @option 下
    @value down
    @default up
    @desc ノーマルエネミーのHPゲージの表示位置を設定します。
    
    @param NormalEnemyHpGaugeYOffset
    @text ノーマルエネミーHPゲージY座標オフセット
    @type number
    @min -9999
    @default -8
    @desc ノーマルエネミーのHPゲージの表示Y座標オフセットを設定します。
    
    @param NormalEnemyHpGaugeHeight
    @text ノーマルエネミーHPゲージ縦幅
    @type number
    @min 1
    @default 6
    @desc ノーマルエネミーのHPゲージの縦幅を設定します。
    
    @param NormalEnemyHpGaugeColor1
    @text ノーマルエネミーHPゲージ色1
    @type string
    @default #00aa00
    @desc ノーマルエネミーのHPゲージの色1を設定します。
    
    @param NormalEnemyHpGaugeColor2
    @text ノーマルエネミーHPゲージ色2
    @type string
    @default #22ff22
    @desc ノーマルエネミーのHPゲージの色1を設定します。
    
    @param BossEnemyHpGaugeLabel
    @text ボスエネミーHPゲージラベル
    @type string
    @default BOSS
    @desc ボスエネミーのHPゲージの横に表示するテキストを設定します。
    
    @param BossEnemyHpGaugeYOffset
    @text ボスエネミーHPゲージY座標オフセット
    @type number
    @min 1
    @default 16
    @desc ボスエネミーのHPゲージの表示Y座標オフセットを設定します。
    
    @param BossEnemyHpGaugeWidth
    @text ボスエネミーHPゲージ横幅
    @type number
    @min 1
    @default 500
    @desc ボスエネミーのHPゲージの横幅を設定します。
    
    @param BossEnemyHpGaugeHeight
    @text ボスエネミーHPゲージ縦幅
    @type number
    @min 1
    @default 12
    @desc ボスエネミーのHPゲージの縦幅を設定します。
    
    @param BossEnemyHpGaugeColor1
    @text ボスエネミーHPゲージ色1
    @type string
    @default #00aa00
    @desc ボスエネミーのHPゲージの色1を設定します。
    
    @param BossEnemyHpGaugeColor2
    @text ボスエネミーHPゲージ色2
    @type string
    @default #22ff22
    @desc ボスエネミーのHPゲージの色1を設定します。
    */
    /*!/*~struct~KeySetting:ja
    @param ActorNormalAttack
    @text アクター通常攻撃キー
    @type struct<Key>
    @default {"KeyName":"ok","KeySymbol":"","KeyCode":"0","ButtonIndex":"-1"}
    @desc
    アクターが通常攻撃を行う時のキーを指定します。
    
    @param ActorGuard
    @text アクターガードキー
    @type struct<Key>
    @default {"KeyName":"other","KeySymbol":"A","KeyCode":"65","ButtonIndex":"6"}
    @desc
    アクターがガードを行う時のキーを指定します。
    
    @param VisibleHitBox
    @text ヒットボックス可視化切り替えキー
    @type struct<Key>
    @default {"KeyName":"other","KeySymbol":"F6","KeyCode":"117","ButtonIndex":"-1"}
    @desc
    ヒットボックス可視化有無の切り替えを行うキーを指定します。
    
    @param ChangeControlActor
    @text 操作アクター変更
    @type struct<Key>
    @default {"KeyName":"other","KeySymbol":"S","KeyCode":"83","ButtonIndex":"11"}
    @desc
    操作アクターの変更を行うキーを指定します。
    */
    /*!/*~struct~SESetting:ja
    @param ActorChange
    @text アクターチェンジ
    @type struct<SE>
    @default {"FileName":"","Volume":"90","Pitch":"100","Pan":"0"}
    @desc
    アクターチェンジ時に再生するSEを指定します。
    */
    /*!/*~struct~Key:ja
    @param KeyName
    @text キー名
    @type select
    @option 決定
    @value ok
    @option キャンセル
    @value escape
    @option シフト
    @value shift
    @option 下
    @value down
    @option 左
    @value left
    @option 右
    @value right
    @option 上
    @value up
    @option ページアップ
    @value pageup
    @option ページダウン
    @value pagedown
    @option その他
    @value other
    @option 未割り当て
    @value unassigned
    @default ok
    @desc
    キーを指定します。
    
    @param KeySymbol
    @text キーシンボル
    @type string
    @desc
    キーをその他に選択した場合のキーシンボルを指定します。使用しない場合は空欄にしてください。
    
    @param KeyCode
    @text キーコード
    @type number
    @min -1
    @default -1
    @desc
    キーをその他に選択した場合のキーコードを指定します。キーボードを使用しない場合は-1を指定してください。
    
    @param ButtonIndex
    @text ボタンインデックス
    @type number
    @min -1
    @default -1
    @desc
    キーをその他に選択した場合のボタンのインデックスを指定します。ゲームパッドを使用しない場合は-1を指定してください。
    */
    /*!/*~struct~Box:ja
    @param X
    @text X座標
    @type number
    @min -9999
    @decimals 2
    @default 0
    @desc
    X座標を指定します。
    
    @param Y
    @text Y座標
    @type number
    @min -9999
    @decimals 2
    @default 0
    @desc
    Y座標を指定します。
    
    @param Width
    @text 横幅
    @type number
    @min 0
    @decimals 2
    @default 1
    @desc
    横幅を指定します。
    
    @param Height
    @text 縦幅
    @type number
    @min 0
    @decimals 2
    @default 1
    @desc
    縦幅を指定します。
    */
    /*!/*~struct~CustomHitBoxColor:ja
    @param CustomHitBoxTag
    @text カスタムヒットボックスタグ
    @type string
    @desc カスタムヒットボックスのタグを指定します。
    
    @param Color
    @text カラー
    @type string
    @default #00ff00aa
    @desc
    ヒットボックス可視化時のカスタムヒットボックスのカラーを指定します。
    */
    /*!/*~struct~SkillObjectPosition:ja
    @param Specification
    @text 位置指定
    @type select
    @option 現在座標
    @value current
    @option 前方座標
    @value forward
    @option キャラクター座標
    @value character
    @option カスタム座標
    @value custom
    @default current
    @desc
    位置指定方法を選択します。
    
    @param CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 位置指定でキャラクター座標を選択した場合の対象となるキャラクターを指定します。
    
    @param CustomPosition
    @text カスタム座標
    @type struct<Position>
    @desc
    位置指定でカスタム座標を選択した場合の生成座標を指定します。
    */
    /*!/*~struct~TransparentObjectPosition:ja
    @param Specification
    @text 位置指定
    @type select
    @option キャラクター座標
    @value character
    @option カスタム座標
    @value custom
    @default current
    @desc
    位置指定方法を選択します。
    
    @param CharacterSpecification
    @text キャラクター指定
    @type struct<CharacterSpecification>
    @default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
    @desc 位置指定でキャラクター座標を選択した場合の対象となるキャラクターを指定します。
    
    @param CustomPosition
    @text カスタム座標
    @type struct<Position>
    @desc
    位置指定でカスタム座標を選択した場合の生成座標を指定します。
    */
    /*!/*~struct~Position:ja
    @param X
    @type number
    @text X座標
    @default 0
    @desc イベントを生成するX座標を指定します。
    
    @param XByVariable
    @type variable
    @text X座標(変数指定)
    @default 0
    @desc イベントを生成するX座標を変数で指定します。直接値を設定した場合は本パラメータは0を指定してください。
    
    @param Y
    @type number
    @text Y座標
    @default 0
    @desc イベントを生成するY座標を指定します。
    
    @param YByVariable
    @type variable
    @text Y座標(変数指定)
    @default 0
    @desc イベントを生成するY座標を変数で指定します。直接値を設定した場合は本パラメータは0を指定してください。
    */
    /*!/*~struct~ActorHitBox:ja
    @param DamageHitBoxList
    @type struct<Box>[]
    @text ダメージ判定ヒットボックスリスト
    @default []
    @desc ダメージ判定ヒットボックスを設定します。
    */
    /*!/*~struct~SE:ja
    @param FileName
    @text SEファイル名
    @type file
    @dir audio/se
    @desc
    再生するSEのファイル名を指定します。
    
    @param Volume
    @text SE音量
    @type number
    @default 90
    @desc
    再生するSEのvolumeを指定します。
    
    @param Pitch
    @text SEピッチ
    @type number
    @default 100
    @desc
    再生するSEのpitchを指定します。
    
    @param Pan
    @text SE位相
    @type number
    @default 0
    @desc
    再生するSEのpanを指定します。
    */
    /*!/*~struct~CharacterSpecification:ja
    @param CharacterKind
    @text キャラクター種別
    @type select
    @option このイベント
    @value thisEvent
    @option プレイヤー
    @value player
    @option フォロワー
    @value follower
    @option イベント
    @value event
    @option 乗り物
    @value vehicle
    @default thisEvent
    @desc
    キャラクター種別を指定します。
    
    @param CharacterKindByVariable
    @text キャラクター種別(変数指定)
    @type variable
    @default 0
    @desc
    キャラクター種別を変数で指定します。
    
    @param EventIdOrName
    @text イベントID or イベント名
    @type string
    @default 1
    @desc
    キャラクター種別にイベントを指定した場合に対象となるイベントIDまたはイベント名を指定します。
    
    @param EventIdByVariable
    @text イベントID(変数指定)
    @type variable
    @default 0
    @desc
    キャラクター種別にイベントを指定した場合に対象となるイベントIDを変数で指定します。
    
    @param FollowerIndex
    @text フォロワーインデックス
    @type number
    @min 1
    @default 1
    @desc
    キャラクター種別にフォロワーを指定した場合に対象となるフォロワーの順番を指定します。
    
    @param FollowerIndexByVariable
    @text フォロワーインデックス(変数指定)
    @type variable
    @default 0
    @desc
    キャラクター種別にフォロワーを指定した場合に対象となるフォロワーの順番を変数で指定します。
    
    @param VehicleKind
    @text 乗り物種別
    @type select
    @option 小型船
    @value boat
    @option 大型船
    @value ship
    @option 飛行船
    @value airship
    @default boat
    @desc
    キャラクター種別に乗り物を指定した場合に対象となる乗り物を指定します。
    
    @param VehicleKindByVariable
    @text 乗り物種別(変数指定)
    @type variable
    @default 0
    @desc
    キャラクター種別に乗り物を指定した場合に対象となる乗り物を変数で指定します。
    */
    /*!/*~struct~SkillSpecification:ja
    @param SkillOrItem
    @text スキル or アイテム
    @type select
    @option スキル
    @value skill
    @option アイテム
    @value item
    @default skill
    @desc スキルまたはアイテムのどちらを指定するかを選択します。
    
    @param SkillId
    @type skill
    @text スキルID
    @default 1
    @desc 使用するスキルのIDを指定します。名前指定または変数指定を行った場合、そちらが優先されます。
    
    @param SkillByName
    @type string
    @text スキル(名前指定)
    @desc 使用するスキルの名前を指定します。名前指定を使用しない場合は空欄にしてください。
    
    @param SkillIdByVariable
    @type variable
    @text スキルID(変数指定)
    @default 0
    @desc 使用するスキルのIDを変数で指定します。変数指定を使用しない場合は0にしてください。
    
    @param ItemId
    @type item
    @text アイテムID
    @default 1
    @desc 使用するアイテムのIDを指定します。名前指定または変数指定を行った場合、そちらが優先されます。
    
    @param ItemByName
    @type string
    @text アイテム(名前指定)
    @desc 使用するアイテムの名前を指定します。名前指定を使用しない場合は空欄にしてください。
    
    @param ItemIdByVariable
    @type variable
    @text アイテムID(変数指定)
    @default 0
    @desc 使用するアイテムのIDを変数で指定します。変数指定を使用しない場合は0にしてください。
    */
    import "./ExportDotMoveSystem";
    import "ARPG_Core/ARPG_DynamicEvent/Main";
    import "ARPG_Core/ARPG_DamagePopup/Main";
    import "ARPG_Core/ARPG_State/Main";
    import "ARPG_Core/ARPG_TargetSelect/Main";
    import "ARPG_Core/Game_Temp";
    import "ARPG_Core/Game_Character";
    import "ARPG_Core/Game_Map";
    import "ARPG_Core/Game_Player";
    import "ARPG_Core/Game_Event";
    import "ARPG_Core/Game_Actor";
    import "ARPG_Core/Game_Interpreter";
    import "ARPG_Core/Spriteset_Map";
    import "ARPG_Core/Sprite_Character";
    import "ARPG_Core/Scene_Map";
    import "ARPG_Core/Tilemap";
    import "ARPG_Core/Game_System";
    import "ARPG_Core/CharacterMover";
    import "ARPG_Core/CharacterCollisionChecker";
    import "ARPG_Core/Window_MenuCommand";
    import { ARPG_BattlerParameters } from "ARPG_Core/ARPG_BattlerParameters";
    global {
        interface Window {
            ARPG_BattlerParameters: new () => ARPG_BattlerParameters;
        }
    }
}
