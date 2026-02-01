import { ARPG_Skill } from "./ARPG_Skill";
import { ARPG_Effect } from "./ARPG_Effect";
import { TimerComponent } from "../CommonLibrary/TimerComponent";
import { Component } from "../CommonLibrary/Component";
import { HitChecker } from "./HitChecker";
import { ARPG_CorePluginParams } from "./ARPG_Config";
import { Processor } from "../CommonLibrary/Processor";
import { Degree } from "../CommonLibrary/Degree";
import { ARPG_EffectResult } from "./ARPG_EffectResult";
import { ErrorManager } from "./ErrorManager";
import { ARPG_Utils } from "./ARPG_Utils";
import { ARPG_CustomManager } from "ARPG_CustomManager";
import { ChainComponent } from "../CommonLibrary/ChainComponent";
import { ARPG_BattlerParameters } from "ARPG_BattlerParameters";
import { ARPG_ComboController } from "ARPG_ComboController";

export type GuardResult = "NORMAL_GUARD" | "JUST_GUARD" | "NO_GUARD";

export interface IRequestUseSkillOrItem {
    skillOrItem: "skill" | "item";
    idOrName: number | string;
    isConsumeCost: boolean;
}

export abstract class ARPG_Battler extends Component<Game_Character> {
    usingSkill?: ARPG_Skill;
    protected _noDamageTimer: TimerComponent<Game_Character> = new TimerComponent();
    protected _noAttackTimer: TimerComponent<Game_Character> = new TimerComponent();
    protected _damageHitChecker: HitChecker = new HitChecker("damage");
    protected _attackHitChecker: HitChecker = new HitChecker("attack");
    protected _useSkillProcessor?: ARPG_UseSkillProcessor;
    protected _customHitCheckers: Map<string, HitChecker> = new Map();
    protected _isConsumeCost: boolean = true;
    protected _totalDamageWhenUsingSkill: number = 0;
    protected _skillCancelWhenDamageEnable: boolean = false;
    private _guardReasons: Set<string> = new Set();
    private _collideAttackSkillId?: number;
    private _justGuardTimer: TimerComponent<Game_Character> = new TimerComponent();
    private _skillActivating: boolean = false;
    private _chantComponent?: Component<Game_Character>;
    private _behaviorComponent?: Component<Game_Character>;
    private _recvDamageEffect?: ARPG_Effect;
    private _comboController: ARPG_ComboController = new ARPG_ComboController();

    get damageHitChecker() { return this._damageHitChecker; }
    get attackHitChecker() { return this._attackHitChecker; }
    get customHitCheckers() { return this._customHitCheckers; }

    get hp() { return this.battler().hp; }
    set hp(value) { this.battler().setHp(value); }
    get mp() { return this.battler().mp; }
    set mp(value) { this.battler().setMp(value); }
    get tp() { return this.battler().tp; }
    set tp(value) { this.battler().setTp(value); }

    get mhp() { return this.battler().mhp; }
    get mmp() { return this.battler().mmp; }
    get def() { return this.battler().def; }
    get atk() { return this.battler().atk; }
    get mat() { return this.battler().mat; }
    get mdf() { return this.battler().mdf; }
    get agi() { return this.battler().agi; }
    get luk() { return this.battler().luk; }
    get hit() { return this.battler().hit; }
    get eva() { return this.battler().eva; }
    get cri() { return this.battler().cri; }
    get cev() { return this.battler().cev; }
    get mev() { return this.battler().mev; }
    get mrf() { return this.battler().mrf; }
    get cnt() { return this.battler().cnt; }
    get hrg() { return this.battler().hrg; }
    get mrg() { return this.battler().mrg; }
    get trg() { return this.battler().trg; }
    get tgr() { return this.battler().tgr; }
    get grd() { return this.battler().grd; }
    get rec() { return this.battler().rec; }
    get pha() { return this.battler().pha; }
    get mcr() { return this.battler().mcr; }
    get tcr() { return this.battler().tcr; }
    get pdr() { return this.battler().pdr; }
    get mdr() { return this.battler().mdr; }
    get fdr() { return this.battler().fdr; }
    get exr() { return this.battler().exr; }

