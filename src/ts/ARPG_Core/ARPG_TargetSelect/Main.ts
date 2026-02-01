import { ARPG_CorePluginParams } from "../ARPG_Config";
import { ARPG_Utils } from "../ARPG_Utils";
import { Component } from "../../CommonLibrary/Component";
import { mixin } from "../../CommonLibrary/mixin";
import { DotMovePoint } from "DotMoveSystem";

declare global {
    interface Game_Map {
        startTargetSelect(opt: { wait?: boolean, cancelable?: boolean, onlyNeraTheScreen?: boolean }): void;
        isTargetSelecting(): boolean;
        isTargetSelectCancelable(): boolean;
        endTargetSelect(): void;
        touchCharacter(character: Game_Character): void;
    }
}

export class TargetSelecter extends Component<Game_Character> {
    private _selectTargetType: "actor" | "enemy";
    private _onlyNearTheScreen: boolean;

    constructor(selectTargetType: "actor" | "enemy", opt: { onlyNearTheScreen?: boolean } = {}) {
        super();
        this._onlyNearTheScreen = opt.onlyNearTheScreen ?? true;
        this._selectTargetType = selectTargetType;
    }

    start(): void {
        super.start();
        let target: Game_Character | undefined;
        if (this._selectTargetType === "actor") {
            ({ character: target } = ARPG_Utils.searchNearBattler($gamePlayer, "friend"));
        } else {
            ({ character: target } = ARPG_Utils.searchNearBattler($gamePlayer, "opponent"));
        }
        if (target && target.isInTheScreen(0, 0)) {
            $gameTemp.arpgGlobalTempData().selectingTarget = target;
        } else {
            $gameMap.endTargetSelect();
        }
    }

    update(): void {
        super.update();
        if (Input.isTriggered("left")) {
            this.prevSelect();
        } else if (Input.isTriggered("right")) {
            this.nextSelect();
        } else if (Input.isTriggered("ok")) {
            this.doSelect();
        }
    }

    touchCharacter(character: Game_Character): void {
        const allCharacters = this.allCharactersByTargetType();
        for (const chr of allCharacters) {
            if (chr === character) {
                if (character === $gameTemp.arpgGlobalTempData().selectingTarget) {
                    this.doSelect();
                } else {
                    this.doChangeSelectingTarget(character);
                }
                return;
            }
        }
    }

    private nextSelect(): void {
        const character = this.searchNextCharacter();
        if (character) {
            this.doChangeSelectingTarget(character);
        }
    }

    private prevSelect(): void {
        const character = this.searchPrevCharacter();
        if (character) {
            this.doChangeSelectingTarget(character);
        }
    }

    private doChangeSelectingTarget(targetCharacter: Game_Character): void {
        SoundManager.playCursor();
        $gameTemp.arpgGlobalTempData().selectingTarget = targetCharacter;
    }

    private doSelect(): void {
        SoundManager.playOk();
        const arpgGlobalTempData = $gameTemp.arpgGlobalTempData();
        const target = arpgGlobalTempData.selectingTarget;
        if (target) {
            if (arpgGlobalTempData.selectedTargetCharacterKindVariableId > 0) {
                $gameVariables.setValue(arpgGlobalTempData.selectedTargetCharacterKindVariableId, ARPG_Utils.characterKindValue(target));
            }
            if (target instanceof Game_Event && arpgGlobalTempData.selectedTargetEventIdVariableId > 0) {
                $gameVariables.setValue(arpgGlobalTempData.selectedTargetEventIdVariableId, target.eventId());
            }
            if (arpgGlobalTempData.selectResultSwitchId > 0) {
                $gameSwitches.setValue(arpgGlobalTempData.selectResultSwitchId, true);
            }
        }
        $gameMap.endTargetSelect();
    }

    private searchNextCharacter(): Game_Character | undefined {
        const allCharacters = this.allCharactersByTargetType();
        if (allCharacters.length <= 1) return undefined;
        const index = allCharacters.indexOf($gameTemp.arpgGlobalTempData().selectingTarget!);
        if (index >= 0) {
            if (index < allCharacters.length - 1) {
                return allCharacters[index + 1];
            } else {
                return allCharacters[0];
            }
        }
        return undefined;
    }

    private searchPrevCharacter(): Game_Character | undefined {
        const allCharacters = this.allCharactersByTargetType();
        if (allCharacters.length <= 1) return undefined;
        const index = allCharacters.indexOf($gameTemp.arpgGlobalTempData().selectingTarget!);
        if (index >= 0) {
            if (index > 0) {
                return allCharacters[index - 1];
            } else {
                return allCharacters[allCharacters.length - 1];
            }
        }
        return undefined;
    }

    private allCharactersByTargetType() {
        let characters;
        if (this._selectTargetType === "actor") {
            characters = ARPG_Utils.allAliveActorCharacters();
        } else {
            characters = ARPG_Utils.allAliveEnemyCharacters();
        }
        if (this._onlyNearTheScreen) {
            characters = characters.filter(character => character.isInTheScreen(0, 0));
        }
        return characters;
    }
}

