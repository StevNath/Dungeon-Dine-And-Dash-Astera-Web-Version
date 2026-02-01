/*!/*:ja
@target MZ
@plugindesc キャラクターコリジョン拡張 v1.0.3
@author うなぎおおとろ
@help
キャラクターのコリジョン(衝突判定)を拡張するプラグインです。
このプラグインでは以下の機能を提供します。
・キャラクターの移動許可/禁止設定
・地形タグ/リージョンによるマップのすり抜け設定
・イベントタグによるイベントのすり抜け設定

【使用方法】
■ 地形のすり抜け設定
無条件で地形のすり抜け設定を行う場合、
プラグインコマンド「地形すり抜け設定」に"有効"を設定します。

■ 地形タグ/リージョンによる地形のすり抜け設定
地形タグによる地形のすり抜け設定を行う場合、
プラグインコマンド「地形タグすり抜け設定」によってすり抜け対象の地形タグを設定します。

リージョンによるマップのすり抜け設定を行い場合、
プラグインコマンド「リージョンすり抜け設定」によってすり抜け対象のリージョンを設定します。

■ プレイヤーのすり抜け設定
プレイヤーをすり抜けするように設定を行う場合、
プラグインコマンド「プレイヤーすり抜け設定」に"有効"を設定します。

※注意: プレイヤーすり抜けを設定した場合、自動的にフォロワーもすり抜け対象となります。

■ イベントのすり抜け設定
イベントをすり抜けするように設定を行う場合、
プラグインコマンド「イベントすり抜け設定」に"有効"を設定します。

■ イベントタグによる特定のイベントのすり抜け設定
イベントにイベントタグを設定したうえでプラグインコマンド「イベントタグすり抜け設定」で
すり抜け対象のイベントタグを指定することで、特定のイベントのみすり抜けできるように
設定することが可能です。イベントタグは複数設定することも可能です。
イベントタグを設定する場合、イベントの0ページ目の最初の注釈に以下のように記載してください。
<et: イベントタグ>

例: イベントタグ"ET1"と"ET2"を設定する場合
<et: ET1>
<et: ET2>


【ドット移動システムとの併用】
ドット移動システムと併用する場合、以下の順に導入してください。
・DotMoveSystem.js
・CharacterCollisionEx.js


【補足情報】
各種プラグインパラメータやプラグインコマンドで「キャラクター指定」を
行う場合、変数でキャラクターを指定することが可能です。
その場合、各種変数の値の意味については以下の通りとなります。

■ キャラクター種別の変数の値
プレイヤー: 1
フォロワー: 2
イベント: 3
乗り物: 4

■ フォロワーインデックスの変数の値
一人目: 1
二人目: 2
(以下略)

■ 乗り物の変数の値
小型船: 1
大型船: 2
飛行船: 3


@command SetThroughTerrain
@text 地形すり抜け設定
@desc 地形すり抜けの設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg EnableOrDisable
@text 有効/無効
@type boolean
@on 有効
@off 無効
@default true
@desc
有効または無効を選択します。


@command SetThroughTerrainTags
@text 地形タグすり抜け設定
@desc 地形タグすり抜けの設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg TerrainTags
@text 地形タグ
@type number[]
@default []
@desc
すり抜け対象の地形タグを登録します。


@command SetThroughRegions
@text リージョンすり抜け設定
@desc リージョンすり抜けの設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg Regions
@text リージョン
@type number[]
@default []
@desc
すり抜け対象のリージョンを登録します。


@command SetThroughEvent
@text イベントすり抜け設定
@desc イベントすり抜けの設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg EnableOrDisable
@text 有効/無効
@type boolean
@on 有効
@off 無効
@default true
@desc
有効または無効を選択します。


@command SetThroughPlayer
@text プレイヤーすり抜け設定
@desc プレイヤーすり抜けの設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg EnableOrDisable
@text 有効/無効
@type boolean
@on 有効
@off 無効
@default true
@desc
有効または無効を選択します。


@command SetThroughEventTags
@text イベントタグすり抜け設定
@desc イベントタグによるイベントすり抜けの設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg EventTags
@text イベントタグ
@type string[]
@default []
@desc
すり抜け対象のイベントタグを登録します。
*/
/*!/*~struct~CharacterSpecification:ja
@param CharacterKind
@text キャラクター種別
@type select
@option このイベント
@value thisEvent
@option プレイヤー
@value player
@option フォロワー
@value follower
@option イベント
@value event
@option 乗り物
@value vehicle
@default thisEvent
@desc
キャラクター種別を指定します。

@param CharacterKindByVariable
@text キャラクター種別(変数指定)
@type variable
@default 0
@desc
キャラクター種別を変数で指定します。

@param EventIdOrName
@text イベントID or イベント名
@type string
@default 1
@desc
キャラクター種別にイベントを指定した場合に対象となるイベントIDまたはイベント名を指定します。

@param EventIdByVariable
@text イベントID(変数指定)
@type variable
@default 0
@desc
キャラクター種別にイベントを指定した場合に対象となるイベントIDを変数で指定します。

@param FollowerIndex
@text フォロワーインデックス
@type number
@min 1
@default 1
@desc
キャラクター種別にフォロワーを指定した場合に対象となるフォロワーの順番を指定します。

@param FollowerIndexByVariable
@text フォロワーインデックス(変数指定)
@type variable
@default 0
@desc
キャラクター種別にフォロワーを指定した場合に対象となるフォロワーの順番を変数で指定します。

@param VehicleKind
@text 乗り物種別
@type select
@option 小型船
@value boat
@option 大型船
@value ship
@option 飛行船
@value airship
@default boat
@desc
キャラクター種別に乗り物を指定した場合に対象となる乗り物を指定します。

@param VehicleKindByVariable
@text 乗り物種別(変数指定)
@type variable
@default 0
@desc
キャラクター種別に乗り物を指定した場合に対象となる乗り物を変数で指定します。
*/

