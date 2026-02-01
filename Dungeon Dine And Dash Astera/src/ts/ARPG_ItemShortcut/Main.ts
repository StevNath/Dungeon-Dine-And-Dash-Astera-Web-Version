/*!/*:ja
@target MZ
@plugindesc ARPGショートカット v1.4.0
@author うなぎおおとろ
@base ARPG_Core

@help
ARPGプラグインにアイテムショートカット機能を導入するプラグインです。

【使用方法】
■ プラグインの機能
アイテムまたはスキル一覧から項目を選択するとショートカットに登録することが可能です。
ショートカットに登録するとマップ上のショートカットに反映されます。

登録したアイテム/スキルはCキーで使用することができます。
ショートカットの切り替えはLボタンまたはRボタンで行うことが可能です。

登録したショートカットについては、ショートカット登録画面でSHIFTキーを
押すことによって削除することができます。

■ パーティが複数人数の場合の仕様
・ショートカットの状態はアクターごとに保持されます。
・スキルのショートカット登録は先頭のアクターのみ可能です。

■ プラグインの導入方法
このプラグインは導入するだけで使用可能です。

【必須プラグイン】
本プラグインを使用するには「ARPG_Core.js v1.4.0」以降が必要になります。
本プラグインの導入順については以下のように導入してください。
・DotMoveSystem.js
・DotMoveSystem_FunctionEx.js
・SelfVariable.js
・ARPG_Core.js
・ARPG_ItemShortcut.js

@command ChangeShortcutEnableOrDisable
@text ショートカット有効/無効切り替え
@desc マップ上でのショートカット表示の有効/無効を切り替えます。

@arg EnableOrDisable
@text 有効/無効
@type boolean
@on 有効
@off 無効
@default true
@desc
有効または無効を選択します。


@command ClearShortcut
@text ショートカットクリア
@desc 指定したアクターのショートカットをクリアします。

@arg ActorId
@text アクターID
@type actor
@default 1
@desc ショートカットクリア対象のアクターを指定します。


@command UseShortcutItem
@text ショートカットアイテム使用
@desc マップ上で現在選択されているショートカットアイテムを使用します。


@param NumShortcutSlots
@text ショートカットスロット数
@type number
@min 1
@default 6
@desc
ショートカットのスロット数を指定します。

@param Text
@text テキスト
@type struct<Text>
@default {"UseItem":"使用する","RegisterShortcut":"ショートカットへ登録する"}
@desc
ゲーム中で使用する各種テキストを登録します。

@param KeySetting
@text キー入力設定
@type struct<KeySetting>
@default {"UseShortcutItem":"{\"KeyName\":\"other\",\"KeySymbol\":\"C\",\"KeyCodes\":\"[\\\"67\\\"]\",\"ButtonIndexes\":\"[\\\"7\\\"]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}"}
@desc
キー入力の各種設定を行います。
*/
/*!/*~struct~KeySetting:ja
@param UseShortcutItem
@text ショートカット使用キー
@type struct<Key>
@default {"KeyName":"other","KeySymbol":"C","KeyCodes":"[\"67\"]","ButtonIndexes":"[\"7\"]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
ショートカット使用キーを設定します。
*/
/*!/*~struct~Key:ja
@param KeyName
@text キー名
@type select
@option 決定
@value ok
@option キャンセル
@value escape
@option メニュー
@value menu
@option シフト
@value shift
@option 下
@value down
@option 左
@value left
@option 右
@value right
@option 上
@value up
@option ページアップ
@value pageup
@option ページダウン
@value pagedown
@option その他
@value other
@option 未割り当て
@value unassigned
@default ok
@desc
キーを指定します。

@param KeySymbol
@text キーシンボル
@type string
@desc
キーをその他に選択した場合のキーシンボルを指定します。使用しない場合は空欄にしてください。

@param KeyCodes
@text キーコード一覧
@type number[]
@default []
@desc
キーをその他に選択した場合に割り当てるキーコードを全て指定します。

@param ButtonIndexes
@text ボタンインデックス一覧
@type number[]
@default []
@desc
キーをその他に選択した場合に割り当てるボタンのインデックスを全て指定します。

@param KeyCode
@text キーコード(廃止予定)
@type number
@min -1
@default -1
@desc
キーをその他に選択した場合のキーコードを指定します。キーボードを使用しない場合は-1を指定してください。

@param ButtonIndex
@text ボタンインデックス(廃止予定)
@type number
@min -1
@default -1
@desc
キーをその他に選択した場合のボタンのインデックスを指定します。ゲームパッドを使用しない場合は-1を指定してください。
*/
/*!/*~struct~Text:ja
@param UseItem
@text アイテム使用
@type string
@default 使用する
@desc
アイテム使用時のテキストを指定します。

@param RegisterShortcut
@text ショートカット登録
@type string
@default ショートカットへ登録する
@desc
ショートカット登録時のテキストを指定します。
*/