class TriangleDrawer {
    private _bitmap: Bitmap;

    constructor(bitmap: Bitmap) {
        this._bitmap = bitmap;
    }

    drawTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, strokeColor: string, fillColor: string): void {
        const ctx = this._bitmap.context;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
}

class SpriteMover extends Component<Sprite> {
    private _moveSpeed: number;
    private _targetX: number;
    private _targetY: number;
    private _moving: boolean;

    constructor(moveSpeed: number) {
        super();
        this._moveSpeed = moveSpeed;
        this._targetX = 0;
        this._targetY = 0;
        this._moving = false;
    }

    get moveSpeed() { return this._moveSpeed }
    set moveSpeed(_moveSpeed) { this._moveSpeed = _moveSpeed; }

    update(): void {
        super.update();
        if (this._moving) this.updateMove();
    }

    updateMove(): void {
        const sprite = this.user();
        const oy = this._targetY - sprite.y;
        const ox = this._targetX - sprite.x;
        const rad = Math.atan2(oy, ox);
        const disX = this._moveSpeed * Math.cos(rad);
        const disY = this._moveSpeed * Math.sin(rad);
        sprite.x += disX;
        sprite.y += disY;
        if ((disX < 0 && sprite.x + disX < this._targetX) || (disX > 0 && sprite.x + disX > this._targetX)) sprite.x = this._targetX;
        if ((disY < 0 && sprite.y + disY < this._targetY) || (disY > 0 && sprite.y + disY > this._targetY)) sprite.y = this._targetY;
        if (sprite.x === this._targetX && sprite.y === this._targetY) this._moving = false;
    }

    isMoving(): boolean {
        return this._moving;
    }

    isBusy(): boolean {
        return this.isMoving();
    }

    startMove(targetPoint: DotMovePoint): void {
        this._targetX = targetPoint.x;
        this._targetY = targetPoint.y;
        this._moving = true;
    }

    changeTarget(targetPoint: DotMovePoint): void {
        this._targetX = targetPoint.x;
        this._targetY = targetPoint.y;
    }

    fastMove(targetPoint: DotMovePoint): void {
        this.user().x = targetPoint.x;
        this.user().y = targetPoint.y;
        this._moving = false;
    }

    forceEndMove(): void {
        this.user().x = this._targetX;
        this.user().y = this._targetY;
        this._moving = false;
    }
}

class CursorAnimation extends Component<Sprite> {
    static readonly MAX_ANIMATION_TIME = 30;

    private _nowAnimation!: boolean;
    private _animationSign!: number;
    private _animationTime!: number;

    constructor() {
        super();
        this._nowAnimation = true;
        this._animationTime = 0;
        this._animationSign = 1;
    }

    update() {
        super.update();
        if (this._nowAnimation) this.updateAnimation();
    }

    updateAnimation() {
        if (this._animationTime >= 0) {
            this.user().y = this._animationTime / 4;
        } else {
            this.user().y = -this._animationTime / 4;
        }
        this._animationTime += this._animationSign;
        if (this._animationTime >= CursorAnimation.MAX_ANIMATION_TIME) {
            this._animationSign = -1;
        } else if (this._animationTime <= -CursorAnimation.MAX_ANIMATION_TIME) {
            this._animationSign = 1;
        }
    }
}

class Sprite_CursorArrow extends Sprite {
    initialize() {
        super.initialize();
        this.createBitmap();
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.addComponent(new CursorAnimation());
    }

    createBitmap() {
        if (ARPG_CorePluginParams.UseImageTargetSelectCursor) {
            this.bitmap = ImageManager.loadBitmap("img/", ARPG_CorePluginParams.TargetSelectCursorImageFileName);
        } else {
            this.bitmap = new Bitmap(32, 24);
            const w = 32;
            const h = 24;
            const x1 = 0;
            const y1 = 0;
            const x2 = x1 + w;
            const y2 = 0;
            const x3 = (x1 + w) / 2;
            const y3 = h;
            this.drawTriangle(x1, y1, x2, y2, x3, y3, "#000000", "#ffffff");
        }
    }

    drawTriangle(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        strokeColor: string,
        fillColor: string
    ) {
        new TriangleDrawer(this.bitmap).drawTriangle(x1, y1, x2, y2, x3, y3, strokeColor, fillColor);
    }
}

export class Sprite_TargetSelect extends Sprite {
    static CURSOR_MOVE_DURATION: number = 8;

    private _mover!: SpriteMover;
    private _lastTarget?: Game_Character;

    initialize(): void {
        super.initialize();
        this.hide();
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        const cusrorArrow = new Sprite_CursorArrow();
        this.addChild(cusrorArrow);
        this._mover = new SpriteMover(1);
        this.addComponent(this._mover);
    }