import "./ExportDotMoveSystem";
import { PluginParamsParser } from "../CommonLibrary/PluginParamsParser";
import { mixin } from "../CommonLibrary/mixin";

/*
 * ● 型定義
 */
declare global {
    interface Game_Interpreter {
        findCharacterBySpecification(characterSpecification: any): Game_Character;
    }

    interface Game_CharacterBase {
        _throughMap?: boolean;
        _throughEvent?: boolean;
        _throughPlayer?: boolean;
        _throughTerrain?: boolean;
        _throughTerrainTags?: number[];
        _throughRegions?: number[];
        _throughEventTags?: string[];

        isThroughEvent(): boolean;
        isIncludeThroughEventTag(eventTag: string): boolean;
        isThroughPlayer(): boolean;
        setThroughEventTags(eventTags: string[]): void;
        setThroughEvent(throughEventFlag: boolean): void;
        setThroughPlayer(throughPlayerFlag: boolean): void;
        isThroughTerrain(): boolean;
        setThroughTerrain(throughTerrainFlag: boolean): void;
        setThroughTerrainTags(throughTerrainTags: number[]): void;
        isIncludesThroughTerrainTag(terrainTag: number): boolean;
        setThroughRegions(throughRegions: number[]): void;
        isIncludesThroughRegion(terrainRegion: number): boolean;
        isThroughMass(x: number, y: number): boolean;
    }

    interface Game_Event {
        _eventTags: string[];

        eventTags(): string[];
        addEventTag(eventTag: string): void;
        hasEventTag(eventTag: string): boolean;
        getAnnotationValues(page: number): { [key: string]: string };
        getAnnotation(page: number): string;
    }
}

const CharacterCollisionExPluginName = document.currentScript ? decodeURIComponent((document.currentScript as HTMLScriptElement).src.match(/^.*\/(.+)\.js$/)![1]) : "CharacterCollisionEx";

