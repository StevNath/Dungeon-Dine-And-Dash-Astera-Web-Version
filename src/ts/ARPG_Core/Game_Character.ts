import { ARPG_Actor } from "./ARPG_Actor";
import { HitBox } from "./HitBox";
import { ARPG_Utils } from "./ARPG_Utils";
import { ARPG_Enemy } from "./ARPG_Enemy";
import { Component } from "../CommonLibrary/Component";
import { ComponentRunner } from "../CommonLibrary/ComponentRunner";
import { ARPG_CorePluginParams } from "./ARPG_Config";
import { ARPG_Battler } from "./ARPG_Battler";
import { ARPG_SkillObject } from "./ARPG_SkillObject";
import { ARPG_CharacterTempData } from "./ARPG_CharacterTempData";
import { CharacterBlowAwayProcessor } from "./CharacterBlowAwayProcessor";
import { Degree } from "../CommonLibrary/Degree";
import { ARPG_FieldObject } from "./ARPG_FieldObject";
import { mixin } from "../CommonLibrary/mixin";
import { CharacterActionWaitProcessor } from "CharacterActionWaitProcessor";


declare global {
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
        startActionWait(duration: number): void;
        isActionWaiting(): boolean;
        moveCancel(): void;
        onPress(): void;
        onClick(): void;
    }
}

class Game_Character_Mixin extends Game_Character {
    static _update = Game_Character.prototype.update;
    static _setDirection = Game_Character.prototype.setDirection;

    update() {
        if ($gameMap.isEnabledARPGMode()) {
            if (!this.arpgTempData().lastARPGMode) {
                this.arpgTempData().lastARPGMode = true;
                this.startARPGProcess();
            }
        } else {
            if (this.arpgTempData().lastARPGMode) {
                this.arpgTempData().lastARPGMode = false;
                this.endARPGProcess();
            }
        }

        this.arpgTempData().componentRunner?.prepareUpdate();
        Game_Character_Mixin._update.call(this);
        this.arpgTempData().componentRunner?.update();
    }

    isInTheScreen(xMargin: number, yMargin: number): boolean {
        const gw = Graphics.width;
        const gh = Graphics.height;
        const tw = $gameMap.tileWidth();
        const th = $gameMap.tileHeight();
        const px = this.scrolledX() * tw + tw / 2 - gw / 2;
        const py = this.scrolledY() * th + th / 2 - gh / 2;
        const dw = gw / 2 + xMargin * tw;
        const dh = gh / 2 + yMargin * th;
        return px >= -dw && px <= dw && py >= -dh && py <= dh;
    }

    addDisableMoveReason(reason: string) {
        if (this._disableMoveReason == null) {
            this._disableMoveReason = [reason];
        } else {
            this._disableMoveReason = [...new Set(this._disableMoveReason.concat([reason]))];
        }
    }

    removeDisableMoveReason(reason: string) {
        if (this._disableMoveReason != null) this._disableMoveReason = this._disableMoveReason.filter(r => r !== reason);
    }

    isDisableMove() {
        if (this._disableMoveReason == null) return false;
        return this._disableMoveReason.length > 0;
    }

    setDirection(d: number) {
        if (!this.isDisableMove()) {
            Game_Character_Mixin._setDirection.call(this, d);
        }
    }

    moveCancel(): void {
        this.mover().cancelMove();
        this.processRouteEnd();
    }

    isNoCheckMapValid(): boolean {
        if (this._noCheckMapValid == null) return false;
        return this._noCheckMapValid;
    }

    setNoCheckMapValid(noCheckMapValid: boolean): void {
        this._noCheckMapValid = noCheckMapValid;
    }

    createArpgTempData() {
        const tempData = new ARPG_CharacterTempData();
        return tempData;
    }

    arpgTempData(): ARPG_CharacterTempData {
        return $gameTemp.arpgCharacterTempData(this);
    }

    startARPGProcess() {
    }

    endARPGProcess() {
    }

    battler<T extends ARPG_Battler>() {
        const battler = this.arpgTempData().battler;
        if (!battler) throw new Error("_battler is undefined.");
        return battler as T;
    }

    isBattler() {
        return !!this.arpgTempData().battler;
    }

    isSkillObject() {
        return !!this.arpgTempData().skillObject;
    }

    isFieldObject() {
        return !!this.arpgTempData().fieldObject;
    }

    skillObject() {
        const skillObject = this.arpgTempData().skillObject;
        if (!skillObject) throw new Error("skillObject is undefined.");
        return skillObject;
    }

    fieldObject() {
        const fieldObject = this.arpgTempData().fieldObject;
        if (!fieldObject) throw new Error("fieldObject is undefined.");
        return fieldObject;
    }

    isNeedCharacterHpGauge() {
        if (!this.isBattler()) return false;
        if (this.battler().isEnemy()) {
            const enemy = this.battler() as ARPG_Enemy;
            if (enemy.isNeedCharacterHpGauge()) return true;
        }
        return false;
    }

    isCharacterHpGaugeVisibled() {
        if (!this.isBattler()) return false;
        if (this.battler().isEnemy()) {
            const enemy = this.battler<ARPG_Enemy>();
            if (enemy.isCharacterHpGaugeVisibled()) return true;
        }
        return false;
    }

