import { ARPG_CustomManager } from "ARPG_CustomManager";
import { Processor } from "../CommonLibrary/Processor";

export class LevelUpProcessor extends Processor<Game_Character> {
    private _actor: Game_Actor;
    private _displayLevelUpProcessor;

    constructor(actor: Game_Actor, levelUpMessage: string, newSkills: RMMZData.Item[]) {
        super();
        this._actor = actor;
        this._displayLevelUpProcessor = new DisplayLevelUpProcessor(levelUpMessage, newSkills);
    }
    *process() {
        this.addComponent(this._displayLevelUpProcessor);

        const component = ARPG_CustomManager.levelUpComponent(this._actor);
        if (component) {
            // TODO: 現状ではプレイヤー以外のレベルアップには非対応
            $gamePlayer.addComponent(component);
            yield* this.waitComponent(component);
        }

        yield* this.waitComponent(this._displayLevelUpProcessor);
    }
}


class DisplayLevelUpProcessor extends Processor<Game_Character> {
    private _levelUpMessage: string;
    private _newSkills: RMMZData.Item[];

    constructor(levelUpMessage: string, newSkills: RMMZData.Item[]) {
        super();
        this._levelUpMessage = levelUpMessage;
        this._newSkills = newSkills;
    }

    *process() {
        const w = 640;
        const h = 64;
        const x = Graphics.boxWidth / 2 - w / 2;
        const y = 0;
        const rect = new Rectangle(x, y, w, h);
        $gameMap.showCommonMessageWindow(this._levelUpMessage, rect);
        for (const skill of this._newSkills) {
            yield* this.waitProcess(30);
            const text = TextManager.obtainSkill.format(skill.name)
            $gameMap.showCommonMessageWindow(text, rect);
        }
    }
}