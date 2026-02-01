import { CharacterCollisionChecker } from "DotMoveSystem";
import { mixin } from "../CommonLibrary/mixin";

class CharacterCollisionChecker_Mixin extends CharacterCollisionChecker {
    static _checkPassMass = CharacterCollisionChecker.prototype.checkPassMass;

    checkPassMass(ix: number, iy: number, d: number): boolean {
        if (!$gameMap.isValid(ix, iy)) {
            if ((this._character as Game_Character).isNoCheckMapValid()) {
                return true;
            } else {
                return false;
            }
        }
        return CharacterCollisionChecker_Mixin._checkPassMass.call(this, ix, iy, d);
    }
}

mixin(CharacterCollisionChecker, CharacterCollisionChecker_Mixin);