    hpGaugeColor1(): string | undefined {
        if (!this.isBattler()) return undefined;
        if (this.battler().isEnemy()) {
            const enemy = this.battler() as ARPG_Enemy;
            return enemy.normalHpGaugeOption()?.hpGaugeColor1;
        }
        return undefined;
    }

    hpGaugeColor2(): string | undefined {
        if (!this.isBattler()) return undefined;
        if (this.battler().isEnemy()) {
            const enemy = this.battler() as ARPG_Enemy;
            return enemy.normalHpGaugeOption()?.hpGaugeColor2;
        }
        return undefined;
    }

    hpGaugePosition(): "up" | "down" {
        if (this.isBattler() && this.battler().isEnemy()) {
            const enemy = this.battler() as ARPG_Enemy;
            const hpGaugePosition = enemy.normalHpGaugeOption()?.hpGaugePosition;
            if (hpGaugePosition) return hpGaugePosition;
        }
        return "up";
    }

    hpGaugeYOffset(): number {
        if (this.isBattler() && this.battler().isEnemy()) {
            const enemy = this.battler() as ARPG_Enemy;
            const hpGaugeYOffset = enemy.normalHpGaugeOption()?.hpGaugeYOffset;
            if (hpGaugeYOffset) return hpGaugeYOffset;
        }
        return -8;
    }

    hpGaugeHeight(): number {
        if (this.isBattler() && this.battler().isEnemy()) {
            const enemy = this.battler() as ARPG_Enemy;
            const hpGaugeHeight = enemy.normalHpGaugeOption()?.hpGaugeHeight;
            if (hpGaugeHeight) return hpGaugeHeight;
        }
        return 6;
    }

    setupActor(actorId: number): void {
        this.arpgTempData().battler?.end();
        const battler = new ARPG_Actor(actorId);
        this.arpgTempData().battler = battler;
        this.addComponent(battler);

        for (const hitBoxParam of ARPG_CorePluginParams.ActorSetting.ActorHitBox.DamageHitBoxList) {
            const rect = new Rectangle(hitBoxParam.X, hitBoxParam.Y, hitBoxParam.Width, hitBoxParam.Height);
            const hitBox = new HitBox("damage", this, rect, ARPG_CorePluginParams.HitBoxSetting.DamageHitBoxColor);
            this.battler().damageHitChecker.addHitBox(hitBox);
        }
    }

    moveTowardNearActor() {
        const actorCharacters: any = [$gamePlayer]; // TODO: 現状はプレイヤーのみ対応
        let minFar = 65535;
        let minFarActor = null;
        for (const character of actorCharacters) {
            const far = this.calcFar(character);
            if (far <= minFar) {
                minFar = far;
                minFarActor = character;
            }
        }
        if (minFarActor) this.moveTowardCharacter(minFarActor);
    }

    moveAwayNearActor() {
        const { character } = ARPG_Utils.searchNearBattler(this, "opponent");
        if (character) this.moveAwayFromCharacter(character);
    }

    addComponent(component: Component<Game_Character>): void {
        let componentRunner = this.arpgTempData().componentRunner;
        if (!componentRunner) {
            componentRunner = new ComponentRunner(this);
            this.arpgTempData().componentRunner = componentRunner;
        }
        componentRunner.addComponent(component);
    }

    removeComponent(component: Component<Game_Character>): void {
        let componentRunner = this.arpgTempData().componentRunner;
        if (!componentRunner) {
            componentRunner = new ComponentRunner(this);
            this.arpgTempData().componentRunner = componentRunner;
        }
        componentRunner.removeComponent(component);
    }

    hasComponent(component: Component<Game_Character> | undefined): boolean {
        let componentRunner = this.arpgTempData().componentRunner;
        if (!componentRunner) {
            componentRunner = new ComponentRunner(this);
            this.arpgTempData().componentRunner = componentRunner;
        }
        return componentRunner.hasComponent(component);
    }

    hasComponentByClass(componentClass: Function): boolean {
        let componentRunner = this.arpgTempData().componentRunner;
        if (!componentRunner) {
            componentRunner = new ComponentRunner(this);
            this.arpgTempData().componentRunner = componentRunner;
        }
        return componentRunner.hasComponentByClass(componentClass);
    }

    startBlowAway(deg: Degree, initialVelocity: number, duration: number): void {
        if (this.isBlowingAway()) return;
        this.addComponent(new CharacterBlowAwayProcessor(deg, initialVelocity, duration));
    }

    isBlowingAway(): boolean {
        return this.hasComponentByClass(CharacterBlowAwayProcessor);
    }

    startActionWait(duration: number): void {
        if (this.isBlowingAway()) return;
        this.addComponent(new CharacterActionWaitProcessor(duration));
    }

    isActionWaiting(): boolean {
        return this.hasComponentByClass(CharacterActionWaitProcessor);
    }

    onPress(): void {
    }

    onClick(): void {
        $gameMap.touchCharacter(this);
    }
}

mixin(Game_Character, Game_Character_Mixin);
