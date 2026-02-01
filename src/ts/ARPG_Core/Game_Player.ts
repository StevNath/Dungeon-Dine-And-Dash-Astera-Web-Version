import { mixin } from "../CommonLibrary/mixin";
import { PlayerBehavior } from "./PlayerBehavior";

declare global {
    interface Game_Player {
        _playerBehavior?: PlayerBehavior;

        onStartTargetSelect(): void;
        onEndTargetSelect(): void;
        stopMoveByInput(reason: string): void;
        resumeMoveByInput(reason: string): void;
        isStoppedMoveByInput(): boolean;
    }
}

class Game_Player_Mixin extends Game_Player {
    static _initMembers = Game_Player.prototype.initMembers;
    static _update = Game_Player.prototype.update;
    static _moveByInput = Game_Player.prototype.moveByInput;

    private _stopMoveByInputReasons!: string[];

    initMembers(): void {
        Game_Player_Mixin._initMembers.call(this);
        this._stopMoveByInputReasons = [];
    }

    update(sceneActive: boolean) {
        if ($gameMap.isEnabledARPGMode()) {
            if (!this._playerBehavior) {
                this._playerBehavior = new PlayerBehavior();
                this.addComponent(this._playerBehavior);
            }
        } else {
            this._playerBehavior?.end();
            this._playerBehavior = undefined;
        }
        Game_Player_Mixin._update.call(this, sceneActive);
        // NOTE: 現状は複数アクターに対応していないため、ここでステート経過時間を更新している。
        $gameParty.leader().updateStatesDuration();
    }

    onStartTargetSelect(): void {
        this.addDisableMoveReason("targetSelect");
    }

    onEndTargetSelect(): void {
        this.removeDisableMoveReason("targetSelect");
        this._playerBehavior!.delayAttackable(2);
    }

    moveByInput(): void {
        if (this.isStoppedMoveByInput()) return;
        Game_Player_Mixin._moveByInput.call(this);
    }

    stopMoveByInput(reason: string): void {
        if (!this._stopMoveByInputReasons.includes(reason)) this._stopMoveByInputReasons.push(reason);
    }

    resumeMoveByInput(reason: string): void {
        this._stopMoveByInputReasons = this._stopMoveByInputReasons.filter(r => r !== reason);
    }

    isStoppedMoveByInput(): boolean {
        return this._stopMoveByInputReasons.length > 0;
    }
}

mixin(Game_Player, Game_Player_Mixin);
