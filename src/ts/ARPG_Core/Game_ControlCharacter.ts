import { ARPG_Actor } from "ARPG_Actor";
import { ARPG_CorePluginParams } from "ARPG_Config";
import { ARPG_Utils } from "ARPG_Utils";
import { Component } from "../CommonLibrary/Component";
import { TimerComponent } from "../CommonLibrary/TimerComponent";
import { MessageWindowController } from "./MessageWindowController";

const CHANGE_ACTOR_WAIT_TIME = 10;

export class Game_ControlCharacter extends Game_Character {
    setup(skillNameWindowController: MessageWindowController): void {
        this.addComponent(skillNameWindowController);
        this.addComponent(new VisibleHitBoxProcess());
        this.addComponent(new ChangeActorProcess());
    }
}

class VisibleHitBoxProcess extends Component<Game_Character> {
    protected update(): void {
        super.update();
        if (!$gameTemp.isPlaytest()) return;
        const keysym = ARPG_Utils.getKeySymbol("VisibleHitBox");
        if (keysym && Input.isTriggered(keysym)) {
            const visibleHitBoxSwitchValue = $gameSwitches.value(ARPG_CorePluginParams.HitBoxSetting.VisibleHitAreaSwitchId);
            $gameSwitches.setValue(ARPG_CorePluginParams.HitBoxSetting.VisibleHitAreaSwitchId, !visibleHitBoxSwitchValue);
        }
    }
}


class ChangeActorProcess extends Component<Game_Character> {
    private _waitChangeActorTimer = new TimerComponent<Game_Character>();

    protected setup(): void {
        super.setup();
        this.addComponent(this._waitChangeActorTimer);
    }

    protected update(): void {
        super.update();
        let request = $gameTemp.checkRequestedChangeNextActor();
        if (request) {
            if (request.force) {
                this.forceChangeNextActor();
            } else {
                this.changeNextActor();
            }
        } else {
            const enableSwitchId = ARPG_CorePluginParams.EnableChangeControlActorSwitchId;
            if (enableSwitchId === 0 || $gameSwitches.value(enableSwitchId)) {
                const keysym = ARPG_Utils.getKeySymbol("ChangeControlActor");
                if (keysym && Input.isTriggered(keysym)) {
                    this.changeNextActor();
                }
            }
        }

        // NOTE:
        // 戦闘不能のアクターが操作キャラクターよりも前にいる場合、戦闘不能から復活させると操作キャラクターが変化するため、
        // ここで操作キャラクターの変更を行う。戦闘不能によるキャラクター変更処理はrequestChangeNextActorにより実施するため、
        // ここでは生存キャラクターの変更のみに限定している。
        if ($gamePlayer.battler<ARPG_Actor>().isAlive() && $gameParty.leader().isAlive()) {
            const leaderActorId = $gameParty.leader().actorId();
            if (leaderActorId != $gamePlayer.battler<ARPG_Actor>().actorId()) {
                $gamePlayer.battler<ARPG_Actor>().changeActor(leaderActorId);
                $gamePlayer.refresh();
            }
        }
    }

    protected changeNextActor(): void {
        if (!this.isChangeActorEnabled()) return;
        if (this._waitChangeActorTimer.isTimerRunning()) return;
        this.forceChangeNextActor();
    }

    protected forceChangeNextActor(): void {
        const changed = $gameParty.changeNextActor($gamePlayer.battler<ARPG_Actor>().actorId());
        if ($gamePlayer.isBattler()) {
            $gamePlayer.battler<ARPG_Actor>().changeActor($gameParty.leader().actorId());
        }
        if (changed) {
            this._waitChangeActorTimer.startTimer(CHANGE_ACTOR_WAIT_TIME);
            const actorChangeSeParam = ARPG_CorePluginParams.SESetting.ActorChange;
            if (actorChangeSeParam) {
                const se = {
                    name: actorChangeSeParam.FileName,
                    volume: actorChangeSeParam.Volume,
                    pitch: actorChangeSeParam.Pitch,
                    pan: actorChangeSeParam.Pan,
                    pos: actorChangeSeParam.Pos,
                };
                AudioManager.playSe(se);
            }
        }
    }

    protected isChangeActorEnabled(): boolean {
        if ($gameMap.isEventRunning()) return false;
        if (!ARPG_Utils.isChangeActorEnabled()) return false;
        return true;
    }
}
