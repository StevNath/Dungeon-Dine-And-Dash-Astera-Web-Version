import { ARPG_BattlerParameters } from "ARPG_BattlerParameters";
import { mixin } from "../CommonLibrary/mixin";
import { LevelUpProcessor } from "./LevelUpProcessor";

declare global {
    interface Game_Actor {
        _arpgParameters: ARPG_BattlerParameters;

        arpgParameters(): ARPG_BattlerParameters;
    }
}

class Game_Actor_Mixin extends Game_Actor {
    static _initialize = Game_Actor.prototype.initialize;
    static _displayLevelUp = Game_Actor.prototype.displayLevelUp;

    initialize(actorId: number): void {
        Game_Actor_Mixin._initialize.call(this, actorId);
        this._arpgParameters = new ARPG_BattlerParameters();
    }

    displayLevelUp(newSkills: RMMZData.Item[]): void {
        if ((SceneManager as any)._scene instanceof Scene_Map) {
            const text = TextManager.levelUp.format(
                this._name,
                TextManager.level,
                this._level
            );
            $gamePlayer.addComponent(new LevelUpProcessor(this, text, newSkills));
        } else {
            Game_Actor_Mixin._displayLevelUp.call(this, newSkills);
        }
    }

    arpgParameters(): ARPG_BattlerParameters {
        return this._arpgParameters;
    }
}

mixin(Game_Actor, Game_Actor_Mixin);
