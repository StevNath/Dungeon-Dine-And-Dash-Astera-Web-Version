/*!/*:ja
@target MZ
@plugindesc ARPG武器振りアニメーション v1.1.1
@author うなぎおおとろ
@base ARPG_Core

@help
ARPGプラグインに簡易的な武器振りアニメーション表示機能を導入するプラグインです。

【使用方法】
プラグインコマンド「武器アニメーション」を実行することで
キャラクターに武器振りアニメーションを表示することができます。

プラグインコマンドで指定する武器IDについてはデータベースの
「システム2」の[SV]攻撃にあるタイプのうち目的のものについて
1を先頭として順に上から数えた番号を指定してください。
例えば剣の場合、武器ID=2となります。

【必須プラグイン】
本プラグインを使用するには「ARPG_Core.js v1.4.0」以降が必要になります。
本プラグインの導入順については以下のように導入してください。
・DotMoveSystem.js
・DotMoveSystem_FunctionEx.js
・SelfVariable.js
・ARPG_Core.js
・ARPG_WeaponAnimation.js

@command WeaponAnimation
@text 武器アニメーション
@desc 武器アニメーションを表示します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg WeaponImageId
@type number
@text 武器画像ID
@default 2
@desc 武器画像IDを指定します。

@arg Wait
@text ウェイト
@type boolean
@default true
@desc trueを指定すると、アニメーション表示完了までウェイトします。

@arg SE
@text SE
@type struct<SE>
@default {"FileName":"","Volume":"90","Pitch":"100","Pan":"0"}
@desc 武器アニメーション再生時に表示するSEを指定します。
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
/*!/*~struct~SE:ja
@param FileName
@text SEファイル名
@type file
@dir audio/se
@desc
再生するSEのファイル名を指定します。

@param Volume
@text SE音量
@type number
@default 90
@desc
再生するSEのvolumeを指定します。

@param Pitch
@text SEピッチ
@type number
@default 100
@desc
再生するSEのpitchを指定します。

@param Pan
@text SE位相
@type number
@default 0
@desc
再生するSEのpanを指定します。
*/

import "./Sprite_Character";
import "./Spriteset_Map";
import "./Game_Character";
import "./Game_Interpreter";

declare global {
    interface Window {
        Sprite_SwordAnimation: any;
    }
}

import { Sprite_SwordAnimation } from "./Sprite_SwordAnimation";
import { PluginParamsParser } from "CommonLibrary/PluginParamsParser";

window.Sprite_SwordAnimation = Sprite_SwordAnimation;


export const ARPG_WeaponAnimationPluginName = document.currentScript ? decodeURIComponent((document.currentScript as HTMLScriptElement).src.match(/^.*\/(.+)\.js$/)![1]) : "ARPG_WeaponAnimation";

PluginManager.registerCommand(ARPG_WeaponAnimationPluginName, "WeaponAnimation", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);

    const se = {
        name: params.SE.FileName,
        volume: params.SE.Volume,
        pitch: params.SE.Pitch,
        pan: params.SE.Pan,
        pos: params.SE.Pos,
    };

    character.showWeaponMotion(params.WeaponImageId, se);
    if (params.Wait) {
        this._needAttackMotionWait = true;
    }
});