export interface ICharacterCollisionExPluginParams {
}

export const CharacterCollisionExPluginParams: ICharacterCollisionExPluginParams = PluginParamsParser.parse(PluginManager.parameters(CharacterCollisionExPluginName));

PluginManager.registerCommand(CharacterCollisionExPluginName, "SetThroughTerrain", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character) return;
    character.setThroughTerrain(params.EnableOrDisable);
});

PluginManager.registerCommand(CharacterCollisionExPluginName, "SetThroughTerrainTags", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character) return;
    character.setThroughTerrainTags(params.TerrainTags);
});

PluginManager.registerCommand(CharacterCollisionExPluginName, "SetThroughRegions", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character) return;
    character.setThroughRegions(params.Regions);
});

PluginManager.registerCommand(CharacterCollisionExPluginName, "SetThroughEvent", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character) return;
    character.setThroughEvent(!!params.EnableOrDisable);
});

PluginManager.registerCommand(CharacterCollisionExPluginName, "SetThroughEventTags", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args, { EventTags: ["string"] });
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character) return;
    character.setThroughEventTags(params.EventTags);
});

PluginManager.registerCommand(CharacterCollisionExPluginName, "SetThroughPlayer", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    if (!character) return;
    character.setThroughPlayer(!!params.EnableOrDisable);
});


class Game_Interpreter_Mixin extends Game_Interpreter {
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

    eventNameToId(eventName: string): number {
        for (const event of $gameMap.events()) {
            if (event.event()!.name === eventName) {
                return event.eventId();
            }
        }
        throw new Error(`Event name(${eventName}) is not found.`);
    }
}

mixin(Game_Interpreter, Game_Interpreter_Mixin);


class Game_CharacterBase_Mixin extends Game_CharacterBase {
    isThroughEvent(): boolean {
        if (this._throughEvent == null) return false;
        return this._throughEvent;
    }

    setThroughEvent(throughEventFlag: boolean): void {
        this._throughEvent = throughEventFlag;
    }

    isIncludeThroughEventTag(eventTag: string): boolean {
        if (this._throughEventTags == null) return false;
        return this._throughEventTags.includes(eventTag);
    }

    setThroughEventTags(eventTags: string[]): void {
        this._throughEventTags = eventTags;
    }

    isThroughPlayer(): boolean {
        if (this._throughPlayer == null) return false;
        return this._throughPlayer;
    }

    setThroughPlayer(throughPlayerFlag: boolean): void {
        this._throughPlayer = throughPlayerFlag;
    }

    isThroughTerrain(): boolean {
        if (this._throughTerrain == null) return false;
        return this._throughTerrain;
    }

    setThroughTerrain(throughTerrainFlag: boolean): void {
        this._throughTerrain = throughTerrainFlag;
    }

    setThroughTerrainTags(throughTerrainTags: number[]): void {
        this._throughTerrainTags = throughTerrainTags;
    }

    isIncludesThroughRegion(terrainRegion: number): boolean {
        if (this._throughRegions == null) return false;
        return this._throughRegions.includes(terrainRegion);
    }

    setThroughRegions(throughRegions: number[]): void {
        this._throughRegions = throughRegions;
    }

    isIncludesThroughTerrainTag(terrainTag: number): boolean {
        if (this._throughTerrainTags == null) return false;
        return this._throughTerrainTags.includes(terrainTag);
    }

    // 特定の地形タグ/リージョンはスルーする
    isMapPassable(x: number, y: number, d: number): boolean {
        if (this.isThroughTerrain()) return true;
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        const d2 = this.reverseDir(d);
        let passCurrentMass = $gameMap.isPassable(x, y, d);
        let passNextMass = $gameMap.isPassable(x2, y2, d2);
        if (!passCurrentMass) passCurrentMass = this.isThroughMass(x, y);
        if (!passNextMass) passNextMass = this.isThroughMass(x2, y2);
        return passCurrentMass && passNextMass;
    }

