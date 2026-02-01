/*!/*:ja
@target MZ
@plugindesc キャラクター画像拡張 v1.1.3
@author うなぎおおとろ
@help
キャラクター画像についてさまざまな拡張機能を導入するプラグインです。
このプラグインを使用することで以下の機能を使用することができるようになります。
・キャラクターの回転拡大縮小
・ピクチャ画像の使用
・色相の変更
・イベントのサブプライオリティ設定

【使用方法】
■ キャラクターの画像表示角度設定
イベントページの最初の注釈に
<angle: 表示角度>
と記載するとキャラクター画像の表示角度を指定した値にすることができます。

例: 90度の方を向かせる場合
<angle: 90>

■ キャラクター画像の左右反転
イベントページの最初の注釈に
<mirror>
と記載するとキャラクター画像を左右反転して表示します。

■ キャラクター拡大率の変更
イベントページの最初の注釈に
<scaleX: X軸の拡大率>
<scaleY: Y軸の拡大率>
と記載するとキャラクター画像を左右反転して表示します。

例: 1.5倍に拡大する場合
<scaleX: 1.5>
<scaleY: 1.5>

■ 回転/拡大縮小の原点の設定
イベントページの最初の注釈に
<anchorX: X軸の原点>
<anchorY: Y軸の原点>
と記載すると回転/拡大縮小を行う際の原点を設定することができます。

例: 中心を原点に設定する場合
<anchorX: 0.5>
<anchorY: 0.5>

なお、原点を設定しなかった場合、anchorX=0.5, anchorY=1がデフォルトで適用されます。

■ キャラクター画像の色調
イベントページの最初の注釈に
<tone: RED, GREEN, BLUE, GRAY>
と記載するとキャラクター画像の色調を変更することができます。

例: RED=255, GREEN=64, BLUE=64, GRAY=0 に変更する場合
<tone: 255, 64, 64, 0>

■ ピクチャ画像の表示
イベントページの最初の注釈に
<picture: 画像名>
と記載すると指定した画像を表示します。
画像名についてはプラグインパラメータ「登録画像一覧」で
登録した画像名を使用してください。

例: 画像名にActor1_2を指定した画像を指定する場合
<picture: Actor1_2>

また、注釈に以下のように記載することでピクチャを部分的に
表示することも可能です。
<pictureFrame X座標, Y座標, 横幅, 縦幅>

例: X座標=100, Y座標=100, 横幅=200, 縦幅=200 の範囲のみ表示する場合
<pictureFrame 100, 100, 200, 200>

■ アイコン画像の表示
イベントページの最初の注釈に
<iconIndex: アイコン番号>
と記載すると指定したアイコンを表示します。

例: アイコン番号100を指定する場合
<iconIndex: 100>

■ イベント表示サブプライオリティ機能
イベントの画面表示順(プライオリティ)は「通常キャラの下」「通常キャラと同じ」「通常キャラの上」の3種類が指定できますが、
サブプライオリティを指定することでプライオリティが同じ場合に更にどちらを優先するかを決めることができます。
サブプライオリティを指定する場合、イベントページの最初の注釈に
<subpri: サブプライオリティ値>
と記載します。
サブプライオリティを記載しなかった場合、デフォルトで100が適用されます。

例: サブプライオリティ値=110を設定する場合
<subpri: 110>

■ 注釈の設定を全てのイベントページに反映する
上記までの注釈の設定についてはイベントページごとに反映されますが、
1ページ目の最初の注釈に設定を記載したうえで以下の内容を併せて記載すると
全てのページに設定が反映されます。
<imageExAllPagesApply>

※ この設定を行った状態で1ページ目以外に注釈を設定するとその注釈の設定が優先されます。

■ プラグインコマンドからの注釈パラメータ変更
プラグインコマンドを使用することで注釈で指定したパラメータを変更することが可能です。
詳細は各プラグインコマンドを参照してください。
なお、プラグインコマンドで注釈パラメータを変更した場合、
以後そのパラメータについては注釈の設定は反映されなくなります。

■ キャラクターの回転
プラグインコマンド「回転開始」を実行すると指定したキャラクターを回転させることができます。
「回転停止」を実行するとキャラクターの回転を停止します。この状態で再び「回転開始」を実行すると
回転を再開します。元の状態に戻す場合は「回転停止」を実行したうえで「回転リセット」を
実行してください。


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


@command SetAngle
@text 角度設定
@desc キャラクターの表示角度を設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg Angle
@text 角度(直接指定)
@type number
@min 0
@max 359.99
@decimals 2
@default 0
@desc
直接指定を行う場合の角度を指定します。

@arg AngleByVariable
@text 角度(変数指定)
@type variable
@default 0
@desc
変数指定を行う場合の角度が格納された変数IDを指定します。


@command SetMirror
@text 左右反転設定
@desc キャラクターの左右反転を設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg Mirror
@text 反転
@type boolean
@default true
@desc
反転のON/OFFを設定します。


@command SetScale
@text 拡大率設定
@desc キャラクターの拡大率を開始します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg ScaleX
@text X軸拡大率(直接指定)
@type number
@min 0
@max 1
@decimals 2
@default 1
@desc
直接指定を行う場合のX軸方向の拡大率を指定します。

@arg ScaleXByVariable
@text X軸拡大率(変数指定)
@type variable
@default 0
@desc
変数指定を行う場合のX軸方向の拡大率が格納された変数IDを指定します。

@arg ScaleY
@text Y軸拡大率(直接指定)
@type number
@min 0
@max 1
@decimals 2
@default 1
@desc
直接指定を行う場合のX軸方向の拡大率を指定します。

@arg ScaleYByVariable
@text Y軸拡大率(変数指定)
@type variable
@default 0
@desc
変数指定を行う場合のY軸方向の拡大率が格納された変数IDを指定します。


@command SetAnchor
@text 原点設定
@desc キャラクターの表示原点を設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg X
@text 原点X座標(直接指定)
@type number
@min 0
@max 1
@decimals 2
@default 0.5
@desc
直接指定を行う場合の原点のX座標を指定します。

@arg XByVariable
@text 原点X座標(変数指定)
@type variable
@default 0
@desc
変数指定を行う場合の原点のX座標が格納された変数IDを指定します。

@arg Y
@text 原点Y座標(直接指定)
@type number
@min 0
@max 1
@decimals 2
@default 1
@desc
直接指定を行う場合の原点のY座標を指定します。

@arg YByVariable
@text 原点Y座標(変数指定)
@type variable
@default 0
@desc
変数指定を行う場合の原点のY座標が格納された変数IDを指定します。


@command SetTone
@text 色調設定
@desc キャラクターの色調を設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg Red
@text 赤
@type number
@min 0
@max 255
@default 0
@desc
色調の赤の数値を指定します。

@arg Green
@text 緑
@type number
@min 0
@max 255
@default 0
@desc
色調の緑の数値を指定します。

@arg Blue
@text 青
@type number
@min 0
@max 255
@default 0
@desc
色調の青の数値を指定します。

@arg Gray
@text グレー
@type number
@min 0
@max 255
@default 0
@desc
色調のグレーの数値を指定します。


@command SetPicture
@text ピクチャ設定
@desc キャラクターの表示ピクチャを設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg PictureName
@text 画像名
@type string
@desc
表示する画像名を指定します。画像名についてはプラグインパラメータ「登録画像一覧」で登録した画像名を使用してください。

@arg PictureFrame
@text ピクチャ表示枠
@type struct<PictureFrame>
@desc
ピクチャの表示枠を指定します。


@command SetSubPriority
@text 表示サブプライオリティ設定
@desc キャラクターの表示サブプライオリティを設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg SubPriority
@text サブプライオリティ(直接指定)
@type number
@min 0
@default 100
@desc
直接指定を行う場合のサブプライオリティを指定します。

@arg SubPriorityByVariable
@text サブプライオリティ(変数指定)
@type variable
@default 0
@desc
変数指定を行う場合のサブプライオリティが格納された変数IDを指定します。


@command StartRotation
@text 回転開始
@desc キャラクターの回転を開始します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg RotationSpeed
@text 回転速度
@type number
@default 4
@desc
回転速度を指定します。

@arg RotationDirection
@text 回転方向
@type select
@option 左
@value left
@option 右
@value right
@default right
@desc
回転方向を指定します。


@command StopRotation
@text 回転停止
@desc キャラクターの回転を停止します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。


@command ResetRotation
@text 回転リセット
@desc キャラクターの回転角度をリセットします。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。


@param RegisterImages
@text 登録画像一覧
@type struct<RegisterImage>[]
@default []
@desc
本プラグインで使用する画像ファイルを登録します。
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
/*!/*~struct~RegisterImage:ja
@param ImageName
@text 画像名
@type string
@desc
登録する画像名を指定します。ここで設定した名前を注釈などで使用します。

@param FileName
@text ファイル名
@type file
@dir img
@desc
画像のファイル名を指定します。
*/
/*!/*~struct~PictureFrame:ja
@param X
@text X座標
@type number
@min 0
@decimals 2
@default 0
@desc
X座標を指定します。

@param Y
@text Y座標
@type number
@min 0
@decimals 2
@default 0
@desc
Y座標を指定します。

@param Width
@text 横幅
@type number
@min 0
@decimals 2
@default 1
@desc
横幅を指定します。

@param Height
@text 縦幅
@type number
@min 0
@decimals 2
@default 1
@desc
縦幅を指定します。
*/

