import { TimerComponent } from "../CommonLibrary/TimerComponent";
import { Component } from "../CommonLibrary/Component";
import { ARPG_Actor } from "./ARPG_Actor";
import { ARPG_Utils } from "./ARPG_Utils";

export class PlayerBehavior extends Component<Game_Player> {
    private _attackProcess: AttackProcess = new AttackProcess();
    private _guardProcess: GuardProcess = new GuardProcess();

    protected setup(): void {
        super.setup();
        this.addComponent(this._attackProcess);
        this.addComponent(this._guardProcess);
    }

    delayAttackable(delayTime: number) {
        this._attackProcess.delayAttackable(delayTime);
    }
}

class AttackProcess extends Component<Game_Player> {
    static readonly WAIT_ATTACK_TIME = 2;

    private _waitAttackTimer: TimerComponent<Game_Player> = new TimerComponent();
    private _delayAttackableTimer: TimerComponent<Game_Player> = new TimerComponent();

    protected setup(): void {
        super.setup();
        this.addComponent(this._waitAttackTimer);
        this.addComponent(this._delayAttackableTimer);
    }

    delayAttackable(delayTime: number) {
        this._delayAttackableTimer.startTimer(delayTime);
    }

    protected update(): void {
        super.update();
        if ($gameMap.isEventRunning()) {
            this._waitAttackTimer.stop();
        }

        if (this._waitAttackTimer.checkTimeout()) {
            if (!$gameMap.isEventRunning()) {
                const actor = this.user().battler() as ARPG_Actor;
                const skillIds = actor.weaponActionSkillIds();
                if (skillIds.length > 0) actor.useSkill("skill", skillIds[0]);
            }
        }

        if (!$gameMap.isEventRunning() && !this._delayAttackableTimer.isTimerRunning()) {
            const keysym = ARPG_Utils.getKeySymbol("ActorNormalAttack");
            if (keysym && Input.isTriggered(keysym)) {
                this._waitAttackTimer.startTimer(AttackProcess.WAIT_ATTACK_TIME);
            }
        }
    }
}

class GuardProcess extends Component<Game_Player> {
    protected update(): void {
        super.update();
        if (this.user().battler().isGuarding()) {
            const keysym = ARPG_Utils.getKeySymbol("ActorGuard");
            if (!(keysym && Input.isPressed(keysym))) {
                this.user().battler().endGuard("input");
            }
        } else {
            const keysym = ARPG_Utils.getKeySymbol("ActorGuard");
            if (keysym && Input.isPressed(keysym)) {
                this.user().battler().startGuard("input");
            }
        }
    }
}