    isThroughMass(x: number, y: number): boolean {
        if (this.isIncludesThroughRegion($gameMap.regionId(x, y))) return true;
        if (this.isIncludesThroughTerrainTag($gameMap.terrainTag(x, y))) return true;
        return false;
    }
}

mixin(Game_CharacterBase, Game_CharacterBase_Mixin);


class Game_Event_Mixin extends Game_Event {
    static _initialize = Game_Event.prototype.initialize;

    initialize(...args: any[]): void {
        Game_Event_Mixin._initialize.call(this, ...args);
        this._eventTags = this.parseEventTags();
    }

    parseEventTags(): string[] {
        let eventTags = new Set<string>();
        const note = this.getAnnotation(0);
        for (const matchData of note.matchAll(/\<et\s*\:\s*(.+)\>/g)) {
            if (matchData && matchData[1]) eventTags.add(matchData[1])
        }
        return [...eventTags];
    }

    eventTags(): string[] {
        return this._eventTags;
    }

    addEventTag(eventTag: string): void {
        if (!this.hasEventTag(eventTag)) this._eventTags.push(eventTag);
    }

    hasEventTag(eventTag: string): boolean {
        return this._eventTags.includes(eventTag);
    }

    getAnnotationValues(page: number): { [key: string]: string } {
        const note = this.getAnnotation(page);
        const data: any = { note };
        DataManager.extractMetadata(data);
        return data.meta;
    }

    getAnnotation(page: number): string {
        const eventData = this.event();
        if (eventData) {
            const noteLines = [];
            const pageList = eventData.pages[page].list;
            for (let i = 0; i < pageList.length; i++) {
                if (pageList[i].code === 108 || pageList[i].code === 408) {
                    noteLines.push(pageList[i].parameters[0]);
                } else {
                    break;
                }
            }
            return noteLines.join("\n");
        }
        return "";
    }
}

mixin(Game_Event, Game_Event_Mixin);


if (typeof DotMoveSystem !== "undefined") {
    class CharacterCollisionChecker_Mixin extends DotMoveSystem.CharacterCollisionChecker {
        static _checkPassMass = DotMoveSystem.CharacterCollisionChecker.prototype.checkPassMass;

        checkPassMass(ix: number, iy: number, d: number): boolean {
            if (this._character.isThroughTerrain()) return true;
            return CharacterCollisionChecker_Mixin._checkPassMass.call(this, ix, iy, d);
        }
    }

    mixin(DotMoveSystem.CharacterCollisionChecker, CharacterCollisionChecker_Mixin);
}


if (typeof DotMoveSystem !== "undefined") {
    if (!Game_Player.prototype.hasOwnProperty("checkCollisionTargetEvent")) {
        Game_Player.prototype.checkCollisionTargetEvent = function(x, y, d, event) {
            return Game_Character.prototype.checkCollisionTargetEvent.call(this, x, y, d, event);
        };
    }

    class Game_Player_DotMoveMixin extends Game_Player {
        static _checkCollisionTargetEvent = Game_Player.prototype.checkCollisionTargetEvent;

        checkCollisionTargetEvent(x: number, y: number, d: number, event: Game_Event): boolean {
            if (this.isThroughEvent()) return false;
            for (const tag of event.eventTags()) {
                if (this.isIncludeThroughEventTag(tag)) return false;
            }
            return Game_Player_DotMoveMixin._checkCollisionTargetEvent.call(this, x, y, d, event);
        }
    }

    mixin(Game_Player, Game_Player_DotMoveMixin);
}