import { Degree } from "../CommonLibrary/Degree";
import { PluginParamsParser } from "../CommonLibrary/PluginParamsParser";
import { mixin } from "../CommonLibrary/mixin";

declare global {
    interface Game_CharacterBase {
        _angle?: number;
        _mirror?: boolean;
        _anchorX?: number;
        _anchorY?: number;
        _scaleX?: number;
        _scaleY?: number;
        _rotating?: boolean;
        _rotationSpeed?: number;
        _rotationDirection?: "left" | "right";
        _tone?: ToneType;
        _picture?: string;
        _pictureFrame?: Rectangle;
        _iconIndex?: number;
        _subPriority?: number;

        characterImageExTempData(): CharacterImageExTempData;
        angle(): number;
        setAngle(rotation: number): void;
        isMirror(): boolean;
        setMirror(mirror: boolean): void;
        startRotation(rotationSpeed?: number, rotationDirection?: "left" | "right"): void;
        stopRotation(): void;
        resetRotation(): void;
        anchorX(): number;
        setAnchorX(anchorX: number): void;
        anchorY(): number;
        setAnchorY(anchorY: number): void;
        scaleX(): number;
        setScaleX(scaleX: number): void;
        scaleY(): number;
        setScaleY(scaleY: number): void;
        tone(): ToneType | undefined;
        setTone(tone: ToneType | undefined): void;
        updateRotation(): void;
        picture(): string | undefined;
        setPicture(picture: string | undefined): void;
        pictureFrame(): Rectangle | undefined;
        setPictureFrame(pictureFrame: Rectangle | undefined): void;
        iconIndex(): number;
        setIconIndex(iconIndex: number): void;
        setSubPriority(subPriority: number): void;
        getSprite(): Sprite_Character | undefined;
        screenZ2(): number | undefined;
    }

    interface Game_Event {
        refreshImageEx(): void;
    }

    interface Game_Interpreter {
        findCharacterBySpecification(characterSpecification: any): Game_Character;
    }

    interface Game_Temp {
        _characterImageExTempDatas: Map<Game_CharacterBase, CharacterImageExTempData>;

        characterImageExTempData(character: Game_CharacterBase): CharacterImageExTempData;
        clearCharacterImageExTempDatas(): void;
    }

    interface Sprite_Character {
        character(): Game_CharacterBase;
    }
}

