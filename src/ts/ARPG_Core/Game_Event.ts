import { ARPG_Enemy, IARPG_EnemyOption } from "./ARPG_Enemy";
import { ARPG_SkillObject } from "./ARPG_SkillObject";
import { ARPG_Battler } from "./ARPG_Battler";
import { ARPG_Skill } from "./ARPG_Skill";
import { ARPG_FieldObject, IARPG_FieldObjectOption } from "./ARPG_FieldObject";
import { mixin } from "../CommonLibrary/mixin";

declare global {
    interface Game_Event {
        isErased(): boolean;
        setupEnemy(enemyId: number, opt?: IARPG_EnemyOption): void;
        setupFieldObject(opt?: IARPG_FieldObjectOption): void;
        isValid(): boolean;
        setupSkillObject(skillOrItem: "item" | "skill", id: number, user: ARPG_Battler): void;
        interpreter(): Game_Interpreter | undefined;
        stopSelfMovement(reason: string): void;
        resumeSelfMovement(reason: string): void;
        isStoppedSelfMovement(): boolean;
    }
}

class Game_Event_Mixin extends Game_Event {
    static _initMembers = Game_Event.prototype.initMembers;
    static _updateRoutineMove = Game_Event.prototype.updateRoutineMove;
    static _updateSelfMovement = Game_Event.prototype.updateSelfMovement;
    static _updateParallel = Game_Event.prototype.updateParallel;

    private _stopSelfMovementReasons!: string[];

    initMembers(): void {
        Game_Event_Mixin._initMembers.call(this);
        this._stopSelfMovementReasons = [];
    }

    isValid() {
        const margin = 2;
        if (this._realX >= $gameMap.displayX() - margin && this._realY >= $gameMap.displayY() - margin) {
            if (this._realX + this.width() <= $gameMap.displayX() + 17 + margin && this._realY + this.height() <= $gameMap.displayY() + 13 + margin) {
                return true;
            }
        }
        return false;
    }

    endARPGProcess() {
        Game_Character.prototype.endARPGProcess.call(this);
        const battler = this.arpgTempData().battler;
        if (battler && battler.isEnemy()) {
            battler.end();
            this.arpgTempData().battler = undefined;
        }
        const skillObject = this.arpgTempData().skillObject;
        if (skillObject) {
            skillObject.end();
            this.arpgTempData().skillObject = undefined;
        }
    }

    isErased() {
        return this._erased;
    }

    setupSkillObject(skillOrItem: "item" | "skill", id: number, user: ARPG_Battler) {
        const skill = new ARPG_Skill(skillOrItem, id);
        const skillObject = new ARPG_SkillObject(skill, user);
        this.arpgTempData().skillObject = skillObject
        this.addComponent(skillObject);
    }

    setupEnemy(enemyId: number, opt = {}) {
        const battler = new ARPG_Enemy(enemyId, opt);
        this.arpgTempData().battler = battler;
        this.addComponent(battler);
    }

    setupFieldObject(opt: IARPG_FieldObjectOption = {}) {
        const fieldObject = new ARPG_FieldObject(opt);
        this.arpgTempData().fieldObject = fieldObject;
        this.addComponent(fieldObject);
    }

    updateRoutineMove() {
        if (!(this.isBattler() && this.battler().isEnemy()) || !(SceneManager as any)._scene._messageWindow.isOpen()) {
            Game_Event_Mixin._updateRoutineMove.call(this);
        }
    }

    updateSelfMovement() {
        if (this.isStoppedSelfMovement()) return;
        Game_Event_Mixin._updateSelfMovement.call(this);
    }

    stopSelfMovement(reason: string): void {
        if (!this._stopSelfMovementReasons.includes(reason)) this._stopSelfMovementReasons.push(reason);
    }

    resumeSelfMovement(reason: string): void {
        this._stopSelfMovementReasons = this._stopSelfMovementReasons.filter(r => r !== reason);
    }

    isStoppedSelfMovement(): boolean {
        return this._stopSelfMovementReasons.length > 0;
    }

    interpreter() {
        if (this._interpreter == null) return undefined;
        return this._interpreter;
    }

    updateParallel() {
        if (this._interpreter && this._interpreter.isLocked()) return;
        Game_Event_Mixin._updateParallel.call(this);
    }
}

mixin(Game_Event, Game_Event_Mixin);