import "./Scene_Map";
import "./Scene_Item";
import "./Scene_Skill";
import "./Game_Map";
import "./Spriteset_Map";
import "./Window_SkillList";
import "./Window_ItemList";
import "./PlayerBehavior";
import "./DataManager";
import { ShortcutStatus } from "./ShortcutStatus";
import { ARPG_Battler } from "ARPG_Core/ARPG_Battler";
import { PluginParamsParser } from "CommonLibrary/PluginParamsParser";
import { ARPG_Utils } from "ARPG_Core/ARPG_Utils";
import { ShortcutTempData } from "ShortcutTempData";

declare global {
    var $shortcutStatus: ShortcutStatus;
    var $shortcutTempData: ShortcutTempData;

    interface Window {
        $shortcutStatus: ShortcutStatus;
        $shortcutTempData: ShortcutTempData;
        useItemShortcut: boolean;
    }
}


export const ARPG_ItemShortcutPluginName = document.currentScript ? decodeURIComponent((document.currentScript as HTMLScriptElement).src.match(/^.*\/(.+)\.js$/)![1]) : "ARPG_ItemShortcut";

export interface IARPG_ItemShortcutPluginParams {
    KeySetting: {
        UseShortcutItem: {
            KeyName: string;
            KeySymbol: string;
            KeyCode: number;
            ButtonIndex: number;
        };
    };
    NumShortcutSlots: number;
    Text: {
        UseItem: string;
        RegisterShortcut: string;
    };
}

export const ARPG_ItemShortcutPluginParams: IARPG_ItemShortcutPluginParams = PluginParamsParser.parse(PluginManager.parameters(ARPG_ItemShortcutPluginName));

if (ARPG_ItemShortcutPluginParams.KeySetting.UseShortcutItem != null) {
    ARPG_Utils.registerKey("UseShortcutItem", ARPG_ItemShortcutPluginParams.KeySetting.UseShortcutItem);
}

window.useItemShortcut = true;

PluginManager.registerCommand(ARPG_ItemShortcutPluginName, "ClearShortcut", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    $shortcutStatus.clear(params.ActorId);
});

PluginManager.registerCommand(ARPG_ItemShortcutPluginName, "ChangeShortcutEnableOrDisable", function(this: Game_Interpreter, args: any) {
    const params = PluginParamsParser.parse(args);
    if (params.EnableOrDisable) {
        $shortcutStatus.enableItemShortcut();
    } else {
        $shortcutStatus.disableItemShortcut();
    }
});

PluginManager.registerCommand(ARPG_ItemShortcutPluginName, "UseShortcutItem", function(this: Game_Interpreter, args: any) {
    $shortcutTempData.requestUseShortcutItem();
});


ARPG_Battler.prototype.requestRefreshShortcutWindowHook = function() {
    $shortcutTempData.requestRefreshShortcutWindow();
};