const CharacterImageExPluginName = document.currentScript ? decodeURIComponent((document.currentScript as HTMLScriptElement).src.match(/^.*\/(.+)\.js$/)![1]) : "CharacterImageEx";

export interface ICharacterImageExPluginParams {
    RegisterImages: {
        ImageName: string;
        FileName: string;
    }[];
}

export const CharacterImageExPluginParams: ICharacterImageExPluginParams = PluginParamsParser.parse(PluginManager.parameters(CharacterImageExPluginName));


const DEFAULT_SUB_PRIORITY = 100;

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


PluginManager.registerCommand(CharacterImageExPluginName, "SetAngle", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    const angle = params.AngleByVariable > 0 ? $gameVariables.value(params.AngleByVariable) : params.Angle;
    character.setAngle(angle);
});

PluginManager.registerCommand(CharacterImageExPluginName, "SetMirror", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    character.setMirror(!!params.Mirror);
});

PluginManager.registerCommand(CharacterImageExPluginName, "SetScale", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    const scaleX = params.ScaleXByVariable > 0 ? $gameVariables.value(params.ScaleXByVariable) : params.ScaleX;
    const scaleY = params.ScaleYByVariable > 0 ? $gameVariables.value(params.ScaleYByVariable) : params.ScaleY;
    character.setAnchorX(scaleX);
    character.setAnchorY(scaleY);
});

