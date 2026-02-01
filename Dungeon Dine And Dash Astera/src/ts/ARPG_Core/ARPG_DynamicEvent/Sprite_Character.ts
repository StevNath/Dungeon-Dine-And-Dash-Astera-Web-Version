import { mixin } from "../../CommonLibrary/mixin";

declare global {
    interface Sprite_Character {
        character(): Game_CharacterBase;
    }
}

class Sprite_Character_Mixin extends Sprite_Character {
    character(): Game_CharacterBase {
        return this._character!;
    }
}

mixin(Sprite_Character, Sprite_Character_Mixin);