if (typeof DotMoveSystem !== "undefined") {
    if (!Game_Follower.prototype.hasOwnProperty("checkCollisionTargetEvent")) {
        Game_Follower.prototype.checkCollisionTargetEvent = function(x, y, d, event) {
            return Game_Character.prototype.checkCollisionTargetEvent.call(this, x, y, d, event);
        };
    }

    class Game_Follower_DotMoveMixin extends Game_Follower {
        static _checkCollisionTargetEvent = Game_Follower.prototype.checkCollisionTargetEvent;

        checkCollisionTargetEvent(x: number, y: number, d: number, event: Game_Event): boolean {
            if (this.isThroughEvent()) return false;
            for (const tag of event.eventTags()) {
                if (this.isIncludeThroughEventTag(tag)) return false;
            }
            return Game_Follower_DotMoveMixin._checkCollisionTargetEvent.call(this, x, y, d, event);
        }
    }

    mixin(Game_Follower, Game_Follower_DotMoveMixin);
}


if (typeof DotMoveSystem !== "undefined") {
    if (!Game_Event.prototype.hasOwnProperty("checkCollisionTargetEvent")) {
        Game_Event.prototype.checkCollisionTargetEvent = function(x, y, d, event) {
            return Game_Character.prototype.checkCollisionTargetEvent.call(this, x, y, d, event);
        };
    }

    class Game_Event_DotMoveMixin extends Game_Event {
        static _checkCollisionTargetPlayer = Game_Event.prototype.checkCollisionTargetPlayer;
        static _checkCollisionTargetFollower = Game_Event.prototype.checkCollisionTargetFollower;
        static _checkCollisionTargetEvent = Game_Event.prototype.checkCollisionTargetEvent;

        checkCollisionTargetPlayer(x: number, y: number, d: number, player: Game_Player): boolean {
            if (this.isThroughPlayer()) return false;
            return Game_Event_DotMoveMixin._checkCollisionTargetPlayer.call(this, x, y, d, player);
        }

        checkCollisionTargetFollower(x: number, y: number, d: number, follower: Game_Follower): boolean {
            if (this.isThroughPlayer()) return false;
            return Game_Event_DotMoveMixin._checkCollisionTargetFollower.call(this, x, y, d, follower);
        }

        checkCollisionTargetEvent(x: number, y: number, d: number, event: Game_Event): boolean {
            if (this.isThroughEvent()) return false;
            for (const tag of event.eventTags()) {
                if (this.isIncludeThroughEventTag(tag)) return false;
            }
            return Game_Event_DotMoveMixin._checkCollisionTargetEvent.call(this, x, y, d, event);
        }
    }

    mixin(Game_Event, Game_Event_DotMoveMixin);
}


if (typeof DotMoveSystem === "undefined") {
    class Game_CharacterBase_NotDotMoveMixin extends Game_CharacterBase {
        isCollidedWithEvents(x: number, y: number): boolean {
            if (this.isThroughEvent()) return false;
            for (const event of $gameMap.eventsXyNt(x, y)) {
                let eventTagThrough = false;
                for (const tag of event.eventTags()) {
                    if (this.isIncludeThroughEventTag(tag)) {
                        eventTagThrough = true;
                        break;
                    }
                }
                if (eventTagThrough) continue;
                if (event.isNormalPriority()) return true;
            }
            return false;
        }
    }

    mixin(Game_CharacterBase, Game_CharacterBase_NotDotMoveMixin);
}

if (typeof DotMoveSystem === "undefined") {
    class Game_Event_NotDotMoveMixin extends Game_Event {
        static _isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;

        isCollidedWithPlayerCharacters(x: number, y: number): boolean {
            if (this.isThroughPlayer()) return false;
            return Game_Event_NotDotMoveMixin._isCollidedWithPlayerCharacters.call(this, x, y);
        }

        isCollidedWithEvents(x: number, y: number): boolean {
            if (this.isThroughEvent()) return false;
            for (const event of $gameMap.eventsXyNt(x, y)) {
                let eventTagThrough = false;
                for (const tag of event.eventTags()) {
                    if (this.isIncludeThroughEventTag(tag)) {
                        eventTagThrough = true;
                        break;
                    }
                }
                if (eventTagThrough) continue;
                return true;
            }
            return false;
        }
    }

    mixin(Game_Event, Game_Event_NotDotMoveMixin);
}