PluginManager.registerCommand(CharacterImageExPluginName, "SetAnchor", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    const x = params.XByVariable > 0 ? $gameVariables.value(params.XByVariable) : params.X;
    const y = params.YByVariable > 0 ? $gameVariables.value(params.YByVariable) : params.Y;
    character.setAnchorX(x);
    character.setAnchorY(y);
});

PluginManager.registerCommand(CharacterImageExPluginName, "SetTone", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    character.setTone([params.Red, params.Green, params.Blue, params.Gray]);
});

PluginManager.registerCommand(CharacterImageExPluginName, "SetPicture", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    character.setPicture(params.PictureName);
    const frame = new Rectangle(params.PictureFrame.X, params.PictureFrame.Y, params.PictureFrame.Width, params.PictureFrame.Height);
    character.setPictureFrame(frame);
});

PluginManager.registerCommand(CharacterImageExPluginName, "SetSubPriority", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    const subPriority = params.SubPriorityByVariable > 0 ? $gameVariables.value(params.SubPriorityByVariable) : params.SubPriority;
    character.setSubPriority(subPriority);
});

PluginManager.registerCommand(CharacterImageExPluginName, "StartRotation", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    character.startRotation(params.RotationSpeed, params.RotationDirection);
});

PluginManager.registerCommand(CharacterImageExPluginName, "StopRotation", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    character.stopRotation();
});

PluginManager.registerCommand(CharacterImageExPluginName, "ResetRotation", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    const character = this.findCharacterBySpecification(params.CharacterSpecification);
    character.resetRotation();
});


const REGISTERED_IMAGES: { [key: string]: string } = {};
for (const registerImage of CharacterImageExPluginParams.RegisterImages) {
    REGISTERED_IMAGES[registerImage.ImageName] = registerImage.FileName;
}


class CharacterImageExTempData {
    angle: number;
    mirror: boolean;
    anchorX: number;
    anchorY: number;
    scaleX: number;
    scaleY: number;
    tone?: ToneType;
    picture?: string;
    pictureFrame?: Rectangle;
    iconIndex: number;
    subPriority: number;

    constructor() {
        this.angle = 0;
        this.mirror = false;
        this.anchorX = 0.5;
        this.anchorY = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.tone = undefined;
        this.picture = undefined;
        this.pictureFrame = undefined;
        this.iconIndex = 0;
        this.subPriority = DEFAULT_SUB_PRIORITY;
    }
}


class Game_CharacterBase_Mixin extends Game_CharacterBase {
    static _update = Game_CharacterBase.prototype.update;
    static _characterName = Game_CharacterBase.prototype.characterName;

    characterImageExTempData(): CharacterImageExTempData {
        return $gameTemp.characterImageExTempData(this);
    }

