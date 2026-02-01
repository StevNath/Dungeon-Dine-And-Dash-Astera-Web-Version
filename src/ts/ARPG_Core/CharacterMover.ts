import { CharacterMover, Degree } from "DotMoveSystem";
import { mixin } from "../CommonLibrary/mixin";

class CharacterMover_Mixin extends CharacterMover {
    static _continuousMoveProcess = CharacterMover.prototype.continuousMoveProcess;
    static _dotMoveByDeg = CharacterMover.prototype.dotMoveByDeg;

    continuousMoveProcess(): void {
        if ((this._character as Game_Character).isDisableMove()) {
            this._character.cancelAcceleration();
            this._character._moving = false;
            this.cancelMove();
        } else {
            CharacterMover_Mixin._continuousMoveProcess.call(this);
        }
    }

    dotMoveByDeg(deg: Degree, dpf: number = this._character.distancePerFrame()): void {
        if ((this._character as Game_Character).isDisableMove()) {
            this._character.cancelAcceleration();
            this._character._moving = false;
            this.cancelMove();
        } else {
            CharacterMover_Mixin._dotMoveByDeg.call(this, deg, dpf);
        }
    }
}

mixin(CharacterMover, CharacterMover_Mixin);
