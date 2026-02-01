import { mixin } from "../../CommonLibrary/mixin";

declare global {
    interface Game_Battler {
        updateStatesDuration(): void;
    }
}

abstract class Game_Battler_Mixin extends Game_Battler {
    static _clearStates = Game_Battler.prototype.clearStates;
    static _addState = Game_Battler.prototype.addState;
    static _eraseState = Game_Battler.prototype.eraseState;

    private _statesDuration!: number[];

    clearStates(): void {
        Game_Battler_Mixin._clearStates.call(this);
        this._statesDuration = [];
    }

    addState(stateId: number): void {
        Game_Battler_Mixin._addState.call(this, stateId);
        const state = $dataStates[stateId];
        if (typeof state.meta.duration === "string") {
            let update = false;
            if (!(this._statesDuration[stateId] != null && this._statesDuration[stateId] > 0)) {
                update = true;
            } else if (state.meta.overWriteDuration) {
                update = true;
            }
            if (update) {
                const duration = parseInt(state.meta.duration);
                this._statesDuration[stateId] = duration;
            }
        }
    }

    eraseState(stateId: number): void {
        Game_Battler_Mixin._eraseState.call(this, stateId);
        delete this._statesDuration[stateId];
    }

    updateStatesDuration(): void {
        // NOTE: イベント実行中はステート経過時間を更新しない。
        if ($gameMap.isEventRunning()) return;
        for (const stateId of this._states) {
            if (this._statesDuration[stateId] == null) continue;
            if (this._statesDuration[stateId] > 0) {
                this._statesDuration[stateId]--;
                if (this._statesDuration[stateId] <= 0) {
                    this.eraseState(stateId);
                }
            }
        }
    }
}

mixin(Game_Battler, Game_Battler_Mixin);