    angle(): number {
        if (this._angle == null) return this.characterImageExTempData().angle;
        return this._angle;
    }

    setAngle(rotation: number) {
        this._angle = rotation;
    }

    isMirror(): boolean {
        if (this._mirror == null) return this.characterImageExTempData().mirror;
        return this._mirror;
    }

    setMirror(mirror: boolean) {
        this._mirror = mirror;
    }

    startRotation(rotationSpeed: number = 8, rotationDirection: "left" | "right" = "right"): void {
        this._rotating = true;
        this._rotationSpeed = rotationSpeed;
        this._rotationDirection = rotationDirection;
    }

    stopRotation(): void {
        this._rotating = false;
    }

    resetRotation(): void {
        this._angle = 0;
    }

    anchorX(): number {
        if (this._anchorX == null) return this.characterImageExTempData().anchorX;
        return this._anchorX;
    }

    setAnchorX(anchorX: number): void {
        this._anchorX = anchorX;
    }

    anchorY(): number {
        if (this._anchorY == null) return this.characterImageExTempData().anchorY;
        return this._anchorY;
    }

    setAnchorY(anchorY: number): void {
        this._anchorY = anchorY;
    }

    scaleX(): number {
        if (this._scaleX == null) return this.characterImageExTempData().scaleX;
        return this._scaleX;
    }

    setScaleX(scaleX: number): void {
        this._scaleX = scaleX;
    }

    scaleY(): number {
        if (this._scaleY == null) return this.characterImageExTempData().scaleY;
        return this._scaleY;
    }

    setScaleY(scaleY: number): void {
        this._scaleY = scaleY;
    }

    tone(): ToneType | undefined {
        if (this._tone == null) return this.characterImageExTempData().tone;
        return this._tone;
    }

    setTone(tone: ToneType | undefined): void {
        this._tone = tone;
    }

    update(): void {
        Game_CharacterBase_Mixin._update.call(this);
        if (this._rotating) this.updateRotation();
    }

    updateRotation() {
        let angle = new Degree(this.angle());
        if (this._rotationDirection === "right") {
            angle = angle.add(this._rotationSpeed!);
        } else {
            angle = angle.sub(this._rotationSpeed!);
        }
        this._angle = angle.value;
    }

    screenX() {
        const tw = $gameMap.tileWidth();
        return Math.floor(this.scrolledX() * tw + tw * this.anchorX());
    }

    screenY() {
        const th = $gameMap.tileHeight();
        return Math.floor(
            this.scrolledY() * th + th * this.anchorY() - this.shiftY() - this.jumpHeight()
        );
    }

    picture(): string | undefined {
        if (this._picture == null) return this.characterImageExTempData().picture;
        return this._picture;
    }

    setPicture(picture: string | undefined): void {
        this._picture = picture;
    }

    pictureFrame(): Rectangle | undefined {
        if (this._pictureFrame == null) return this.characterImageExTempData().pictureFrame;
        return this._pictureFrame;
    }

    setPictureFrame(pictureFrame: Rectangle | undefined): void {
        this._pictureFrame = pictureFrame;
    }

    iconIndex(): number {
        if (this._iconIndex == null) return this.characterImageExTempData().iconIndex;
        return this._iconIndex;
    }

    setIconIndex(iconIndex: number): void {
        this._iconIndex = iconIndex;
    }

    setSubPriority(subPriority: number): void {
        this._subPriority = subPriority;
    }

    getSprite(): Sprite_Character | undefined {
        if (!((SceneManager as any)._scene instanceof Scene_Map)) return undefined;
        const spriteset = (SceneManager as any)._scene._spriteset;
        return spriteset.findTargetSprite(this);
    }

    screenZ2(): number | undefined {
        if (this._subPriority == null) return this.characterImageExTempData().subPriority;
        return this._subPriority;
    }

    characterName(): string {
        const picture = this.picture();
        if (picture) return `picture:${picture}`;
        return Game_CharacterBase_Mixin._characterName.call(this);
    }