    update(): void {
        super.update();
        let needShow: boolean = false;
        const target = $gameTemp.arpgGlobalTempData().selectingTarget;
        if (target) {
            const targetSprite = target.getSprite();
            if (targetSprite) {
                needShow = true;
                if (this._lastTarget === target) {
                    if (!this._mover.isMoving()) {
                        this.x = targetSprite.x;
                        this.y = targetSprite.y - targetSprite.height;
                    }
                } else {
                    let fast = this._lastTarget == null;
                    this.moveToTarget(targetSprite, fast);
                    this._lastTarget = target
                }
            }
        }

        if (needShow) {
            this.show();
        } else {
            this.hide();
            this._lastTarget = undefined;
        }
    }

    moveToTarget(target: Sprite, fast: boolean = false): void {
        const targetPos = new DotMovePoint(target.x, target.y - target.height);
        if (fast) {
            this._mover.fastMove(targetPos);
        } else {
            const fromPos = new DotMovePoint(this.x, this.y);
            this._mover.moveSpeed = this.calcCursorMoveSpeed(fromPos, targetPos);
            this._mover.startMove(targetPos);
        }
    }

    private calcCursorMoveSpeed(fromPos: DotMovePoint, targetPos: DotMovePoint): number {
        return fromPos.calcFar(targetPos) / Sprite_TargetSelect.CURSOR_MOVE_DURATION;
    }
}

class Spriteset_Map_Mixin extends Spriteset_Map {
    static _createLowerLayer = Spriteset_Map.prototype.createLowerLayer;

    private _targetSelectSprite!: Sprite_TargetSelect;

    createLowerLayer(): void {
        Spriteset_Map_Mixin._createLowerLayer.call(this);
        this.createTargetSelectSprite();
    }

    createTargetSelectSprite(): void {
        this._targetSelectSprite = new Sprite_TargetSelect();
        this._tilemap.addChild(this._targetSelectSprite);
    }
}

mixin(Spriteset_Map, Spriteset_Map_Mixin);


class Game_Map_Mixin extends Game_Map {
    static _initialize = Game_Map.prototype.initialize;
    static _update = Game_Map.prototype.update;

    private _targetSelecting!: boolean;
    private _targetSelectCancelable!: boolean;
    private _targetSelecter?: TargetSelecter;

    initialize(): void {
        Game_Map_Mixin._initialize.call(this);
        this._targetSelecting = false;
        this._targetSelectCancelable = false;
    }

    startTargetSelect(opt: { wait?: boolean, cancelable?: boolean, onlyNearTheScreen?: boolean } = {}): void {
        const wait = opt.wait ?? false;
        const cancelable = opt.cancelable ?? false;
        this._targetSelecting = true;
        this._targetSelectCancelable = cancelable;
        $gamePlayer.onStartTargetSelect();
        this._targetSelecter = new TargetSelecter("enemy", { onlyNearTheScreen: opt.onlyNearTheScreen });
        $gameTemp.arpgGlobalTempData().controlCharacter.addComponent(this._targetSelecter);
        if (wait) {
            this.stop();
        }
    }

    isTargetSelecting(): boolean {
        return this._targetSelecting;
    }

    isTargetSelectCancelable(): boolean {
        return this._targetSelectCancelable;
    }

    endTargetSelect(): void {
        if (this._targetSelecting) {
            this._targetSelecting = false;
            $gamePlayer.onEndTargetSelect();
            $gameTemp.arpgGlobalTempData().selectingTarget = undefined;
            this._targetSelecter?.end();
            this._targetSelecter = undefined;
        }
        this.resume();
    }

    touchCharacter(character: Game_Character): void {
        if (!this.isTargetSelecting()) return;
        if (!this._targetSelecter) return;
        this._targetSelecter.touchCharacter(character);
    }
}

mixin(Game_Map, Game_Map_Mixin);


class Scene_Map_Mixin extends Scene_Map {
    static _update = Scene_Map.prototype.update;
    static _updateCallMenu = Scene_Map.prototype.updateCallMenu;
    static _isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
    static _onMapTouch = Scene_Map.prototype.onMapTouch;

    update(): void {
        Scene_Map_Mixin._update.call(this);
        // NOTE: updateCallMenuの後にターゲット選択更新処理を行う。
        this.updateTargetSelect();
    }

    isMenuEnabled(): boolean {
        const result = Scene_Map_Mixin._isMenuEnabled.call(this);
        if (!result) return false;
        if ($gameMap.isTargetSelecting()) return false;
        return true;
    }

    updateTargetSelect(): void {
        if (this.isMenuCalled() && $gameMap.isTargetSelectCancelable()) {
            $gameMap.endTargetSelect();
        }
    }

    onMapTouch(): void {
        if ($gameMap.isTargetSelecting()) return;
        Scene_Map_Mixin._onMapTouch.call(this);
    }
}

mixin(Scene_Map, Scene_Map_Mixin);