    abstract battler(): Game_Battler;
    abstract name(): string;
    abstract arpgParameters(): ARPG_BattlerParameters;

    protected start(): void {
        super.start();
        this.addComponent(this._damageHitChecker);
        this.addComponent(this._attackHitChecker);
        this.addComponent(this._noDamageTimer);
        this.addComponent(this._noAttackTimer);
        this.addComponent(this._justGuardTimer);
        this.addComponent(this._comboController);
        this.updateHitChecker();
    }

    protected update(): void {
        super.update();
        this.updateRecvDamage();
        if (this._chantComponent) {
            if (this._chantComponent.isTerminated()) {
                this._chantComponent = undefined;
            }
        }
        this.updateHitChecker();
    }

    private updateHitChecker(): void {
        if (this.isAlive()) {
            this._damageHitChecker.removeDisableReason("dead");
            this._attackHitChecker.removeDisableReason("dead");
        } else {
            this._damageHitChecker.addDisableReason("dead");
            this._attackHitChecker.addDisableReason("dead");
        }
    }

    isActor(): boolean {
        return false;
    }

    isEnemy(): boolean {
        return false;
    }

    isDead(): boolean {
        if (this.battler().isDead()) return true;
        return false;
    }

    isAlive(): boolean {
        return !this.isDead();
    }

    isGuarding(): boolean {
        return this._guardReasons.size > 0;
    }

    startGuard(reason: string): void {
        const lastGuarding = this.isGuarding();
        this._guardReasons.add(reason);
        if (!lastGuarding) this.onGuardStart();
    }

    endGuard(reason: string): void {
        this._guardReasons.delete(reason);
        if (!this.isGuarding()) this.onGuardEnd();
    }

    protected onGuardStart(): void {
        let justGuardFrame = this.arpgParameters().justGuardFrame;
        if (justGuardFrame == null) {
            justGuardFrame = ARPG_CorePluginParams.ActorSetting.JustGuardFrame;
        }
        if (justGuardFrame > 0) {
            this._justGuardTimer.startTimer(justGuardFrame);
        }
    }

    protected onGuardEnd(): void {
        this._justGuardTimer.stop();
    }

    checkSuccessGuard(damageEffect: ARPG_Effect): GuardResult {
        let successGuard = false;
        if (this.isGuarding()) {
            const damageDir4 = damageEffect.damageDir4();
            if (damageDir4 == null) {
                successGuard = true;
            } else {
                if (this.user().direction() === this.user().reverseDir(damageDir4)) {
                    successGuard = true;
                }
            }
        }
        if (successGuard) {
            if (this._justGuardTimer.isTimerRunning()) {
                return "JUST_GUARD";
            } else {
                return "NORMAL_GUARD"
            }
        }
        return "NO_GUARD";
    }

    startNoDamage(frame: number): void {
        if (!this._noDamageTimer.isTimerRunning()) this._noDamageTimer.startTimer(frame);
    }

    isNoDamage(): boolean {
        if (this.arpgParameters().noDamageFlag) return true;
        if (this._noDamageTimer.isTimerRunning()) return true;
        return false;
    }

    startNoAttack(frame: number): void {
        this._noAttackTimer.startTimer(frame);
    }

    isNoAttackMode(): boolean {
        if (this.arpgParameters().noAttackFlag) return true;
        return false;
    }

    gainHp(value: number) {
        this.battler().gainHp(value);
    }

    gainSilentTp(value: number) {
        this.battler().gainSilentTp(value);
    }

    canPaySkillCost(skill: ARPG_Skill): boolean {
        return this.battler().canPaySkillCost(skill.data());
    }