    static _characterIndex = Game_CharacterBase.prototype.characterIndex;
    characterIndex(): number {
        if (this.picture()) return 0;
        return Game_CharacterBase_Mixin._characterIndex.call(this);
    }
}

mixin(Game_CharacterBase, Game_CharacterBase_Mixin);


class Game_Character_Mixin extends Game_Character {
    static _update = Game_Character.prototype.update;

    update(): void {
        Game_Character_Mixin._update.call(this);
        if (this._rotating) this.updateRotation();
    }
}

mixin(Game_Character, Game_Character_Mixin);


class Game_Event_Mixin extends Game_Event {
    static _initMembers = Game_Event.prototype.initMembers;
    static _refresh = Game_Event.prototype.refresh;

    initMembers(): void {
        Game_Event_Mixin._initMembers.call(this);
    }

    refresh(): void {
        Game_Event_Mixin._refresh.call(this);
        this.refreshImageEx();
    }

    refreshImageEx(): void {
        if (this._pageIndex < 0) return;
        const valuesPage0 = this.getAnnotationValues(0);
        if (valuesPage0.imageExAllPagesApply) {
            this.applyImageExAnnotationValues(valuesPage0, false);
            if (this._pageIndex >= 1) {
                const values = this.getAnnotationValues(this._pageIndex);
                this.applyImageExAnnotationValues(values, true);
            }
        } else {
            if (this._pageIndex >= 1) {
                const values = this.getAnnotationValues(this._pageIndex);
                this.applyImageExAnnotationValues(values, false);
            } else {
                this.applyImageExAnnotationValues(valuesPage0, false);
            }
        }
    }

