import { mixin } from "CommonLibrary/mixin";

declare global {
    interface Game_Interpreter {
        _needAttackMotionWait: boolean;
    }
}

class Game_Interpreter_Mixin extends Game_Interpreter {
    static _initialize = Game_Interpreter.prototype.initialize;
    static _updateWait = Game_Interpreter.prototype.updateWait;

    initialize(): void {
        Game_Interpreter_Mixin._initialize.call(this);
        this._needAttackMotionWait = false;
    }

    updateWait() {
        const result = Game_Interpreter_Mixin._updateWait.call(this);
        if (result) return true;
        return this.updateWait_ARPG_ItemShortcut();
    }

    updateWait_ARPG_ItemShortcut(): boolean {
        const character = this.arpgCharacter();
        if (!character) return false;

        if (this._needAttackMotionWait) {
            // TODO: 暫定対応
            if (character.isWeaponMotionPlaying()) {
                return true;
            } else {
                this._needAttackMotionWait = false;
                return false;
            }
        }

        return false;
    }
}

mixin(Game_Interpreter, Game_Interpreter_Mixin);