    paySkillCost(skill: ARPG_Skill): void {
        this.battler().paySkillCost(skill.data());
    }

    setCollideAttackSkillId(skillId: number) {
        this._collideAttackSkillId = skillId;
    }

    collideAttackSkillId(): number {
        if (this.usingSkill && this.usingSkill.isOverwriteCollideAttack()) {
            return this.usingSkill.id;
        }
        // TODO: 将来的にはデフォルト値は0にしたい
        if (this._collideAttackSkillId == null) return 2;
        return this._collideAttackSkillId;
    }

    recvDamage(damageEffect: ARPG_Effect): void {
        const guardResult = this.checkSuccessGuard(damageEffect);
        damageEffect.setGuardResult(guardResult);
        const result = damageEffect.applyToTarget();
        this.skillCancelWhenRecvDamage(result);
        if (this.isAlive()) {
            this.startNoDamage(damageEffect.noDamageFrame());
        }
        this._recvDamageEffect = damageEffect;
        this.stopCharacterMove("recvDamage");
        this.stopEventInterpreter("recvDamage");
        this._behaviorComponent?.stop();
        this._comboController.cancelCombo();
        const recvDamageComponent = this.makeRecvDamageComponent(result);
        this.addComponent(new ChainComponent([recvDamageComponent, this.onEndRecvDamage.bind(this)]));
    }

    protected abstract makeRecvDamageComponent(result: ARPG_EffectResult): Component<Game_Character> | undefined;

    private onEndRecvDamage(): void {
        this.resumeCharacterMove("recvDamage");
        this.resumeEventInterpreter("recvDamage");
        if (this._behaviorComponent) {
            if (this.isDead()) {
                this._behaviorComponent.end();
                this._behaviorComponent = undefined;
            } else {
                this._behaviorComponent.resume();
            }
        }
        this._recvDamageEffect = undefined;
    }

    canUsableSkill(): boolean {
        if (this.isNoAttackMode()) return false;
        if (this.isSkillUsing()) return false;
        if (this.isDamageReceiving()) return false;
        if ($gameMap.isEventRunning()) return false;
        return true;
    }

    useSkill(skillOrItem: "item" | "skill", idOrName: number | string, opt: { isConsumeCost?: boolean } = {}): void {
        if (!this.canUsableSkill()) return;
        let skill = new ARPG_Skill(skillOrItem, idOrName);
        if (skill.isSkill()) {
            const comboSkill = this._comboController.checkDerivationSkill(skill);
            if (comboSkill) {
                skill = comboSkill;
                this._comboController.toNextCombo(comboSkill);
            } else {
                if (this._noAttackTimer.isTimerRunning()) {
                    return;
                } else {
                    this._comboController.startCombo(skill);
                }
            }
        } else {
            this._comboController.cancelCombo();
        }
        this._isConsumeCost = opt.isConsumeCost ?? true;
        this._useSkillProcessor = new ARPG_UseSkillProcessor(this, skill);
        this.addComponent(this._useSkillProcessor);
        // スキル使用時にスキル使用中累計ダメージをリセットする。
        this._totalDamageWhenUsingSkill = 0;
    }

    isSkillUsing(): boolean {
        return !!(this._useSkillProcessor && !this._useSkillProcessor.isTerminated());
    }

    isDamageReceiving(): boolean {
        return !!this._recvDamageEffect;
    }

    consumeCost(skill: ARPG_Skill): void {
        if (!this._isConsumeCost) return;
        if (skill.isSkill()) {
            this.user().battler().paySkillCost(skill);
        } else if (skill.isItem()) {
            if (this.isActor()) {
                $gameParty.gainItem(skill.data(), -1);
            }
        }
    }

    checkConsumeCost(skill: ARPG_Skill): boolean {
        if (!this._isConsumeCost) return true;
        if (skill.isSkill()) {
            if (!this.canPaySkillCost(skill)) return false;
        } else if (skill.isItem()) {
            if (this.isActor()) {
                if (!$gameParty.hasItem(skill.data())) return false;
            }
        }
        return true;
    }