    private applyImageExAnnotationValues(values: { [key: string]: string }, update: boolean) {
        const tempData = this.characterImageExTempData();
        if (values.angle != null) {
            tempData.angle = parseFloat(values.angle);
        } else if (!update) {
            tempData.angle = 0;
        }
        if (values.mirror != null) {
            tempData.mirror = values.mirror === "true";
        } else if (!update) {
            tempData.mirror = false;
        }
        if (values.anchorX != null) {
            tempData.anchorX = parseFloat(values.anchorX);
        } else if (!update) {
            tempData.anchorX = 0.5;
        }
        if (values.anchorY != null) {
            tempData.anchorY = parseFloat(values.anchorY);
        } else if (!update) {
            tempData.anchorY = 1;
        }
        if (values.scaleX != null) {
            tempData.scaleX = parseFloat(values.scaleX);
        } else if (!update) {
            tempData.scaleX = 1;
        }
        if (values.scaleY != null) {
            tempData.scaleY = parseFloat(values.scaleY);
        } else if (!update) {
            tempData.scaleY = 1;
        }
        if (values.scaleY != null) {
            tempData.scaleY = parseFloat(values.scaleY);
        } else if (!update) {
            tempData.scaleY = 1;
        }
        if (values.tone != null) {
            tempData.tone = JSON.parse(`[${values.tone}]`);
        } else if (!update) {
            tempData.tone = undefined;
        }
        if (values.picture != null) {
            tempData.picture = values.picture.replace(/^\s+/, "");
        } else if (!update) {
            tempData.picture = undefined;
        }
        if (values.pictureFrame != null) {
            tempData.pictureFrame = new Rectangle(...JSON.parse(`[${values.pictureFrame}]`));
        } else if (!update) {
            tempData.pictureFrame = undefined;
        }
        if (values.iconIndex != null) {
            tempData.iconIndex = parseInt(values.iconIndex);
        } else if (!update) {
            tempData.iconIndex = 0;
        }
        if (values.subpri != null) {
            tempData.subPriority = parseInt(values.subpri);
        } else if (!update) {
            tempData.subPriority = DEFAULT_SUB_PRIORITY;
        }
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


class Game_Temp_Mixin extends Game_Temp {
    static _initialize = Game_Temp.prototype.initialize;

    initialize() {
        Game_Temp_Mixin._initialize.call(this);
        this._characterImageExTempDatas = new Map();
    }

    characterImageExTempData(character: Game_CharacterBase): CharacterImageExTempData {
        let tempData = this._characterImageExTempDatas.get(character);
        if (tempData) return tempData;
        tempData = new CharacterImageExTempData();
        this._characterImageExTempDatas.set(character, tempData);
        return tempData;
    }

    clearCharacterImageExTempDatas(): void {
        this._characterImageExTempDatas = new Map();
    }
}

mixin(Game_Temp, Game_Temp_Mixin);


class Sprite_Character_Mixin extends Sprite_Character {
    static _initMembers = Sprite_Character.prototype.initMembers;
    static _update = Sprite_Character.prototype.update;
    static _createHalfBodySprites = Sprite_Character.prototype.createHalfBodySprites;
    static _updateBitmap = Sprite_Character.prototype.updateBitmap;
    static _isImageChanged = Sprite_Character.prototype.isImageChanged;
    static _updateFrame = Sprite_Character.prototype.updateFrame;
    static _isEmptyCharacter = Sprite_Character.prototype.isEmptyCharacter;
    static _updateHalfBodySprites = Sprite_Character.prototype.updateHalfBodySprites;

    z2?: number;
    protected _toneFilter?: ColorFilter;
    protected _pictureImageName?: string;
    protected _iconIndex!: number;
    protected _pictureFrame?: Rectangle;

    initMembers(): void {
        Sprite_Character_Mixin._initMembers.call(this);
        this._iconIndex = 0;
    }

    character(): Game_CharacterBase {
        return this._character!;
    }

    update(): void {
        Sprite_Character_Mixin._update.call(this);
        this.updateAnchor();
        this.updateRotate();
        this.updateScale();
        this.updateTone();
        this.updateZ2();
    }

    createHalfBodySprites(): void {
        Sprite_Character_Mixin._createHalfBodySprites.call(this);
        this._upperBody!.anchor.x = 0.5;
        this._upperBody!.anchor.y = 1;
        this._lowerBody!.anchor.x = 0.5;
        this._lowerBody!.anchor.y = 0;
    }

    updateHalfBodySprites() {
        Sprite_Character_Mixin._updateHalfBodySprites.call(this);
        if (this._bushDepth > 0) {
            const halfBodyPos = this.calcHalfBodyPos();
            this._upperBody!.x = halfBodyPos.x;
            this._upperBody!.y = halfBodyPos.y;
            this._lowerBody!.x = halfBodyPos.x;
            this._lowerBody!.y = halfBodyPos.y;
        }
    }

    calcHalfBodyPos(): Point {
        const tw = $gameMap.tileWidth();
        const th = $gameMap.tileHeight();
        const atx = 0.5;
        const aty = 1.0 - (this._bushDepth / th);
        const x = (atx - this._character!.anchorX()) * tw;
        const y = (aty - this._character!.anchorY()) * th;
        return new Point(x, y);
    }

    protected updateRotate(): void {
        // NOTE: PIXI.jsではr=0が上方向になるため、それに合わせて変換する。
        this.rotation = new Degree(this._character!.angle() + 90).toRad();
    }

    protected updateAnchor(): void {
        this.anchor.x = this._character!.anchorX();
        this.anchor.y = this._character!.anchorY();
    }

    protected updateScale(): void {
        if (this._character!.isMirror()) {
            this.scale.x = -this._character!.scaleX();
        } else {
            this.scale.x = this._character!.scaleX();
        }
        this.scale.y = this._character!.scaleY();
    }

    protected updateTone(): void {
        const tone = this._character!.tone();
        if (tone) {
            if (this._toneFilter == null) {
                if (this.filters == null) this.filters = [];
                this._toneFilter = new ColorFilter();
                this.filters.push(this._toneFilter);
            }
            this._toneFilter.setColorTone(tone);
        } else {
            if (this._toneFilter) {
                this.filters = this.filters.filter(filter => filter !== this._toneFilter);
                this._toneFilter = undefined;
            }
        }
    }

    updateBitmap(): void {
        if (this.isImageChanged()) {
            this._tilesetId = $gameMap.tilesetId();
            this._tileId = this._character!.tileId();
            this._characterName = this._character!.characterName();
            this._characterIndex = this._character!.characterIndex();
            this._pictureImageName = this._character!.picture();
            this._iconIndex = this._character!.iconIndex();
            if (this._character!.picture()) {
                this.setPictureBitmap();
            } else if (this._character!.iconIndex() > 0) {
                this.setIconBitmap();
            } else if (this._tileId > 0) {
                this.setTileBitmap();
            } else {
                this.setCharacterBitmap();
            }
        }
    }

    isImageChanged(): boolean {
        const result = Sprite_Character_Mixin._isImageChanged.call(this);
        if (result) return true;
        if (this._pictureImageName !== this._character!.picture()) return true;
        if (this._iconIndex !== this._character!.iconIndex()) return true;
        return false;
    }

    updateZ2(): void {
        this.z2 = this._character?.screenZ2();
    }

    setPictureBitmap() {
        const pictureImageName = this._character!.picture();
        if (pictureImageName) {
            const fileName = REGISTERED_IMAGES[pictureImageName];
            this.bitmap = ImageManager.loadBitmap("img/", fileName);
        }
    }

    setIconBitmap() {
        if (this._character!.iconIndex() > 0) {
            this.bitmap = ImageManager.loadSystem("IconSet");
        }
    }

    updateFrame() {
        if (this._character!.picture()) {
            const pictureFrame = this._character!.pictureFrame();
            if (pictureFrame) {
                this.setFrame(pictureFrame.x, pictureFrame.y, pictureFrame.width, pictureFrame.height);
            } else {
                this.setFrame(0, 0, this.bitmap.width, this.bitmap.height);
            }
        } else if (this._character!.iconIndex() > 0) {
            const iconIndex = this._character!.iconIndex();
            const pw = ImageManager.iconWidth;
            const ph = ImageManager.iconHeight;
            const sx = (iconIndex % 16) * pw;
            const sy = Math.floor(iconIndex / 16) * ph;
            this.setFrame(sx, sy, pw, ph);
        } else {
            Sprite_Character_Mixin._updateFrame.call(this);
        }
    }

    updateVisibility() {
        Sprite.prototype.updateVisibility.call(this);
        if (this.isEmptyCharacter() || this._character!.isTransparent()) {
            this.visible = false;
        }
    }

    isEmptyCharacter() {
        const result = Sprite_Character_Mixin._isEmptyCharacter.call(this);
        if (!result) return false;
        if (this._pictureImageName) return false;
        if (this._iconIndex != null && this._iconIndex > 0) return false;
        return true;
    }
}

mixin(Sprite_Character, Sprite_Character_Mixin);


class Scene_Map_Mixin extends Scene_Map {
    static _start = Scene_Map.prototype.start;

    start(): void {
        Scene_Map_Mixin._start.call(this);
        $gameTemp.clearCharacterImageExTempDatas();
        for (const event of $gameMap.events()) {
            event.refreshImageEx();
        }
    }
}

mixin(Scene_Map, Scene_Map_Mixin);


class Tilemap_Mixin extends Tilemap {
    _compareChildOrder(a: { y: number, z: number, spriteId: number, z2?: number }, b: { y: number, z: number, spriteId: number, z2?: number }) {
        const aZ1 = a.z ?? 255;
        const bZ1 = b.z ?? 255;
        const aZ2 = a.z2 ?? DEFAULT_SUB_PRIORITY;
        const bZ2 = b.z2 ?? DEFAULT_SUB_PRIORITY;
        if (aZ1 !== bZ1) {
            return aZ1 - bZ1;
        } else if (aZ2 !== bZ2) {
            return aZ2 - bZ2;
        } else if (a.y !== b.y) {
            return a.y - b.y;
        } else {
            return a.spriteId - b.spriteId;
        }
    }
}

mixin(Tilemap, Tilemap_Mixin);
