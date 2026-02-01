import { Component } from "../CommonLibrary/Component";
import { ARPG_Battler } from "ARPG_Battler";
import { ARPG_Skill } from "ARPG_Skill";
import { ARPG_CustomManager } from "ARPG_CustomManager";
import { ARPG_Actor } from "ARPG_Actor";

const ACTOR_DEAD_CHANGE_NO_DAMAGE_FRAME = 60;

export class ARPG_BattleManager extends Component<Game_Character> {
    private _showSkillNameCount: number = 0;

    deadActor(actor: ARPG_Actor): void {
        const aliveMembers = $gameParty.aliveMembers();
        if (aliveMembers.length === 0) {
            this.gameover();
        } else {
            $gameTemp.requestChangeNextActor({ force: true });
        }
        $gamePlayer.battler().startNoDamage(ACTOR_DEAD_CHANGE_NO_DAMAGE_FRAME);
    }

    gameover() {
        const gameoverComponent = ARPG_CustomManager.gameoverComponent();
        if (gameoverComponent) {
            this.addComponent(gameoverComponent);
        } else {
            SceneManager.goto(Scene_Gameover);
        }
    }

    showSkillNameWindow(user: ARPG_Battler, skill: ARPG_Skill): void {
        const w = 320;
        const h = 64;
        const x = Graphics.boxWidth / 2 - w / 2;
        const y = 0;
        const rect = new Rectangle(x, y, w, h);
        const skillData = skill.data();
        const text1 = skillData.message1.format(user.name(), skillData.name);
        $gameMap.showCommonMessageWindow(text1, rect);
        if (skillData.message2 && skillData.message2 != "") {
            const text2 = skillData.message2.format(user.name(), skillData.name);
            $gameMap.showCommonMessageWindow(text2, rect);
        }

        if (this._showSkillNameCount === 0) {
            $gameTemp.arpgGlobalTempData().skillNameWindowController.startManualWait();
        }
        this._showSkillNameCount++;
    }

    endShowSkillNameWindow(): void {
        if (this._showSkillNameCount > 0) {
            this._showSkillNameCount--;
            if (this._showSkillNameCount === 0) {
                $gameTemp.arpgGlobalTempData().skillNameWindowController.endManualWait();
            }
        }
    }
}