    skillActivation(chantCommonEventId: number = 0) {
        if (!this.usingSkill) {
            throw ErrorManager.skillActivationUnusedSkillError();
        }
        this._skillActivating = true;
        if (this.usingSkill.isCancelAcceleration()) {
            this.user().cancelAcceleration();
        }
        if (this.usingSkill.isShowSkillName()) {
            $gameMap.arpgBattleManager()!.showSkillNameWindow(this, this.usingSkill);
        }

        this.consumeCost(this.usingSkill);

        // スキルまたはアイテムのコストを消費したタイミングでショートカットのリフレッシュを行う。
        this.requestRefreshShortcutWindowHook();
        if (this.usingSkill.isMoveDisabled()) {
            this.stopCharacterMove("skill");
        }
        this.stopEventInterpreter("skill");

        // スキル詠唱処理
        const chantComponent = ARPG_CustomManager.chantComponent(this, chantCommonEventId);
        if (chantComponent) {
            this._chantComponent = chantComponent;
            this.addComponent(this._chantComponent);
        }
    }

    checkDamageElement(elementName: string): boolean {
        if (!this.isDamageReceiving()) return false;
        const allElements = $dataSystem.elements;
        // NOTE: 攻撃された相手の持つ全ての属性を取得する。
        const attackElementIds = this._recvDamageEffect!.subject().attackElementIds().concat(this._recvDamageEffect!.skill().elementIds());
        for (let i = 0; i < allElements.length; i++) {
            if (allElements[i] === elementName) {
                if (attackElementIds.includes(i)) return true;
            }
        }
        return false;
    }

    attackElementIds(): number[] {
        return this.battler().attackElements();
    }

    private stopCharacterMove(reason: string): void {
        const character = this.user();
        if (character instanceof Game_Event) {
            character.stopSelfMovement(reason);
        } else if (character instanceof Game_Player) {
            character.stopMoveByInput(reason);
        }
    }

    private resumeCharacterMove(reason: string): void {
        const character = this.user();
        if (character instanceof Game_Event) {
            character.resumeSelfMovement(reason);
        } else if (character instanceof Game_Player) {
            character.resumeMoveByInput(reason);
        }
    }

    private stopEventInterpreter(reason: string): void {
        const character = this.user();
        if (character instanceof Game_Event) {
            const interpreter = character.interpreter();
            if (interpreter) interpreter.lock(reason);
        }
        this._behaviorComponent?.stop();
    }

    private resumeEventInterpreter(reason: string): void {
        const character = this.user();
        if (character instanceof Game_Event) {
            const interpreter = character.interpreter();
            if (interpreter) interpreter.unlock(reason);
        }
    }

    setSkillCancelWhenDamageEnable(enabled: boolean): void {
        this._skillCancelWhenDamageEnable = enabled;
    }

    isDamageSkillCancelEnabled(): boolean {
        if (this._chantComponent) return true;
        return this._skillCancelWhenDamageEnable;
    }

    requestRefreshShortcutWindowHook(): void {
    }

    applySkillEffect(skill: ARPG_Skill | undefined) {
        if (!this.usingSkill) {
            throw ErrorManager.applySkillEffectUnusedSkillError();
        }
        if (!this.skillActivation) {
            throw ErrorManager.applySkillEffectUnActivate();
        }
        if (skill == null) {
            skill = this.usingSkill;
        }
        const effect = new ARPG_Effect(this, this, skill, undefined);
        effect.applyToTarget();
    }

    testApplySkillEffect(skill: ARPG_Skill | undefined): boolean {
        if (!this.usingSkill) {
            throw ErrorManager.testApplySkillEffectUnusedSkillError();
        }
        if (skill == null) {
            skill = this.usingSkill;
        }
        const effect = new ARPG_Effect(this, this, skill, undefined);
        return effect.testApplyToTarget();
    }

