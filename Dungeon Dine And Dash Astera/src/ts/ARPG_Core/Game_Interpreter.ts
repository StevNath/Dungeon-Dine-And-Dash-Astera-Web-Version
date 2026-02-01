import { mixin } from "../CommonLibrary/mixin";
import { ARPG_Skill } from "./ARPG_Skill";

declare global {
    interface Game_Interpreter {
        _needChantWait: boolean;
        _needTargetSelectWait: boolean;
        _blowAwayWaitCharacter?: Game_Character;
        _actionWaitCharacter?: Game_Character;

        lock(reason: string): void;
        unlock(reason: string): void;
        isLocked(): boolean;
        findCharacterBySpecification(characterSpecification: any): Game_Character;
        findArpgSkillBySpecification(param: any): ARPG_Skill;
        arpgCharacter(): Game_Character | undefined;
        event(): Game_Event | undefined;
    }
}

class Game_Interpreter_Mixin extends Game_Interpreter {
    static _initialize = Game_Interpreter.prototype.initialize;
    static _clear = Game_Interpreter.prototype.clear;
    static _update = Game_Interpreter.prototype.update;
    static _updateWait = Game_Interpreter.prototype.updateWait;

    private _lockReason!: string[];

    initialize(): void {
        Game_Interpreter_Mixin._initialize.call(this);
        this._needChantWait = false;
        this._needTargetSelectWait = false;
    }

    clear(): void {
        Game_Interpreter_Mixin._clear.call(this);
        this._lockReason = [];
    }

    lock(reason: string): void {
        if (!this._lockReason.includes(reason)) {
            this._lockReason.push(reason);
        }
    }

    unlock(reason: string): void {
        this._lockReason = this._lockReason.filter(r => r !== reason);
    }

    isLocked(): boolean {
        return this._lockReason.length > 0;
    }

    update() {
        if (this.isLocked()) return;
        Game_Interpreter_Mixin._update.call(this);
    }

    event(): Game_Event | undefined {
        return $gameMap.event(this._eventId);
    }

    findCharacterBySpecification(param: any): Game_Character {
        let characterKind: number = 0;

        if (param.CharacterKindByVariable > 0) {
            characterKind = $gameVariables.value(param.CharacterKindByVariable);
        } else {
            switch (param.CharacterKind) {
                case "thisEvent":
                    characterKind = 0;
                    break;
                case "player":
                    characterKind = 1;
                    break;
                case "follower":
                    characterKind = 2;
                    break;
                case "event":
                    characterKind = 3;
                    break;
                case "vehicle":
                    characterKind = 4;
                    break;
            }
        }

        let character: Game_Character | undefined;
        switch (characterKind) {
            case 0:
                character = $gameMap.event(this._eventId);
                break;
            case 1:
                character = $gamePlayer;
                break;
            case 2:
                let followerIndex;
                if (param.FollowerIndexByVariable > 0) {
                    followerIndex = $gameVariables.value(param.FollowerIndexByVariable);
                } else {
                    followerIndex = param.FollowerIndex;
                }
                character = $gamePlayer.followers().data()[followerIndex - 1];
                if (character == null) {
                    throw new Error(`FollowerIndex(${followerIndex}) is invalid.`);
                }
                break;
            case 3:
                let eventId;
                if (param.EventIdByVariable > 0) {
                    eventId = $gameVariables.value(param.EventIdByVariable);
                } else {
                    if (typeof param.EventIdOrName === "number") {
                        eventId = param.EventIdOrName;
                    } else {
                        eventId = this.eventNameToId(param.EventIdOrName);
                    }
                }
                if (eventId > 0) character = $gameMap.event(eventId);
                if (character == null) {
                    throw new Error(`EventId(${eventId}) is invalid.`);
                }
                break;
            case 4:
                let vehicleKind;
                if (param.FollowerIndex > 0) {
                    vehicleKind = $gameVariables.value(param.FollowerIndexByVariable);
                } else {
                    if (param.VehicleKind === "boat") {
                        vehicleKind = 1;
                    } else if (param.VehicleKind === "ship") {
                        vehicleKind = 2;
                    } else if (param.VehicleKind === "airship") {
                        vehicleKind = 3;
                    }
                }

                if (vehicleKind === 1) {
                    character = $gameMap.boat();
                } else if (vehicleKind === 2) {
                    character = $gameMap.ship();
                } else if (vehicleKind === 3) {
                    character = $gameMap.airship();
                } else {
                    throw new Error(`VehicleKind(${vehicleKind}) is invalid.`);
                }
                break;
        }
        if (character == null) {
            throw new Error(`${JSON.stringify(param)} is invalid.`);
        }
        return character;
    }

    findArpgSkillBySpecification(param: any): ARPG_Skill {
        if (param.SkillOrItem === "skill") {
            let idOrName;
            if (param.SkillIdByVariable > 0) {
                idOrName = $gameVariables.value(param.SkillIdByVariable)
            } else if (param.SkillByName && param.SkillByName !== "") {
                idOrName = param.SkillByName;
            } else {
                idOrName = param.SkillId;
            }
            return new ARPG_Skill("skill", idOrName);
        } else if (param.SkillOrItem === "item") {
            let idOrName;
            if (param.ItemIdByVariable > 0) {
                idOrName = $gameVariables.value(param.ItemIdByVariable)
            } else if (param.ItemByName && param.ItemByName !== "") {
                idOrName = param.ItemByName;
            } else {
                idOrName = param.ItemId;
            }
            return new ARPG_Skill("item", idOrName);
        }
        throw new Error(`${JSON.stringify(param)} is invalid.`);
    }

    eventNameToId(eventName: string): number {
        for (const event of $gameMap.events()) {
            if (event.event()!.name === eventName) {
                return event.eventId();
            }
        }
        throw new Error(`Event name(${eventName}) is not found.`);
    }

    arpgCharacter(): Game_Character | undefined {
        if (this._eventId > 0) {
            return $gameMap.event(this._eventId);
        } else {
            return $gamePlayer;
        }
    }

    updateWait() {
        const result = Game_Interpreter_Mixin._updateWait.call(this);
        if (result) return true;
        return this.updateWait_ARPG_Core();
    }

    updateWait_ARPG_Core(): boolean {
        const character = this.arpgCharacter();
        if (!character) return false;

        if (this._needChantWait) {
            if (character.isBattler() && character.battler().isChanting()) {
                return true;
            } else {
                this._needChantWait = false;
                return false;
            }
        } else if (this._needTargetSelectWait) {
            if ($gameMap.isTargetSelecting()) {
                return true;
            } else {
                this._needTargetSelectWait = false;
                return false;
            }
        } else if (this._blowAwayWaitCharacter) {
            if (this._blowAwayWaitCharacter.isBlowingAway()) {
                return true;
            } else {
                this._blowAwayWaitCharacter = undefined;
                return false;
            }
        } else if (this._actionWaitCharacter) {
            if (this._actionWaitCharacter.isActionWaiting()) {
                return true;
            } else {
                this._actionWaitCharacter = undefined;
                return false;
            }
        }
        return false;
    }
}

mixin(Game_Interpreter, Game_Interpreter_Mixin);
