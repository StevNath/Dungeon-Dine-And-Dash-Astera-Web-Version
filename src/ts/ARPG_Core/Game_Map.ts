import { DotMovePoint } from "DotMoveSystem";
import { ARPG_BattleManager } from "./ARPG_BattleManager";
import { HitBox } from "./HitBox";
import { MessageWindowType } from "./MessageWindowController";
import { TransparentObject } from "./TransparentObject";
import { Degree } from "../CommonLibrary/Degree";
import { ARPG_CorePluginParams } from "./ARPG_Config";
import { ARPG_Actor } from "ARPG_Actor";

declare global {
    interface Game_Map {
        _arpgBattleManager?: ARPG_BattleManager;
        _arpgMode: boolean;
        _stopped: boolean;
        _transparentObject?: TransparentObject;

        stop(): void;
        resume(): void;
        isStopped(): boolean;

        arpgBattleManager(): ARPG_BattleManager | undefined;
        allHitBoxs(): Set<HitBox>;

        outOfMap(character: Game_CharacterBase): boolean;

        showCommonMessageWindow(text: string, rect: Rectangle, opt?: { time?: number, type?: MessageWindowType }): void;

        startSceneIndication(scene: Scene_Map): void;
        terminateSceneIndication(scene: Scene_Map): void;

        startARPGMode(): void;
        endARPGMode(): void;
        isEnabledARPGMode(): boolean;

        transparentObjectCastTo(pos: DotMovePoint, deg: Degree, far: number, opt?: { width?: number, height?: number }): DotMovePoint | undefined;
    }
}


const _Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.call(this);
    this._arpgMode = false;
    this._stopped = false;
};

// NOTE: マップが切り替わった場合、自動的にARPGモードOFFとする。
const _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this.endARPGMode();
};

Game_Map.prototype.outOfMap = function(character) {
    const pos = character.positionPoint();
    return ((pos.x + character.width()) < 0 || pos.y > this.width()) ||
        ((pos.y + character.height()) < 0 || pos.y > this.height());
};

Game_Map.prototype.stop = function() {
    return this._stopped = true;
};

Game_Map.prototype.resume = function() {
    return this._stopped = false;
};

Game_Map.prototype.isStopped = function() {
    return this._stopped;
};

Game_Map.prototype.startARPGMode = function(this: Game_Map) {
    if (!this._arpgMode) {
        const controlCharacter = $gameTemp.arpgGlobalTempData().controlCharacter;
        if (!this._arpgBattleManager) {
            this._arpgBattleManager = new ARPG_BattleManager();
            controlCharacter.addComponent(this._arpgBattleManager);
        }
        this._arpgMode = true;
    }
    $gameSwitches.setValue(ARPG_CorePluginParams.EnableARPGSwitchId, true);
};

Game_Map.prototype.endARPGMode = function(this: Game_Map) {
    if (this._arpgMode) {
        this._arpgBattleManager?.end();
        this._arpgBattleManager = undefined;
        $gameTemp.arpgGlobalTempData().bossHpGaugeTargetEnemy = undefined;
        this._arpgMode = false;
    }
    $gameSwitches.setValue(ARPG_CorePluginParams.EnableARPGSwitchId, false);
};

Game_Map.prototype.isEnabledARPGMode = function(this: Game_Map) {
    return this._arpgMode;
};

Game_Map.prototype.arpgBattleManager = function(): ARPG_BattleManager | undefined {
    return this._arpgBattleManager;
};

const _Game_Map_allCharacters = Game_Map.prototype.allCharacters;
Game_Map.prototype.allCharacters = function() {
    const characters = _Game_Map_allCharacters.call(this);
    for (const hitBox of this.allHitBoxs()) {
        characters.add(hitBox);
    }
    if (this._transparentObject) characters.add(this._transparentObject);
    return characters;
};

Game_Map.prototype.allHitBoxs = function() {
    const hitBoxs = new Set<HitBox>;
    if ($gamePlayer.isBattler()) {
        for (const hitBox of $gamePlayer.battler().damageHitChecker.hitBoxs) {
            hitBoxs.add(hitBox);
        }
        for (const hitBox of $gamePlayer.battler().attackHitChecker.hitBoxs) {
            hitBoxs.add(hitBox);
        }
    }
    for (const event of this.events()) {
        if (event.isBattler()) {
            const battler = event.battler();
            for (const hitBox of battler.damageHitChecker.hitBoxs) {
                hitBoxs.add(hitBox);
            }
            for (const hitBox of battler.attackHitChecker.hitBoxs) {
                hitBoxs.add(hitBox);
            }
            for (const customHitChecker of battler.customHitCheckers.values()) {
                for (const hitBox of customHitChecker.hitBoxs) {
                    hitBoxs.add(hitBox);
                }
            }
        } else if (event.isSkillObject()) {
            const skillObject = event.skillObject();
            for (const hitBox of skillObject.attackHitChecker.hitBoxs) {
                hitBoxs.add(hitBox);
            }
            for (const customHitChecker of skillObject.customHitCheckers.values()) {
                for (const hitBox of customHitChecker.hitBoxs) {
                    hitBoxs.add(hitBox);
                }
            }
        } else if (event.isFieldObject()) {
            const fieldObject = event.fieldObject();
            for (const customHitChecker of fieldObject.customHitCheckers.values()) {
                for (const hitBox of customHitChecker.hitBoxs) {
                    hitBoxs.add(hitBox);
                }
            }
        }
    }
    return hitBoxs;
};

Game_Map.prototype.showCommonMessageWindow = function(this: Game_Map, text, rect, opt = {}) {
    $gameTemp.arpgGlobalTempData().skillNameWindowController!.showWindow(text, rect, opt);
};

Game_Map.prototype.startSceneIndication = function(scene) {
    let skillNameWindowController = $gameTemp.arpgGlobalTempData().skillNameWindowController;
    const createWindowCallback = scene.createSkillNameWindowCallback.bind(scene);
    const deleteWindowCallback = scene.deleteSkillNameWindowCallback.bind(scene);
    skillNameWindowController.sceneStart(createWindowCallback, deleteWindowCallback);
    if ($gamePlayer.isBattler()) {
        // NOTE: メニュー画面でアクターを交代した場合に対応する。
        $gamePlayer.battler<ARPG_Actor>().changeActor($gameParty.leader().actorId());
    } else {
        $gamePlayer.setupActor($gameParty.leader().actorId());
    }
};

Game_Map.prototype.terminateSceneIndication = function(scene) {
    $gameTemp.arpgGlobalTempData().skillNameWindowController?.sceneTerminate();
};

Game_Map.prototype.transparentObjectCastTo = function(pos, deg, far, opt = {}) {
    this._transparentObject = new TransparentObject();
    this._transparentObject.setPositionPoint(pos);
    if (opt.width) this._transparentObject.setWidth(opt.width);
    if (opt.height) this._transparentObject.setHeight(opt.height);
    const collided = this._transparentObject.castTo(deg, far);
    let result;
    if (collided) result = this._transparentObject.positionPoint();
    $gameTemp.removeUnusedCache();
    this._transparentObject = undefined;
    $gameTemp.removeUnusedCache();
    return result;
}