    isSkillActivating() {
        return this._skillActivating;
    }

    endSkillActivation() {
        if (this.isSkillActivating()) {
            if (this.usingSkill!.isShowSkillName()) {
                $gameMap.arpgBattleManager()!.endShowSkillNameWindow();
            }
            this._skillActivating = false;
            this.startNoAttack(this.usingSkill!.noAttackFrame());
        }
        if (this.usingSkill?.isMoveDisabled()) {
            this.resumeCharacterMove("skill");
        }
        this.resumeEventInterpreter("skill");
    }

    makeSkillObject(
        srcMapId: number,
        srcEventIdOrName: number | string,
        skill: ARPG_Skill | undefined,
        x: number = 0,
        y: number = 0
    ): Game_Event {
        if (!this.isSkillActivating()) {
            throw ErrorManager.makeSkillObjectUnActivate();
        }

        const event = $gameMap.makeDynamicEvent(srcMapId, srcEventIdOrName, x, y);

        if (skill == null) {
            skill = this.usingSkill!;
        }
        event.setupSkillObject(skill.skillOrItem, skill.id, this);

        const userCharacter = this.user();
        let userEventId;
        if (userCharacter instanceof Game_Event) {
            userEventId = userCharacter.eventId();
        } else {
            userEventId = 0;
        }
        const userKind: number = ARPG_Utils.characterKindValue(userCharacter);
        if (ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserKindSelfVariableId > 0) {
            event.setSelfVariableValue(ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserKindSelfVariableId, userKind);
        }
        if (ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserEventIdSelfVariableId > 0) {
            event.setSelfVariableValue(ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserEventIdSelfVariableId, userEventId);
        }

        return event;
    }

    behaviorComponent(): Component<Game_Character> | undefined {
        return this._behaviorComponent;
    }

    setBehaviorComponent(component: Component<Game_Character> | undefined): void {
        if (this._behaviorComponent) this._behaviorComponent.end();
        this._behaviorComponent = component;
        if (component) this.addComponent(component);
    }

    abstract checkOpponent(battler: ARPG_Battler): boolean;

    protected updateRecvDamage() {
        if (this.isDead()) return;
        const character = this.user();
        if (character instanceof Game_Event) {
            if (character.isErased()) return;
        }
        const hitCharacters = this._damageHitChecker.checkHit("attack");
        for (const character of hitCharacters) {
            if (character.isSkillObject()) {
                this.recvDamageProcessBySkillObjectCharacter(character);
            } else if (character.isBattler()) {
                this.recvDamageProcessByBattlerCharacter(character);
            }
        }
    }

    applyCollideDamageEffectToTarget(target: ARPG_Battler, arpgSkill: ARPG_Skill) {
        if (target.isNoDamage()) return;
        const effect = new ARPG_Effect(this, target, arpgSkill, Degree.fromDirection(this.user().direction()));
        target.recvDamage(effect);
    }

    isChanting(): boolean {
        return !!this._chantComponent;
    }

    private recvDamageProcessBySkillObjectCharacter(character: Game_Character) {
        if (character instanceof Game_Event) {
            if (character.isErased()) return;
        }
        if (character.isSkillObject()) {
            const skillObject = character.skillObject();
            if (!this.checkTargetBattler(skillObject.userBattler(), skillObject.skill())) return;
            skillObject.applyDamageEffectToBattler(this, skillObject.skill());
        }
    }

    private recvDamageProcessByBattlerCharacter(character: Game_Character) {
        if (character.battler().isDead()) return;
        if (character instanceof Game_Event) {
            if (character.isErased()) return;
        }
        if (!this.checkOpponent(character.battler())) return;
        const skillId = character.battler().collideAttackSkillId();
        if (skillId > 0) {
            const arpgSkill = new ARPG_Skill("skill", skillId);
            character.battler().applyCollideDamageEffectToTarget(this, arpgSkill);
        }
    }

    skillCancel(): void {
        if (this._chantComponent) {
            this._chantComponent.end();
            this._chantComponent = undefined;
        }
        this.endSkillActivation();
        if (this._useSkillProcessor) this._useSkillProcessor.cancel();
    }

    protected skillCancelWhenRecvDamage(result: ARPG_EffectResult) {
        if (this.isDead()) {
            this.skillCancel();
        } else {
            if (!this.isDamageSkillCancelEnabled()) return;
            this._totalDamageWhenUsingSkill += result.hpDamageValue();
            const rate = this._totalDamageWhenUsingSkill / this.mhp;
            if (rate >= this.arpgParameters().skillCancelDamageRate) {
                this.skillCancel();
            }
        }
    }

    private checkTargetBattler(user: ARPG_Battler, arpgSkill: ARPG_Skill) {
        if (this.isActor()) {
            return this.checkTargetActor(user, arpgSkill);
        } else if (this.isEnemy()) {
            return this.checkTargetEnemy(user, arpgSkill);
        }
        return false;
    }

    private checkTargetEnemy(user: ARPG_Battler, arpgSkill: ARPG_Skill) {
        if (arpgSkill.isForEveryone()) {
            return true;
        } else if (user.isActor() && arpgSkill.isForOpponent()) {
            return true;
        } else if (user.isEnemy() && arpgSkill.isForFriend()) {
            return true;
        }
        return false;
    }

    private checkTargetActor(user: ARPG_Battler, arpgSkill: ARPG_Skill) {
        if (arpgSkill.isForEveryone()) {
            return true;
        } else if (user.isEnemy() && arpgSkill.isForOpponent()) {
            return true;
        } else if (user.isActor() && arpgSkill.isForFriend()) {
            return true;
        }
        return false;
    }
}


interface IUseSkillBackupInfo {
    moveSpeed: number;
    dpf: number | undefined;
    characterName: string;
    characterIndex: number;
    directionFixed: boolean;
}


class ARPG_UseSkillProcessor extends Processor<Game_Character> {
    private _battler: ARPG_Battler;
    private _skill: ARPG_Skill;
    private _canceled: boolean = false;
    private _backup!: IUseSkillBackupInfo;

    constructor(battler: ARPG_Battler, skill: ARPG_Skill) {
        super();
        this._battler = battler;
        this._skill = skill;
    }

    protected setup(): void {
        super.setup();
        this._battler.usingSkill = this._skill;
        this.makeUseSkillBackup();
    }

    protected *process() {
        if (!this._battler.checkConsumeCost(this._skill)) return;
        const actionComponent = ARPG_CustomManager.actionComponent(this._battler, this._skill);
        if (actionComponent) {
            this.addComponent(actionComponent);
            yield* this.waitComponent(actionComponent);
        }
    }

    cancel(): void {
        this._canceled = true;
        this.end(true);
    }

    protected terminate(): void {
        super.terminate();
        if (this._battler.isActor()) {
            if (!this._canceled && !this._battler.isSkillActivating()) {
                // NOTE: キャンセル時はブザーを鳴らさない
                SoundManager.playBuzzer();
            }
        }
        this._battler.endSkillActivation();
        this._battler.usingSkill = undefined;
        this.restoreUseSkillBackup();
    }

    private makeUseSkillBackup(): void {
        this._backup = {
            moveSpeed: this.user().moveSpeed(),
            dpf: this.user()._dpf,
            characterName: this.user().characterName(),
            characterIndex: this.user().characterIndex(),
            directionFixed: this.user().isDirectionFixed(),
        };
    }

    private restoreUseSkillBackup(): void {
        this.user().setMoveSpeed(this._backup.moveSpeed);
        this.user().setDpf(this._backup.dpf);
        this.user().setImage(this._backup.characterName, this._backup.characterIndex);
        this.user().setDirectionFix(this._backup.directionFixed);
    }
}
