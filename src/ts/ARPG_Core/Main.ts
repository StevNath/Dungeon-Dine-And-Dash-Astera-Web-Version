/*!/*:ja
@target MZ
@plugindesc ARPGコア v1.6.3
@author うなぎおおとろ

@help
【概要】
本プラグインはツクールMZのシステムをARPGに変換する機能を提供します。

■ 特徴
本プラグインはアクションRPGに必要なプレイヤーやエネミーのステータス管理、
当たり判定の設定、攻撃処理の設定といった機能を提供します。

ダメージを与えるオブジェクト(剣による斬撃や弾の発射など)は全てイベントを動的に設定することで
実現します。このため、非常にカスタマイズ性の高いプラグインになっています。

また、ダメージを受けた場合の処理などもコモンイベントによって作成することが可能です。
例えば、サンプルゲームではダメージを受けた場合、キャラクターがダメージを受けた方向にノックバックしますが、
これはコモンイベントからキャラクター吹き飛ばし用のプラグインコマンドを実行することで実現しています。
この機能を活用すれば、例えば連続して攻撃を当てた場合のみ吹き飛ばすといったコンボ的なシステムを導入することも可能です。

また、本プラグインではドット移動プラグインの上に構築していますので、あらゆるキャラクターの移動を
ドット単位で制御でき、非常にアクション性の高いゲームを作ることが可能です。
例えば敵キャラとプレイヤーの角度を計算し、その方向に向けて弾を飛ばすことで、
プレイヤーを追撃する攻撃なども実現できます。

■ 依存プラグイン
本プラグインの導入に当たっては以下のプラグインを必須とします。

・ドット移動システム(DotMoveSystem.js)
キャラクターをドット単位で制御するために使用します。

・ドット移動機能拡張プラグイン(DotMoveSystem_FunctionEx.js)
ドット移動システム本体に様々な拡張機能を追加するプラグインです。

・セルフ変数プラグイン(SelfVariable.js)
セルフ変数や拡張セルフスイッチ、コモンイベント変数/スイッチを提供するプラグインです。
ARPGコアでは様々なゲーム中でのフラグを自動的にセルフ変数として
イベントに設定することがありますので(スキルを使用したユーザーのIDなど)、
そのために使用します。

これらの依存プラグインを含めた本プラグインの導入順については以下のように導入してください。
・DotMoveSystem.js
・DotMoveSystem_FunctionEx.js
・SelfVariable.js
・ARPG_Core.js

【機能詳細】
[全般]
■ ARPGモードの開始と終了
プラグインコマンドの「ARPGモード切り替え」でONを設定するとARPGモードを開始します。
OFFにした場合はARPGモードを終了します。
ARPGモードになるとフィールドでの敵との戦闘が可能になります。
現在のARPGモードがONであるかはプラグインパラメータ「ARPGモードスイッチ」で
設定したスイッチによって確認することができます。

※注意1: マップを移動した場合、ARPGモードは自動的にOFFに切り替わります。
※注意2: ARPGモードスイッチを変更しても効果はありません。ARPGモードの切り替えは
必ずこのコマンドによって行う必要があります。
※注意3: ARPG戦闘中はセーブを行うことができません。


[コピーイベント/動的イベント関連]
■ イベントのコピー
イベントのメモ欄に以下のように記述すると、プラグインパラメータで指定した
動的イベントコピー元マップの一覧から指定したイベントをコピーします。
<cp: コピー元イベント名前またはイベントID>

また、以下のように記述することでコピー元のマップを限定することも可能です。
<cp: コピー元マップID,コピー元イベント名前またはイベントID>

※注意: コピー元となるマップのIDについては全てプラグインパラメータ
       「コピーイベント共通設定/動的イベント生成元マップID一覧」に設定する必要があります。

■ 動的イベントの生成
プラグインコマンド「動的イベント生成」を実行することで動的にイベントを生成することができます。
動的イベントのコピー元となるイベントはプラグインパラメータ「動的イベント生成元マップID一覧」に
登録されたマップに配置する必要があります。

■ 動的イベントの削除
生成した動的イベントはイベントコマンド「イベントの一時消去」を
実行することで完全に消去されます。


[アクター関連]
■ ガードについて
ARPG戦闘中にAキーを押している間、プレイヤーはガードを行います。
ガード中にプレイヤーの向きと反対方向から攻撃を受けた場合、ガード中であればダメージを半減します。
また、攻撃をガードする直前でガードした場合はジャストガードとなり、ダメージを完全に無力化します。

ガード成功判定に使用する攻撃の方向については「スキルオブジェクトの攻撃角度」を参照してください。

ガード機能を使用しない場合、プラグインパラメータ「キー共通設定/アクターガードキー」の
キー名を「未割り当て」に設定してください。

また、ガード機能は使用するがジャストガードを使用しない場合、
ジャストガードのフレーム数に0を設定してください。

■ プラグインコマンドによるガード設定
ガードはAキーを押す以外にもプラグインコマンドを実行してガードさせることも可能です。
プラグインコマンド「プレイヤーガードモード設定」でガードモードをONに設定すると、
その間はガードした状態になります。OFFに設定するとガードを解除します。
この機能は主にキーボードやゲームパッドがない環境でガードを行うことを想定しています。

■ アクター切り替え
Sキーを押すと、プレイヤーのアクターを切り替えることができます。
この機能はARPGモードのON/OFFにかかわらず使用可能です。

また、プラグインコマンド「操作アクター変更」を実行することでも
アクターの切り替えが可能です。

プラグインパラメータ「操作アクター変更許可スイッチID」で設定した
スイッチがOFFになるとキー入力によるアクター切り替えが無効になります。
プラグインコマンドによる操作アクターの変更はスイッチのON/OFFにかかわらず
使用することが可能です。

※注意: アクターが攻撃中またはダメージを受けている途中の場合は
アクターを切り替えることはできません。また、アクターの切り替えができない間は
メニュー画面の並び替え機能も使用できません。


[エネミー関連]
■ 敵キャラの設定について
敵キャラのイベント内において、並列処理、または自動実行によって
プラグインコマンド「エネミー設定」を実行することで、それを実行したイベントは
敵キャラとして扱われます。
なお、「エネミー設定」は必ずARPGモードがONの場合に実行してください。

敵キャラ設定時に引数で「衝突攻撃スキルID」「敵撃破コモンイベントID」
「エネミーダメージコモンイベントID」を設定することができますが、
これらの値に0を指定した場合、プラグインパラメータ「エネミー共通設定」
にある同一名のパラメータの値が適用されます。

■ 敵キャラのHP表示
プラグインコマンド「エネミー設定」で「HPゲージ」を設定することで、敵キャラのHPを表示することが可能です。
"ノーマル"を設定した場合、敵キャラに直接HPゲージを表示します。
"ボス"を設定した場合、画面上部に大きなHPゲージを表示します。


[スキル関連]
■ スキルの作成
スキルのメモ欄に<action: コモンイベント名またはID>と記載すると、
そのスキルを実行したときに該当のコモンイベントが呼び出されます。
このコモンイベントのことを「アクションコモンイベント」といいます。
アクションコモンイベント内では、プラグインコマンド「スキル発動」を実行することで、
スキルを発動し、MPあるいはTPの消費が行われます。

この状態で、「スキルオブジェクト生成」を行うことで、スキルオブジェクトが生成されます。
スキルオブジェクトとは、バトラーに当たるとダメージを与えたりHPを回復させたりなど
スキルの効果をバトラーに与えることができるイベントのことです。
シューティングゲームでプレイヤーや敵キャラが発射した弾がスキルオブジェクトと考えると
イメージがつきやすいかと思います。
スキルオブジェクトがバトラーに衝突した場合、スキルで設定した効果が衝突したバトラーに適用されます。
なお、スキルオブジェクトの当たり判定についてはデフォルトではスキルオブジェクトとした
イベントのサイズがそのまま当たり判定となりますが、以下の「■ 当たり判定の設定」
の手順によって自由に当たり判定をカスタマイズすることが可能です。

「スキル発動」を実行しなかった場合、MP/TPの消費は行われません。これを利用して
スキルアクションのコモンイベント実行時にスキル発動条件が成立(例えば近くに敵キャラがいるか等)しなかった場合は
スキルを実行しないといったようなことも実現可能です。

※注意: スキル発動を行わずにスキルオブジェクト生成を行うことはできません。行った場合はエラーが表示されます。

■ アクションコモンイベント内で使用可能なコモンイベント変数
スキル使用時に実行されるコモンイベントでは「ユーザー種別格納コモンイベント変数」と
「ユーザーイベントID格納コモンイベント変数」を使用することができます。

ユーザー種別格納コモンイベント変数にはアクションコモンイベントを実行したユーザーとなる
キャラクターの種別が自動的に格納されます。

ユーザーイベントID格納コモンイベント変数にはアクションコモンイベントを実行したユーザーとなる
キャラクターがイベントだった場合にイベントIDが自動的に格納されます。

この2つを組み合わせることで各種プラグインコマンドのキャラクター指定引数にて
スキルを使用したキャラクターを指定することができるようになります。

※ これらの変数は必ずコモンイベント変数としてください。

■ アクションコモンイベントにコモンイベント変数/スイッチの値を渡す
スキルのメモ欄に以下のように記述することで、指定したアクションコモンイベント実行時に
予め値を設定しておくことが可能です。
・コモンイベント変数を設定する場合
<set-var 変数ID, 値>
(例) ID=10の変数に値100を設定する
<set-var 10, 100>

・コモンイベントスイッチを設定する場合
<set-sw スイッチID, 値>
(例) ID=10のスイッチをONに設定する
<set-sw 10>

※ これらの変数/スイッチは必ずコモンイベント変数またはコモンイベントスイッチとしてください。
※ 本機能はARPG_Core v1.4.0より追加されました。

■ スキルオブジェクトとして生成したイベント内で使用可能なセルフ変数
プラグインコマンド「スキルオブジェクト生成」によって生成されたイベントでは
セルフ変数「スキルオブジェクトユーザー種別格納セルフ変数」と
「スキルオブジェクトユーザーイベントID格納セルフ変数」を使用することができます。

スキルオブジェクトユーザー種別格納セルフ変数にはスキルオブジェクト生成を実行した
ユーザーとなるキャラクターの種別が格納されます。

スキルオブジェクトユーザーイベントID格納セルフ変数にはスキルオブジェクト生成を実行した
ユーザーとなるキャラクターがイベントだった場合にイベントIDが格納されます。

※ これらの変数は必ずセルフイベント変数としてください。

■ ダメージを受けた時に使用中のスキルをキャンセルする
プラグインコマンド「ダメージスキルキャンセル有効/無効切り替え」を有効に設定すると、
ダメージを受けた時にスキルがキャンセルされ、スキルコモンイベントを強制終了します。

また、プラグインコマンド「スキル発動」で詠唱コモンイベントIDを指定すると、
スキル発動までそのコモンイベントを実行し、その間はダメージによるスキルキャンセルが有効になります。
「ダメージスキルキャンセル有効/無効切り替え」でも同様のことは実現できますが、
スキル詠唱が目的の場合はこちらを利用した方がシンプルです。

※スキルキャンセルとする最大HPダメージ比率はプラグインコマンド「バトラーARPGパラメータ設定」で
「スキルキャンセルダメージレート」を設定することによって変更可能です。
設定しなかった場合は1ダメージでも受けるとスキルキャンセルとなります。

■ スキル完了、またはキャンセル時の移動速度の差し戻し
スキルを発動したとき、移動速度などのデータが保持されます。
保持されたデータはスキル完了、またはキャンセル時に復元されます。
この機能を使用することで例えば攻撃モーションのキャンセル時などに
移動速度などを元に戻すことを意識する必要がなくなります。

スキル発動時に保持されるデータは以下の通りとなります。
・移動速度
・キャラクターの画像およびインデックス
・向き固定有無

※ 本機能はARPG_Core v1.4.0より追加されました。

■ スキルオブジェクトの攻撃角度
スキルオブジェクトに対してプラグインコマンド「攻撃角度指定」を実行することで
スキルオブジェクトに攻撃角度を設定することが可能です。
ここで設定した攻撃角度はガード時にスキルオブジェクトの方を向いているかの
判定を行う用途に使用されます。

また、ここで設定された値はダメージを受けた時に実行されたコモンイベント内で
コモンイベント変数「ダメージ角度格納コモン変数」を読みだすことで取得することが可能です。
これをプラグインコマンド「キャラクター吹き飛ばし」と組み合わせることで
ダメージを受けた方向にキャラクターを吹き飛ばすといったことが実現可能です。

■ スキルオブジェクトの位置と使用者の移動を連動させる
スキルオブジェクトに対してプラグインコマンド「スキルオブジェクト使用者位置同期」を実行することで
スキルオブジェクトの位置と使用者の移動を連動させることができます。
この機能を使用することで例えばダッシュしながら攻撃するといったことも可能になります。

■ スキル効果の適用
スキル発動後、プラグインコマンド「スキル効果適用」を実行すると、
該当のスキルの効果を使用者に適用することができます。
※ スキルのダメージのみが適用されます。使用効果は適用されません。

また、プラグインコマンド「スキル効果適用テスト」を実行した場合、
スキル効果の適用が可能であるかを事前にチェックすることができます。
この機能を使うことで例えばHP満タンの場合は回復アイテムは
使用できないといったことが実現可能です。

■ スキル発動時のスキル名表示
スキルのメモ欄に以下のように記載することでスキル発動時に
ポップアップウィンドウを表示することができます。
この場合、スキルの"メッセージ"で設定したテキストが表示されます。
<showSkillName>

■ ダメージを受けた時の無敵時間の設定
スキルのメモ欄に以下のように記載することでスキルによる
ダメージを受けた時の無敵時間を設定することができます。
<noDamageFrame: 無敵時間>

例: 無敵時間を60フレームに設定する場合
<noDamageFrame: 60>

※ この設定を省略した場合、無敵時間は30フレームになります。

■ スキル使用後の攻撃禁止時間の設定
スキルのメモ欄に以下のように記載することでスキル使用後の
攻撃禁止時間を設定することができます。
<noAttackFrame: 攻撃禁止時間>

例: 攻撃禁止時間を120フレームに設定する場合
<noAttackFrame: 120>

※ この設定を省略した場合、攻撃禁止時間は60フレームになります。

■ スキル発動時の慣性移動キャンセルの指定
スキルのメモ欄に以下のように記載することでスキル発動時に
慣性移動をキャンセルすることができます。
<cancelAcceleration: true>

以下のように設定した場合はスキル発動後もそのまま慣性移動を行います。
<cancelAcceleration: false>

※ この設定を省略した場合、慣性移動キャンセルは有効になります。

■ スキル発動時の移動禁止の指定
スキルのメモ欄に以下のように記載することでスキル発動時に
移動を禁止することができます。
<disableMove: true>

以下のように設定した場合はスキル発動後もそのまま慣性移動を行います。
<disableMove: false>

※ この設定を省略した場合、移動禁止は有効になります。
※ 禁止するのはキーまたはタッチによるプレイヤー移動および自律移動のみとなります。
   イベントコマンドからの移動は禁止されません。

■ キャラクター衝突時のダメージ判定用スキルの上書き
スキルのメモ欄に以下のように記載することでスキル使用中に
敵と衝突した場合に敵にダメージを与えるスキルを使用したもので上書きすることができます。
<overwriteCollideAttack>

なお、上書きした場合はスキル終了時に自動的に元の設定に戻ります。


[フィールドオブジェクト関連]
■ フィールドオブジェクト
フィールドオブジェクトとはプレイヤーでもエネミーでもないが当たり判定が設定可能な
オブジェクトのことを指します。剣で破壊可能な草や、矢が当たるとONになるスイッチなどを
想定しています。
フィールドオブジェクトの当たり判定は「ダメージ判定」または「カスタム判定」を設定することができます。
当たり判定判定の詳細については「■ 当たり判定の設定」を参照してください。

■ フィールドオブジェクトのダメージ処理
フィールドオブジェクトに「ダメージ判定」を設定すると、攻撃判定が接触したときに
「フィールドオブジェクトダメージコモンイベントID」で設定したコモンイベントが呼び出されます。

※ フィールドオブジェクトはHPを持たないため、ダメージ処理で行うのはコモンイベントの呼び出しのみです。
   この処理は主に剣攻撃が草に当たった時に草を破壊する、といった用途を想定しています。


[当たり判定関連]
■ 当たり判定の設定
プラグインコマンド「当たり判定設定」で当たり判定の設定を行うことができます。
当たり判定は以下の種類があります。
攻撃判定: この判定が「ダメージ判定」と接触した場合、ダメージ判定の設定者にダメージを与えます。
ダメージ判定: この判定が「攻撃判定」と接触した場合、攻撃判定の設定者からダメージを受けます。
カスタム判定: ユーザーが独自に定義可能な当たり判定です。ここで設定した当たり判定は
             プラグインコマンド「当たり判定チェック」でチェックすることができます。

当たり判定は以下のキャラクターに対して設定することが可能です。
それ以外のキャラクターに対して当たり判定を設定するとエラーになります。
・プレイヤー(全ての当たり判定が設定可能)
・エネミー(全ての当たり判定が設定可能)
・フィールドオブジェクト(ダメージ判定/カスタム判定のみ設定可能)
・スキルオブジェクト(攻撃判定/カスタム判定のみ設定可能)

※ プレイヤーの当たり判定はプラグインパラメータ「プレイヤー当たり判定設定」で行えます。

■ プラグインコマンドによる当たり判定チェック
攻撃判定とダメージ判定に応じたダメージ処理はプラグイン側で自動的に行われますが、
プラグインコマンド「当たり判定チェック」によって
好きなタイミングで当たり判定のチェックを行うことが可能です。

■ 当たり判定の可視化
プラグインパラメータ「ヒットボックス共通設定/ヒットボックス可視化切り替え」で指定した
スイッチをONにすると、ヒットボックスが可視化されます。

また、プラグインパラメータ「ヒットボックス可視化切り替えキー」で
設定したキー(デフォルトではF6)を押すと、自動的にヒットボックスの可視化状態を切り替えることが可能です。
なお、この機能はテストプレイ中のみ有効です。
※ スイッチの設定でヒットボックスを可視化した場合はテストプレイでなくても可視化可能です。


[コンボ攻撃機能]
プラグインパラメータ「アクションコンボ設定」を設定することで、コンボ攻撃を簡単に作成することが可能です。
これを設定すると「最小コンボ可能時間」～「最大コンボ可能時間」以内に「派生元スキルID」で
指定されたスキルが実行された場合、そのスキルを「派生先スキルID」で指定したものに
上書きしたうえで実行することが可能です。
また、コンボ先の設定が存在していた場合、noAttackFrameで設定した攻撃禁止時間は無視されて
最小コンボ可能時間によって攻撃可能有無の判定が行われます。
※ 本機能はARPG_Core v1.4.0より追加されました。


[その他]
■ 時間経過で解消されるステートの設定
ARPGでは時間経過でステートを解消したい場面も多くあるかと思いますので、
そのための機能を用意しています。
ステートのメモ欄で以下の記載をすることで指定したフレーム数が経過したタイミングで
ステートを解消することができるようになります。
<duration: フレーム数>

例えば10秒後にステートを解消する場合は以下のように設定します。(1秒=60フレーム)
<duration: 60>

この設定だけではステートの重ね掛けを行った場合でも残りフレーム数は更新されません。
ステートの重ね掛けで残りフレーム数を更新する場合、以下の内容をメモ欄に記載する必要があります。
<overWriteDuration>

■ 武器ごとのスキル設定
武器の種類に応じて通常攻撃時のスキルを切り替えることが可能です。
武器のメモ欄に以下の記載をすることで指定したスキルを実行します。
<skill: スキル名>

※ 二刀流を設定した場合、最初に装備している武器の設定のみが反映されます。

■ 透明オブジェクト発射
透明なオブジェクトを発射し、当たり判定チェックを行うことができます。
例えば前方に敵がいるかをチェックするなどの用途で使用することが可能です。
透明オブジェクトの衝突対象については「プライオリティが通常キャラと同じに設定されたイベント」
と同じになります。

※注意
透明オブジェクトを生成した位置にすでにキャラクターがいた場合、
透明オブジェクトはそのキャラクターをすり抜け対象にします。

■ ターゲット選択機能
プラグインコマンド「ターゲット選択」を実行することで
ゲーム上でカーソルによるプレイヤーまたはエネミーの選択が可能です。
これによって例えば選択した敵キャラに向けて弾を発射するといったことが
可能になります。

また、ウェイトをONにした場合は選択中は時間を停止することができ、
OFFにした場合はリアルタイムで選択することができます。

キャンセル可能をONにするとターゲット選択中にキャンセルボタンを押した場合、
ターゲット選択をキャンセルすることが可能です。
この場合、選択結果格納スイッチに格納される結果はOFFになります。

■ イベントの画面内判定
プラグインパラメータ「キャラクター画面内判定」を実行することで
指定したキャラクターが画面内にいるかを判定することができます。

■ ダメージを受けた時の属性の判定
ダメージを受けた時に実行されるコモンイベント内でプラグインコマンド「ダメージ属性チェック」を
実行することで、どの属性によってダメージを受けたかを判定することができます。
※注意: 通常攻撃は属性として判定することはできません。

■ 攻撃時の属性を増やす
通常、スキルに付与可能な属性は1つのみですが、メモ欄に以下のように記載することで
属性を増やすことが可能です。この設定は1つのメモ欄内で複数使用することが可能です。
<damageElement: 属性名>

例: 炎と氷の属性を追加する場合
<damageElement: 炎>
<damageElement: 氷>

■ キャラクターのウェイト
プラグインコマンド「キャラクターアクションウェイト」を実行することで、キャラクターのイベントを一定時間
停止することができます。イベントコマンドのウェイトとの違いは、ウェイトは並列移動から実行した場合、自律移動を
行いますが、キャラクターアクションウェイトでは自律移動も停止させるという違いがあります。
そのため、ダメージを受けた場合の硬直などでウェイトが必要な場合には本コマンドを使用することで対応できます。

■ キャラクターが移動したかをチェックする方法について
キャラクターの移動チェックについては、プラグインコマンド
「キャラクターフレーム内移動有無チェック」によってチェック可能です。
このコマンドを実行するとキャラクターが次のフレームで更新されるまでの間に1度でも移動していた場合、
指定したスイッチがONになります。また、そのフレーム内で移動したかのフラグについては次のフレームで対象の
キャラクターが更新されるタイミングでクリアされます。

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


@command ChangeARPGMode
@text ARPGモード切り替え
@desc ARPGモードの有効/無効を切り替えます。

@arg ARPGMode
@text ARPGモード
@type boolean
@default true
@desc 切り替え先のARPGモードを指定します。


@command MakeDynamicEvent
@text 動的オブジェクト生成
@desc 動的オブジェクトを生成します。

@arg SrcMapId
@type number
@text 生成元マップID
@default 1
@desc 生成元マップIDを指定します。

@arg SrcEventIdOrName
@type string
@text 生成元イベントID or イベント名
@default 0
@desc 生成元イベントIDまたはイベント名を指定します。

@arg X
@type number
@text X座標
@default 0
@desc イベントを生成するX座標を指定します。

@arg XByVariable
@type variable
@text X座標(変数指定)
@default 0
@desc イベントを生成するX座標を変数で指定します。直接X値を設定した場合は本パラメータは0を指定してください。

@arg Y
@type number
@text Y座標
@default 0
@desc イベントを生成するY座標を指定します。

@arg YByVariable
@type variable
@text Y座標(変数指定)
@default 0
@desc イベントを生成するY座標を変数で指定します。直接Y値を設定した場合は本パラメータは0を指定してください。

@arg MadeDynamicEventId
@text 生成動的イベントID格納変数
@type variable
@default 0
@desc
生成した動的イベントのIDを格納する変数IDを指定します。


@command GetCharacterFloatPosition
@text キャラクター小数座標取得
@desc キャラクターの小数座標を取得します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg LeftUpOrCenter
@text 左上 or 中心
@type select
@option 左上
@value leftup
@option 中心
@value center
@default leftup
@desc キャラクターの左上座標または中心座標のどちらを取得するかを選択します。

@arg StoreFloatXVariableId
@text 小数X座標格納変数ID
@type variable
@default 0
@desc 取得した小数X座標を格納する変数IDを指定します。

@arg StoreFloatYVariableId
@text 小数Y座標格納変数ID
@type variable
@default 0
@desc 取得した小数Y座標を格納する変数IDを指定します。


@command CalcDeg
@text キャラクター間角度取得
@desc 主体キャラクターから見た対象キャラクターの角度を取得します。

@arg SubjectCharacterSpecification
@text 主体キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 主体となるキャラクターを指定します。

@arg TargetCharacterSpecification
@text 対象キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg StoreDegreeVariableId
@text 角度格納変数ID
@type variable
@default 0
@desc 取得した角度を格納する変数IDを指定します。


@command CalcFar
@text キャラクター間距離取得
@desc 主体キャラクターと対象キャラクターとの距離を取得します。

@arg SubjectCharacterSpecification
@text 主体キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 主体となるキャラクターを指定します。

@arg TargetCharacterSpecification
@text 対象キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg StoreFarVariableId
@text 距離格納変数ID
@type variable
@default 0
@desc 取得した距離を格納する変数IDを指定します。


@command CheckInTheScreen
@text キャラクター画面内判定
@desc キャラクターが画面内にいるかを判定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg XMargin
@text X軸マージン
@type number
@decimals 2
@default 2
@desc X軸の画面外マージン幅を指定します。単位はマス数です。

@arg YMargin
@text Y軸マージン
@type number
@decimals 2
@default 2
@desc Y軸の画面外マージン幅を指定します。単位はマス数です。

@arg StoreResultSwitchId
@text 結果格納スイッチID
@type switch
@default 1
@desc 画面内にいる場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。


@command CheckMoved
@text キャラクター移動有無チェック
@desc キャラクターがそのフレーム内に移動したかをチェックします。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg StoreResultSwitchId
@text 結果格納スイッチID
@type switch
@default 1
@desc 移動した場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。


@command TransparentObjectCast
@text 透明オブジェクト発射
@desc 透明オブジェクトを発射し、オブジェクトに衝突するかをチェックします。

@arg TransparentObjectPosition
@type struct<TransparentObjectPosition>
@text 位置指定
@desc 透明オブジェクトの生成位置を指定します。

@arg Degree
@text 角度
@type number
@decimals 2
@default 0
@desc 透明オブジェクトの発射角度を指定します。

@arg DegreeByVariable
@text 角度(変数指定)
@type variable
@default 0
@desc 透明オブジェクトの発射角度を変数で指定します。

@arg Far
@text 距離
@type number
@decimals 2
@default 0
@desc 透明オブジェクトの発射距離を指定します。0を指定すると無限になります。

@arg FarByVariable
@text 距離(変数指定)
@type variable
@default 0
@desc 透明オブジェクトの発射距離を変数で指定します。

@arg Width
@text 横幅
@type number
@decimals 2
@default 1
@desc 透明オブジェクトの横幅を指定します。

@arg Height
@text 縦幅
@type number
@decimals 2
@default 1
@desc 透明オブジェクトの縦幅を指定します。

@arg CollisionResultSwitchId
@text 衝突結果格納スイッチID
@type switch
@default 1
@desc 衝突した場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。

@arg CollidedXVariableId
@text 衝突X座標格納変数ID
@type variable
@default 0
@desc 衝突が発生した地点のX座標を格納する変数IDを指定します。

@arg CollidedYVariableId
@text 衝突X座標格納変数ID
@type variable
@default 0
@desc 衝突が発生した地点のX座標を格納する変数IDを指定します。


@command SetupEnemy
@text エネミー設定
@desc イベントのエネミー設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg EnemyId
@text エネミーID
@type enemy
@default 1
@desc エネミーIDを指定します。

@arg CollideAttackSkillId
@text 衝突攻撃スキルID
@type skill
@default 0
@desc
エネミーがアクターに衝突したときにダメージ計算を行うスキルIDを指定します。

@arg DamageCommonEventId
@text エネミーダメージコモンイベントID
@type common_event
@default 0
@desc
エネミーがダメージを受けたときに実行するコモンイベントを指定します。

@arg DefeatEnemyCommonEventId
@text 敵撃破コモンイベントID
@type common_event
@default 0
@desc
敵撃破時に実行するコモンイベントIDを指定します。

@arg HpGauge
@text HPゲージ
@type select
@option なし
@value none
@option ノーマル
@value normal
@option ボス
@value boss
@default normal
@desc HPゲージの表示を設定します。



@command ChangeHpGaugeVisible
@text エネミーHPゲージ表示切り替え
@desc エネミーのHPゲージ表示/非表示を切り替えます。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg ShowOrHide
@text 表示/非表示
@type boolean
@on 表示
@off 非表示
@default true
@desc 表示または非表示を選択します。


@command SetupFieldObject
@text フィールドオブジェクト設定
@desc イベントのフィールドオブジェクト設定を行います。

@arg DamageCommonEventId
@text フィールドオブジェクトダメージコモンイベントID
@type common_event
@default 0
@desc
フィールドオブジェクトがダメージを受けたときに実行するコモンイベントを指定します。


@command UseSkill
@text スキル使用
@desc スキルを使用します。

@arg SkillId
@type skill
@text スキルID
@default 1
@desc 使用するスキルのIDを指定します。名前指定または変数指定を行った場合、そちらが優先されます。

@arg SkillByName
@type string
@text スキル(名前指定)
@desc 使用するスキルの名前を指定します。名前指定を使用しない場合は空欄にしてください。

@arg SkillIdByVariable
@type variable
@text スキルID(変数指定)
@default 0
@desc 使用するスキルのIDを変数で指定します。変数指定を使用しない場合は0にしてください。


@command UseItem
@text アイテム使用
@desc アイテムを使用します。

@arg ItemId
@type item
@text アイテムID
@default 1
@desc 使用するアイテムのIDを指定します。名前指定または変数指定を行った場合、そちらが優先されます。

@arg ItemByName
@type string
@text アイテム(名前指定)
@desc 使用するアイテムの名前を指定します。名前指定を使用しない場合は空欄にしてください。

@arg ItemIdByVariable
@type variable
@text アイテムID(変数指定)
@default 0
@desc 使用するアイテムのIDを変数で指定します。変数指定を使用しない場合は0にしてください。


@command SkillActivation
@text スキル発動
@desc スキルを発動します。本コマンドは必ずスキルのアクションコモンイベント内で呼び出してください。

@arg ChantCommonEventId
@type common_event
@text 詠唱コモンイベントID
@default 0
@desc 詠唱処理を実行するコモンイベントのIDを指定します。


@command SkillCancel
@text スキルキャンセル
@desc 使用中のスキルをキャンセルします。本コマンドは必ずスキルのアクションコモンイベント内で呼び出してください。


@command ChangeSkillCancelWhenDamageEnableOrDisable
@text ダメージスキルキャンセル有効/無効切り替え
@desc ダメージによるスキルキャンセル有効/無効を切り替えます。本コマンドは必ずスキルのアクションコモンイベント内で呼び出してください。

@arg EnableOrDisable
@text 有効/無効
@type boolean
@on 有効
@off 無効
@default true
@desc
有効または無効を選択します。


@command TestApplySkillEffect
@text スキル効果適用テスト
@desc 使用者にスキル効果が適用可能であるかをテストし、結果をスイッチに設定します。

@arg IsSkillSpecification
@text スキル指定有無
@type boolean
@default false
@desc ONを指定すると対象となるスキルを指定します。指定しなかった場合、発動したスキルが適用されます。

@arg SkillSpecification
@text スキル指定
@type struct<SkillSpecification>
@default {"SkillOrItem":"skill","SkillId":"1","SkillByName":"","SkillIdByVariable":"0","ItemId":"1","ItemByName":"","ItemIdByVariable":"0"}
@desc スキル指定有無をOnにした場合に対象となるスキルを指定します。

@arg StoreResultSwitchId
@text 結果格納スイッチID
@type switch
@default 1
@desc 使用可能な場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。


@command ApplySkillEffect
@text スキル効果適用
@desc 使用者にスキル効果を適用します。本コマンドは必ずスキルのアクションコモンイベント内で「スキル発動」の後に呼び出してください。

@arg IsSkillSpecification
@text スキル指定有無
@type boolean
@default false
@desc ONを指定すると対象となるスキルを指定します。指定しなかった場合、発動したスキルが適用されます。

@arg SkillSpecification
@text スキル指定
@type struct<SkillSpecification>
@default {"SkillOrItem":"skill","SkillId":"1","SkillByName":"","SkillIdByVariable":"0","ItemId":"1","ItemByName":"","ItemIdByVariable":"0"}
@desc スキル指定有無をOnにした場合に対象となるスキルを指定します。


@command MakeSkillObject
@text スキルオブジェクト生成
@desc スキルオブジェクトを生成します。

@arg SrcMapId
@type number
@text 生成元マップID
@default 1
@desc 生成元マップIDを指定します。

@arg SrcEventIdOrName
@text 生成元イベントID or イベント名
@type string
@default 0
@desc 生成元イベントIDまたはイベント名を指定します。

@arg SkillObjectPosition
@type struct<SkillObjectPosition>
@text 位置指定
@desc スキルオブジェクトの生成位置を指定します。

@arg IsSkillSpecification
@text スキル指定有無
@type boolean
@default false
@desc ONを指定すると対象となるスキルを指定します。指定しなかった場合、発動したスキルが適用されます。

@arg SkillSpecification
@text スキル指定
@type struct<SkillSpecification>
@default {"SkillOrItem":"skill","SkillId":"1","SkillByName":"","SkillIdByVariable":"0","ItemId":"1","ItemByName":"","ItemIdByVariable":"0"}
@desc スキル指定有無をOnにした場合に対象となるスキルを指定します。

@arg MadeDynamicEventId
@text 生成動的イベントID格納変数
@type variable
@default 0
@desc
生成した動的イベントのIDを格納する変数IDを指定します。


@command SetAttackDegree
@text 攻撃角度指定
@desc スキルオブジェクトの攻撃角度を指定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg AttackDegree
@type number
@text 攻撃角度
@default 0
@desc 攻撃角度を設定します。

@arg AttackDegreeByVariable
@type variable
@text 攻撃角度(変数指定)
@default 0
@desc 攻撃角度を変数で設定します。


@command SetUserPositionSynchronize
@text スキルオブジェクト使用者位置同期
@desc スキルオブジェクトの使用者位置同期の有無を指定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg Synchronize
@type boolean
@text 同期
@on 有効
@off 無効
@default true
@desc 同期の有効/無効を指定します。


@command CheckDamageElement
@text ダメージ属性チェック
@desc ダメージを受けた属性をチェックします。本コマンドは必ず受ダメージ処理から呼び出してください。

@arg ElementName
@text 属性名
@type string
@desc チェック対象の属性名を指定します。

@arg StoreResultSwitchId
@text 結果格納スイッチID
@type switch
@default 1
@desc 指定の属性だった場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。


@command SetHitBox
@text ヒットボックス設定
@desc ヒットボックスの設定を行います。同じタイプに対して再度ヒットボックス設定を行った場合、既存の設定を上書きします。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg HitBoxType
@text ヒットボックスタイプ
@type select
@option 攻撃
@value attack
@option ダメージ
@value damage
@option カスタム
@value custom
@default attack
@desc ヒットボックスタイプを設定します。

@arg CustomHitBoxTag
@text カスタムヒットボックスタグ
@type string
@desc ヒットボックスタイプをカスタムにした場合のタグを指定します。

@arg HitBoxList
@type struct<Box>[]
@text ヒットボックスリスト
@default []
@desc ヒットボックスを設定します。


@command ChangeHitBoxEnableOrDisable
@text ヒットボックス有効/無効切り替え
@desc ヒットボックスの有効/無効切り替えを行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg HitBoxType
@text ヒットボックスタイプ
@type select
@option 攻撃
@value attack
@option ダメージ
@value damage
@option カスタム
@value custom
@default attack
@desc ヒットボックスタイプを設定します。

@arg CustomHitBoxTag
@text カスタムヒットボックスタグ
@type string
@desc ヒットボックスタイプをカスタムにした場合のタグを指定します。

@arg Enabled
@text 有効化
@type boolean
@desc trueを設定するとヒットボックスを有効化します。


@command HitCheck
@text 当たり判定チェック
@desc ヒットボックスによる当たり判定チェックを行います。

@arg SubjectCharacterSpecification
@text 主体キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 主体となるキャラクターを指定します。

@arg SubjectHitBoxType
@text 主体ヒットボックスタイプ
@type select
@option 攻撃
@value attack
@option ダメージ
@value damage
@option カスタム
@value custom
@default attack
@desc ヒットボックスタイプを設定します。

@arg SubjectCustomHitBoxTag
@text 主体カスタムヒットボックタグ
@type string
@desc カスタムヒットボックタグを設定します。

@arg IsTargetSpecification
@text 対象指定有無
@type boolean
@default false
@desc ONを指定すると対象となるイベントを指定します。

@arg TargetCharacterSpecification
@text 対象キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象指定有無がONの場合に対象となるキャラクターを指定します。

@arg TargetHitBoxType
@text 対象ヒットボックスタイプ
@type select
@option 攻撃
@value attack
@option ダメージ
@value damage
@option カスタム
@value custom
@default attack
@desc ヒットボックスタイプを設定します。

@arg TargetCustomHitBoxTag
@text 対象カスタムヒットボックタグ
@type string
@desc カスタムヒットボックタグを設定します。

@arg StoreResultSwitchId
@text 結果格納スイッチID
@type switch
@default 1
@desc ヒットしていた場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。


@command GetBattlerStatus
@text バトラーステータス取得
@desc 指定したバトラーのステータスを取得します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg StatusType
@type select
@option mhp
@option mmp
@option hp
@option mp
@option tp
@option atk
@option mat
@option mdf
@option agi
@option luk
@option hit
@option eva
@option cri
@option cev
@option mev
@option mrf
@option cnt
@option hrg
@option mrg
@option trg
@option tgr
@option grd
@option rec
@option pha
@option mcr
@option tcr
@option pdr
@option mdr
@option fdr
@option exr
@text ステータスタイプ
@default mhp
@desc ステータスタイプを指定します。

@arg DestVariableId
@type variable
@text 格納先変数
@default 1
@desc 取得したステータス値の格納先変数を指定します。


@command SetBattlerStatus
@text バトラーステータス設定
@desc 指定したバトラーのステータスを設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg StatusType
@type select
@option hp
@option mp
@option tp
@text ステータスタイプ
@default mhp
@desc ステータスタイプを指定します。

@arg Value
@type number
@text 値
@default 0
@desc 設定するステータス値を指定します。

@arg ValueByVariable
@type variable
@text 値(変数指定)
@default 0
@desc 設定するステータス値が格納された変数IDを指定します。


@command GetBattlerARPGParameter
@text バトラーARPGパラメータ取得
@desc 指定したバトラーのARPG専用パラメータを取得します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg ARPGParameterType
@type select
@option スキルキャンセルダメージレート
@value skillCancelDamageRate
@option ジャストガードフレーム
@value justGuardFrame
@text ARPGパラメータタイプ
@default skillCancelDamageRate
@desc ARPGパラメータタイプを指定します。

@arg DestVariableId
@type variable
@text 格納先変数
@default 1
@desc 取得したステータス値の格納先変数を指定します。


@command SetBattlerARPGParameter
@text バトラーARPGパラメータ設定
@desc 指定したバトラーのARPG専用パラメータを設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg ARPGParameterType
@type select
@option スキルキャンセルダメージレート
@value skillCancelDamageRate
@option ジャストガードフレーム
@value justGuardFrame
@text ARPGパラメータタイプ
@default skillCancelDamageRate
@desc ARPGパラメータタイプを指定します。
@arg Value
@type number
@text 値
@default 0
@decimals 2
@desc 設定するステータス値を指定します。

@arg ValueByVariable
@type variable
@text 値(変数指定)
@default 0
@desc 設定するステータス値が格納された変数IDを指定します。


@command GetBattlerARPGFlag
@text バトラーARPGフラグ取得
@desc 指定したバトラーのARPG専用フラグを取得します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg ARPGFlagType
@type select
@option ノーダメージフラグ
@value noDamageFlag
@option 攻撃禁止フラグ
@value noAttackFlag
@text ARPGフラグタイプ
@default noDamageFlag
@desc ARPGフラグタイプを指定します。

@arg DestSwitchId
@type switch
@text 格納先スイッチ
@default 1
@desc 取得したフラグ値の格納先スイッチを指定します。


@command SetBattlerARPGFlag
@text バトラーARPGフラグ設定
@desc 指定したバトラーのARPG専用フラグを設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg ARPGFlagType
@type select
@option ノーダメージフラグ
@value noDamageFlag
@option 攻撃禁止フラグ
@value noAttackFlag
@text ARPGフラグタイプ
@default noDamageFlag
@desc ARPGフラグタイプを指定します。

@arg Value
@type boolean
@text 値
@default true
@desc 設定するフラグ値を指定します。

@arg ValueBySwitch
@type switch
@text 値(スイッチ指定)
@default 0
@desc 設定するフラグ値が格納されたスイッチIDを指定します。


@command SetCheckMapValid
@text マップ有効範囲チェック有効/無効切り替え
@desc マップの有効範囲チェックの有効/無効の切り替えを行います。

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


@command CharacterBlowAway
@text キャラクターノックバック
@desc キャラクターを指定方向にノックバックさせます。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg Degree
@text 角度
@type number
@default 0
@desc 吹き飛ばす角度を指定します。

@arg DegreeByVariable
@text 角度(変数指定)
@type variable
@default 0
@desc 吹き飛ばす角度を変数で指定します。

@arg InitialVelocity
@text 初速度
@type number
@decimals 2
@default 0.5
@desc 吹き飛ばす初速度を指定します。

@arg InitialVelocityByVariable
@text 初速度(変数指定)
@type variable
@default 0
@desc 吹き飛ばす初速度を変数で指定します。

@arg Duration
@text 間隔
@type number
@decimals 2
@default 10
@desc 吹き飛ばす間隔を指定します。

@arg DurationByVariable
@text 間隔(変数指定)
@type variable
@default 0
@desc 吹き飛ばす間隔を変数で指定します。

@arg Wait
@text ウェイト
@type boolean
@default true
@desc trueを指定すると、吹き飛ばし完了までウェイトします。


@command CharacterActionWait
@text キャラクターアクションウェイト
@desc キャラクターのアクションを一定時間ウェイトさせます。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg Duration
@text 間隔
@type number
@decimals 2
@default 10
@desc アクションウェイト間隔を指定します。

@arg DurationByVariable
@text 間隔(変数指定)
@type variable
@default 0
@desc アクションウェイト間隔を変数で指定します。


@command TargetSelect
@text ターゲット選択
@desc ターゲット選択を行います。

@arg SelectResultSwitchId
@text 選択結果格納スイッチID
@type switch
@default 0
@desc
ターゲットの選択に成功した場合ONが設定されるスイッチIDを指定します。

@arg SelectedTargetCharacterKindVariableId
@text 選択ターゲットキャラクター種別格納変数ID
@type variable
@default 0
@desc
選択したターゲットのキャラクター種別を格納する変数IDを指定します。

@arg SelectedTargetEventIdVariableId
@text 選択ターゲットイベントID格納変数ID
@type variable
@default 0
@desc
選択したターゲットのイベントIDを格納する変数IDを指定します。

@arg Wait
@text ウェイト
@type boolean
@default true
@desc
ONを設定した場合、ターゲット選択中はシーンを停止します。

@arg Cancelable
@text キャンセル可能
@type boolean
@default true
@desc
ONを設定した場合、ターゲット選択のキャンセルを有効にします。


@command SearchNearBattler
@text 近隣バトラー検索
@desc 対象者から最も近いバトラーを検索します。

@arg Target
@text ターゲット
@type select
@option 全バトラー
@value all
@option 敵キャラ
@value opponent
@option 味方キャラ
@value friend
@default all
@desc ターゲットを指定します。

@arg SubjectCharacterSpecification
@text 主体キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 主体となるキャラクターを指定します。

@arg StoreResultSwitchId
@text 結果格納スイッチID
@type switch
@default 1
@desc 敵キャラが見つかった場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。

@arg StoreCharacterKindVariableId
@text キャラクター種別格納変数ID
@type variable
@default 0
@desc 見つかったバトラーのキャラクター種別を格納する変数IDを指定します。

@arg StoreEventIdVariableId
@text イベントID格納変数ID
@type variable
@default 0
@desc 見つかったバトラーがイベントの場合にイベントIDを格納する変数IDを指定します。


@command SetPlayerGuardMode
@text プレイヤーガードモード設定
@desc プレイヤーのガードモードを設定します。

@arg GuardMode
@text ガードモード
@type boolean
@default true
@desc
ガードモードONまたはOFFを指定します。


@command ChangeControlActor
@text 操作アクター変更
@desc 操作アクターを変更します。本コマンドはキー入力によるアクター変更と同じ挙動となります。


@command ShowMessagePopup
@text メッセージポップアップ表示
@desc メッセージポップアップを表示します。

@arg Text
@text テキスト
@type string
@desc
ポップアップ表示を行うテキストを指定します。

@arg WindowWidth
@text 横幅
@type number
@default 640
@desc
ポップアップウィンドウの横幅を指定します。

@arg Time
@text 時間
@type number
@default 60
@desc
ポップアップの表示時間を指定します。


@param CopyEventSetting
@text コピーイベント共通設定
@type struct<CopyEventSetting>
@default {"CopyEventTag":"cp","DynamicEventSrcMapIds":"[]"}
@desc
コピーイベントの共通設定を行います。

@param BattlerSetting
@text バトラー共通設定
@type struct<BattlerSetting>
@default {"DamageDegCommonVariableId":"0","UserKindCommonVariableId":"0","UserEventIdCommonVariableId":"0","DamageKindCommonVariableId":"0","DamageTypeCommonVariableId":"0","DamageValueCommonVariableId":"0"}
@desc
バトラーの共通設定を行います。

@param ActorSetting
@text アクター共通設定
@type struct<ActorSetting>
@default {"NormalAttackSkillId":"0","DamageCommonEventId":"0","NormalGuardCommonEventId":"0","JustGuardCommonEventId":"0","StartGuardCommonEventId":"0","EndGuardCommonEventId":"0","JustGuardFrame":"10","ActorHitBox":"{\"AttackHitBoxList\":\"[]\",\"DamageHitBoxList\":\"[]\"}","GameOverCommonEventId":"0","LevelUpCommonEventId":"0"}
@desc
アクターの共通設定を行います。

@param EnemySetting
@text エネミー共通設定
@type struct<EnemySetting>
@default {"CollideAttackSkillId":"0","DamageCommonEventId":"0","DefeatEnemyCommonEventId":"0"}
@desc
エネミーの共通設定を行います。

@param SkillObjectSetting
@text スキルオブジェクト共通設定
@type struct<SkillObjectSetting>
@default {"SkillObjectUserKindSelfVariableId":"0","SkillObjectUserEventIdSelfVariableId":"0","CollisionDetectExSelfSwitchId":"0"}
@desc
スキルオブジェクトの共通設定を行います。

@param HitBoxSetting
@text ヒットボックス共通設定
@type struct<HitBoxSetting>
@default {"VisibleHitAreaSwitchId":"0","AttackHitBoxColor":"#ff0000aa","DamageHitBoxColor":"#0000ffaa","CustomHitBoxDefaultColor":"#00ff00aa","CustomHitBoxColorList":"[]"}
@desc
ヒットボックスの共通設定を行います。

@param ActionComboSetting
@text アクションコンボ設定
@type struct<ActionComboData>[]
@desc
アクションコンボの設定を行います。

@param EnemyHpGaugeSetting
@text エネミーHPゲージ設定
@type struct<EnemyHpGaugeSetting>
@default {"NormalEnemyHpGaugePosition":"up","NormalEnemyHpGaugeYOffset":"-8","NormalEnemyHpGaugeHeight":"6","NormalEnemyHpGaugeColor1":"#00aa00","NormalEnemyHpGaugeColor2":"#22ff22","BossEnemyHpGaugeLabel":"BOSS","BossEnemyHpGaugeYOffset":"16","BossEnemyHpGaugeWidth":"500","BossEnemyHpGaugeHeight":"12","BossEnemyHpGaugeColor1":"#00aa00","BossEnemyHpGaugeColor2":"#22ff22"}
@desc
エネミーのHPゲージ設定を行います。

@param KeySetting
@text キー入力設定
@type struct<KeySetting>
@default {"Cancel":"{\"KeyName\":\"escape\",\"KeySymbol\":\"\",\"KeyCode\":\"0\",\"ButtonIndex\":\"-1\"}","Menu":"{\"KeyName\":\"menu\",\"KeySymbol\":\"\",\"KeyCodes\":\"[]\",\"ButtonIndexes\":\"[\\\"3\\\"]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}","ActorNormalAttack":"{\"KeyName\":\"ok\",\"KeySymbol\":\"\",\"KeyCodes\":\"[]\",\"ButtonIndexes\":\"[]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}","ActorGuard":"{\"KeyName\":\"other\",\"KeySymbol\":\"A\",\"KeyCodes\":\"[\\\"65\\\"]\",\"ButtonIndexes\":\"[\\\"6\\\"]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}","VisibleHitBox":"{\"KeyName\":\"other\",\"KeySymbol\":\"F6\",\"KeyCodes\":\"[\\\"117\\\"]\",\"ButtonIndexes\":\"[]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}","ChangeControlActor":"{\"KeyName\":\"other\",\"KeySymbol\":\"S\",\"KeyCodes\":\"[\\\"83\\\"]\",\"ButtonIndexes\":\"[\\\"11\\\"]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}"}
@desc
キー入力の各種設定を行います。

@param SESetting
@text SE設定
@type struct<SESetting>
@default {"ActorChange":"{\"FileName\":\"Decision5\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}"}
@desc
SEの各種設定を行います。

@param EnableARPGSwitchId
@text ARPG有効化スイッチID
@type switch
@default 0
@desc
ARPGを有効化するスイッチIDを指定します。

@param UseDamagePopup
@text ダメージポップアップ使用
@type boolean
@default true
@desc
trueを設定すると攻撃によるダメージ発生時にダメージ値を表示します。

@param UseImageDamage
@text ダメージ画像使用
@type boolean
@default false
@desc
trueを設定するとsystem/Damage.pngの画像をダメージ表示に使用します。

@param UseImageTargetSelectCursor
@text ターゲット選択カーソル画像使用
@type boolean
@default false
@desc
trueを設定すると画像をターゲット選択カーソルに使用します。

@param TargetSelectCursorImageFileName
@text ターゲット選択カーソル画像ファイル名
@type file
@dir img
@desc
ターゲット選択カーソルの画像ファイル名を指定します。

@param EnableChangeControlActorSwitchId
@text 操作アクター変更許可スイッチID
@type switch
@default 0
@desc
操作アクターの変更を許可するスイッチIDを指定します。0を設定した場合は常に有効になります。

@param ErrorMessageLanguage
@text エラーメッセージ言語
@type select
@option 英語
@value en
@option 日本語
@value ja
@default ja
@desc
エラーメッセージの表示言語を指定します。
*/
/*!/*~struct~CopyEventSetting:ja
@param CopyEventTag
@text コピーイベントタグ
@type string
@default cp
@desc
コピーするイベントを判定するためのタグ名を指定します。

@param DynamicEventSrcMapIds
@text 動的イベント生成元マップID一覧
@type number[]
@default []
@desc
動的イベント生成元のマップIDの一覧を設定します。
*/
/*!/*~struct~BattlerSetting:ja
@param DamageDegCommonVariableId
@text ダメージ角度格納コモン変数
@type variable
@default 0
@desc
ダメージを受けた時の角度を格納するコモン変数を指定します。

@param UserKindCommonVariableId
@text ユーザー種別格納コモンイベント変数
@type variable
@default 0
@desc
バトラーでアクションコモンイベントを実行したときにユーザー種別(1: プレイヤー, 3: イベント)を格納する変数を指定します。

@param UserEventIdCommonVariableId
@text ユーザーイベントID格納コモンイベント変数
@type variable
@default 0
@desc
バトラーでアクションコモンイベントを実行したときにイベントIDを格納する変数を指定します。

@param DamageKindCommonVariableId
@text ダメージ種別コモン変数ID
@type variable
@default 0
@desc
ダメージを受けた時にダメージ種別が設定されるコモン変数を指定します。

@param DamageTypeCommonVariableId
@text ダメージタイプコモン変数ID
@type variable
@default 0
@desc
ダメージを受けた時にダメージタイプが設定されるコモン変数を指定します。

@param DamageValueCommonVariableId
@text ダメージ値コモン変数ID
@type variable
@default 0
@desc
ダメージを受けた時にダメージ値が設定されるコモン変数を指定します。
*/
/*!/*~struct~ActorSetting:ja
@param NormalAttackSkillId
@text 通常攻撃スキルID
@type skill
@default 0
@desc
通常攻撃時のスキルIDを指定します。

@param DamageCommonEventId
@text アクターダメージコモンイベントID
@type common_event
@default 0
@desc
アクターがダメージを受けたときに実行するコモンイベントを指定します。

@param DeadCommonEventId
@text アクター戦闘不能コモンイベントID
@type common_event
@default 0
@desc
アクターが戦闘不能になったときに実行するコモンイベントを指定します。

@param NormalGuardCommonEventId
@text アクター通常ガードコモンイベントID
@type common_event
@default 0
@desc
アクターが通常ガードしたときに実行するコモンイベントを指定します。

@param JustGuardCommonEventId
@text アクタージャストガードコモンイベントID
@type common_event
@default 0
@desc
アクターがジャストガードしたときに実行するコモンイベントを指定します。

@param StartGuardCommonEventId
@text アクターガード開始コモンイベントID
@type common_event
@default 0
@desc
アクターがガードを開始したときに実行するコモンイベントを指定します。

@param EndGuardCommonEventId
@text アクターガード終了コモンイベントID
@type common_event
@default 0
@desc
アクターがガードを終了したときに実行するコモンイベントを指定します。

@param JustGuardFrame
@text ジャストガードフレーム
@type number
@min 0
@default 10
@desc
ジャストガードの許容フレーム数を指定します。ジャストガードを使用しない場合は0を指定してください。

@param ActorHitBox
@text アクターヒットボックス
@type struct<ActorHitBox>
@default {"DamageHitBoxList":"[]"}
@desc アクターのヒットボックス設定を行います。

@param GameOverCommonEventId
@text ゲームオーバーコモンイベントID
@type common_event
@default 0
@desc
ゲームオーバー時に実行するコモンイベントIDを指定します。0を指定した場合はゲームオーバーシーンに移動します。

@param LevelUpCommonEventId
@text レベルアップコモンイベントID
@type common_event
@default 0
@desc
レベルアップしたときに実行するコモンイベントを指定します。
*/
/*!/*~struct~EnemySetting:ja
@param CollideAttackSkillId
@text 衝突攻撃スキルID
@type skill
@default 0
@desc
エネミーがアクターに衝突したときにダメージ計算を行うスキルIDを指定します。

@param DamageCommonEventId
@text エネミーダメージコモンイベントID
@type common_event
@default 0
@desc
エネミーがダメージを受けたときに実行するコモンイベントを指定します。

@param DefeatEnemyCommonEventId
@text 敵撃破コモンイベントID
@type common_event
@default 0
@desc
敵撃破時に実行するコモンイベントIDを指定します。
*/
/*!/*~struct~SkillObjectSetting:ja
@param SkillObjectUserKindSelfVariableId
@text スキルオブジェクトユーザー種別格納セルフ変数
@type variable
@default 0
@desc
スキルオブジェクトを生成したユーザーの種別を格納するセルフ変数を指定します。

@param SkillObjectUserEventIdSelfVariableId
@text スキルオブジェクトユーザーイベントID格納セルフ変数
@type variable
@default 0
@desc
スキルオブジェクトを生成したユーザーの種別がイベントの場合にイベントIDを格納するセルフ変数を指定します。

@param CollisionDetectExSelfSwitchId
@text 衝突検出フラグ格納拡張セルフスイッチ
@type switch
@default 0
@desc
スキルオブジェクトがターゲットに衝突したときにONを格納する拡張セルフスイッチを指定します。
*/
/*!/*~struct~HitBoxSetting:ja
@param VisibleHitAreaSwitchId
@text ヒットボックス可視化切り替えスイッチID
@type switch
@default 0
@desc
ヒットボックス可視化の有無を切り替えるスイッチIDを指定します。

@param AttackHitBoxColor
@text 攻撃判定ヒットボックスカラー
@type string
@default #ff0000aa
@desc
ヒットボックス可視化時の攻撃判定のカラーを指定します。

@param DamageHitBoxColor
@text ダメージ判定ヒットボックスカラー
@type string
@default #0000ffaa
@desc
ヒットボックス可視化時のダメージ判定のカラーを指定します。

@param CustomHitBoxDefaultColor
@text カスタムヒットボックスデフォルトカラー
@type string
@default #00ff00aa
@desc
ヒットボックス可視化時のカスタムヒットボックスのデフォルトカラーを指定します。

@param CustomHitBoxColorList
@text カスタムヒットボックスカラー一覧
@type string<CustomHitBoxColor>
@default []
@desc
ヒットボックス可視化時のカスタムヒットボックスのカラー一覧を指定します。
*/
/*!/*~struct~ActionComboData:ja
@param SkillId
@text スキルID
@type skill
@default 0
@desc
コンボ派生対象のスキルIDを指定します。

@param ActionComboDerivations
@text アクションコンボ派生一覧
@type struct<ActionComboDerivation>[]
@desc
アクションコンボの派生一覧を指定します。
*/
/*!/*~struct~ActionComboDerivation:ja
@param FromSkillId
@text 派生元スキルID
@type skill
@default 0
@desc
コンボ派生元のスキルIDを指定します。

@param DerivationSkillId
@text 派生先スキルID
@type skill
@default 0
@desc
コンボ派生先のスキルIDを指定します。コンボの最初のスキルに対しては0を指定してください。

@param MinComboFrame
@text 最小コンボ可能時間
@type number
@min 0
@default 30
@desc
コンボ攻撃が可能になるまでの時間をフレーム単位で指定します。

@param MaxComboFrame
@text 最大コンボ可能時間
@type number
@min 0
@default 60
@desc
コンボ攻撃の最大許容時間をフレーム単位で指定します。
*/
/*!/*~struct~EnemyHpGaugeSetting:ja
@param NormalEnemyHpGaugePosition
@text ノーマルエネミーHPゲージ位置
@type select
@option 上
@value up
@option 下
@value down
@default up
@desc ノーマルエネミーのHPゲージの表示位置を設定します。

@param NormalEnemyHpGaugeYOffset
@text ノーマルエネミーHPゲージY座標オフセット
@type number
@min -9999
@default -8
@desc ノーマルエネミーのHPゲージの表示Y座標オフセットを設定します。

@param NormalEnemyHpGaugeHeight
@text ノーマルエネミーHPゲージ縦幅
@type number
@min 1
@default 6
@desc ノーマルエネミーのHPゲージの縦幅を設定します。

@param NormalEnemyHpGaugeColor1
@text ノーマルエネミーHPゲージ色1
@type string
@default #00aa00
@desc ノーマルエネミーのHPゲージの色1を設定します。

@param NormalEnemyHpGaugeColor2
@text ノーマルエネミーHPゲージ色2
@type string
@default #22ff22
@desc ノーマルエネミーのHPゲージの色1を設定します。

@param BossEnemyHpGaugeLabel
@text ボスエネミーHPゲージラベル
@type string
@default BOSS
@desc ボスエネミーのHPゲージの横に表示するテキストを設定します。

@param BossEnemyHpGaugeYOffset
@text ボスエネミーHPゲージY座標オフセット
@type number
@min 1
@default 16
@desc ボスエネミーのHPゲージの表示Y座標オフセットを設定します。

@param BossEnemyHpGaugeWidth
@text ボスエネミーHPゲージ横幅
@type number
@min 1
@default 500
@desc ボスエネミーのHPゲージの横幅を設定します。

@param BossEnemyHpGaugeHeight
@text ボスエネミーHPゲージ縦幅
@type number
@min 1
@default 12
@desc ボスエネミーのHPゲージの縦幅を設定します。

@param BossEnemyHpGaugeColor1
@text ボスエネミーHPゲージ色1
@type string
@default #00aa00
@desc ボスエネミーのHPゲージの色1を設定します。

@param BossEnemyHpGaugeColor2
@text ボスエネミーHPゲージ色2
@type string
@default #22ff22
@desc ボスエネミーのHPゲージの色1を設定します。
*/
/*!/*~struct~KeySetting:ja
@param Cancel
@text キャンセルキー
@type struct<Key>
@default {"KeyName":"escape","KeySymbol":"","KeyCodes":"[]","ButtonIndexes":"[]","KeyCode":"0","ButtonIndex":"-1"}
@desc
キャンセルに使用するキーを指定します。

@param Menu
@text メニューキー
@type struct<Key>
@default {"KeyName":"menu","KeySymbol":"","KeyCodes":"[]","ButtonIndexes":"[\"3\"]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
メニュー画面を開くキーを指定します。

@param ActorNormalAttack
@text アクター通常攻撃キー
@type struct<Key>
@default {"KeyName":"ok","KeySymbol":"","KeyCodes":"[]","ButtonIndexes":"[]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
アクターが通常攻撃を行う時のキーを指定します。

@param ActorGuard
@text アクターガードキー
@type struct<Key>
@default {"KeyName":"other","KeySymbol":"A","KeyCodes":"[\"65\"]","ButtonIndexes":"[\"6\"]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
アクターがガードを行う時のキーを指定します。

@param VisibleHitBox
@text ヒットボックス可視化切り替えキー
@type struct<Key>
@default {"KeyName":"other","KeySymbol":"F6","KeyCodes":"[\"117\"]","ButtonIndexes":"[]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
ヒットボックス可視化有無の切り替えを行うキーを指定します。

@param ChangeControlActor
@text 操作アクター変更
@type struct<Key>
@default {"KeyName":"other","KeySymbol":"S","KeyCodes":"[\"83\"]","ButtonIndexes":"[\"11\"]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
操作アクターの変更を行うキーを指定します。
*/
/*!/*~struct~SESetting:ja
@param ActorChange
@text アクターチェンジ
@type struct<SE>
@default {"FileName":"","Volume":"90","Pitch":"100","Pan":"0"}
@desc
アクターチェンジ時に再生するSEを指定します。
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
/*!/*~struct~Box:ja
@param X
@text X座標
@type number
@min -9999
@decimals 2
@default 0
@desc
X座標を指定します。

@param Y
@text Y座標
@type number
@min -9999
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
/*!/*~struct~CustomHitBoxColor:ja
@param CustomHitBoxTag
@text カスタムヒットボックスタグ
@type string
@desc カスタムヒットボックスのタグを指定します。

@param Color
@text カラー
@type string
@default #00ff00aa
@desc
ヒットボックス可視化時のカスタムヒットボックスのカラーを指定します。
*/
/*!/*~struct~SkillObjectPosition:ja
@param Specification
@text 位置指定
@type select
@option 現在座標
@value current
@option 前方座標
@value forward
@option キャラクター座標
@value character
@option カスタム座標
@value custom
@default current
@desc
位置指定方法を選択します。

@param CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 位置指定でキャラクター座標を選択した場合の対象となるキャラクターを指定します。

@param CustomPosition
@text カスタム座標
@type struct<Position>
@desc
位置指定でカスタム座標を選択した場合の生成座標を指定します。
*/
/*!/*~struct~TransparentObjectPosition:ja
@param Specification
@text 位置指定
@type select
@option キャラクター座標
@value character
@option カスタム座標
@value custom
@default current
@desc
位置指定方法を選択します。

@param CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 位置指定でキャラクター座標を選択した場合の対象となるキャラクターを指定します。

@param CustomPosition
@text カスタム座標
@type struct<Position>
@desc
位置指定でカスタム座標を選択した場合の生成座標を指定します。
*/
/*!/*~struct~Position:ja
@param X
@type number
@text X座標
@default 0
@desc イベントを生成するX座標を指定します。

@param XByVariable
@type variable
@text X座標(変数指定)
@default 0
@desc イベントを生成するX座標を変数で指定します。直接値を設定した場合は本パラメータは0を指定してください。

@param Y
@type number
@text Y座標
@default 0
@desc イベントを生成するY座標を指定します。

@param YByVariable
@type variable
@text Y座標(変数指定)
@default 0
@desc イベントを生成するY座標を変数で指定します。直接値を設定した場合は本パラメータは0を指定してください。
*/
/*!/*~struct~ActorHitBox:ja
@param DamageHitBoxList
@type struct<Box>[]
@text ダメージ判定ヒットボックスリスト
@default []
@desc ダメージ判定ヒットボックスを設定します。
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
/*!/*~struct~SkillSpecification:ja
@param SkillOrItem
@text スキル or アイテム
@type select
@option スキル
@value skill
@option アイテム
@value item
@default skill
@desc スキルまたはアイテムのどちらを指定するかを選択します。

@param SkillId
@type skill
@text スキルID
@default 1
@desc 使用するスキルのIDを指定します。名前指定または変数指定を行った場合、そちらが優先されます。

@param SkillByName
@type string
@text スキル(名前指定)
@desc 使用するスキルの名前を指定します。名前指定を使用しない場合は空欄にしてください。

@param SkillIdByVariable
@type variable
@text スキルID(変数指定)
@default 0
@desc 使用するスキルのIDを変数で指定します。変数指定を使用しない場合は0にしてください。

@param ItemId
@type item
@text アイテムID
@default 1
@desc 使用するアイテムのIDを指定します。名前指定または変数指定を行った場合、そちらが優先されます。

@param ItemByName
@type string
@text アイテム(名前指定)
@desc 使用するアイテムの名前を指定します。名前指定を使用しない場合は空欄にしてください。

@param ItemIdByVariable
@type variable
@text アイテムID(変数指定)
@default 0
@desc 使用するアイテムのIDを変数で指定します。変数指定を使用しない場合は0にしてください。
*/

import "./ExportDotMoveSystem";

import "./ARPG_DynamicEvent/Main";
import "./ARPG_DamagePopup/Main";
import "./ARPG_State/Main";
import "./ARPG_TargetSelect/Main"

import "./Game_Temp";
import "./Game_Character";
import "./Game_Map";
import "./Game_Player";
import "./Game_Event";
import "./Game_Actor";
import "./Game_Party";
import "./Game_Interpreter";
import "./Game_Action";
import "./Spriteset_Map";
import "./Sprite_Character";
import "./Scene_Map";
import "./Tilemap";
import "./Game_System";
import "./CharacterMover";
import "./CharacterCollisionChecker";
import "./Window_MenuCommand";
import "./Sprite";

import { ARPG_Actor } from "./ARPG_Actor";
import { ARPG_BattleManager } from "./ARPG_BattleManager";
import { ARPG_Battler } from "./ARPG_Battler";
import { ARPG_BattlerParameters } from "./ARPG_BattlerParameters";
import { ARPG_CharacterTempData } from "./ARPG_CharacterTempData";
import { ARPG_CorePluginParams } from "./ARPG_Config";
import { ARPG_Effect } from "./ARPG_Effect";
import { ARPG_SkillObject } from "./ARPG_SkillObject";
import { ARPG_Enemy } from "./ARPG_Enemy";
import { ARPG_Skill } from "./ARPG_Skill";
import { ARPG_Utils } from "./ARPG_Utils";
import { ARPG_CustomManager } from "./ARPG_CustomManager";
import { HitBox } from "./HitBox";
import { HitChecker } from "./HitChecker";
import { CharacterBlowAwayProcessor } from "./CharacterBlowAwayProcessor";
import { LevelUpProcessor } from "./LevelUpProcessor";
import { PlayerBehavior } from "./PlayerBehavior";
import { MessageWindowController } from "./MessageWindowController";
import { Sprite_MapEventGauge } from "./Sprite_MapEventGauge";
import { Sprite_Label } from "./Sprite_Label";
import { Sprite_HitBox } from "./Sprite_HitBox";

declare global {
    interface Window {
        ARPG_BattlerParameters: new () => ARPG_BattlerParameters;
    }
}

simpleExport("ARPG_Core/ARPG_Actor/ARPG_Actor", ARPG_Actor);
simpleExport("ARPG_Core/ARPG_BattleManager/ARPG_BattleManager", ARPG_BattleManager);
simpleExport("ARPG_Core/ARPG_Battler/ARPG_Battler", ARPG_Battler);
simpleExport("ARPG_Core/ARPG_BattlerParameters/ARPG_BattlerParameters", ARPG_BattlerParameters);
simpleExport("ARPG_Core/ARPG_CharacterTempData/ARPG_CharacterTempData", ARPG_CharacterTempData);
simpleExport("ARPG_Core/ARPG_CorePluginParams/ARPG_CorePluginParams", ARPG_CorePluginParams);
simpleExport("ARPG_Core/ARPG_Effect/ARPG_Effect", ARPG_Effect);
simpleExport("ARPG_Core/ARPG_SkillObject/ARPG_SkillObject", ARPG_SkillObject);
simpleExport("ARPG_Core/ARPG_Enemy/ARPG_Enemy", ARPG_Enemy);
simpleExport("ARPG_Core/ARPG_Skill/ARPG_Skill", ARPG_Skill);
simpleExport("ARPG_Core/ARPG_Utils/ARPG_Utils", ARPG_Utils);
simpleExport("ARPG_Core/ARPG_CustomManager/ARPG_CustomManager", ARPG_CustomManager);
simpleExport("ARPG_Core/HitBox/HitBox", HitBox);
simpleExport("ARPG_Core/HitChecker/HitChecker", HitChecker);
simpleExport("ARPG_Core/CharacterBlowAwayProcessor/CharacterBlowAwayProcessor", CharacterBlowAwayProcessor);
simpleExport("ARPG_Core/LevelUpProcessor/LevelUpProcessor", LevelUpProcessor);
simpleExport("ARPG_Core/PlayerBehavior/PlayerBehavior", PlayerBehavior);
simpleExport("ARPG_Core/MessageWindowController/MessageWindowController", MessageWindowController);
simpleExport("ARPG_Core/Sprite_HitBox/Sprite_HitBox", Sprite_HitBox);
simpleExport("ARPG_Core/Sprite_MapEventGauge/Sprite_MapEventGauge", Sprite_MapEventGauge);
simpleExport("ARPG_Core/Sprite_Label/Sprite_Label", Sprite_Label);

import { ChainComponent } from "../CommonLibrary/ChainComponent";
import { CommonEventComponent } from "../CommonLibrary/CommonEventComponent";
import { Component } from "../CommonLibrary/Component";
import { ComponentRunner } from "../CommonLibrary/ComponentRunner";
import { Degree } from "../CommonLibrary/Degree";
import { HttpRequest } from "../CommonLibrary/HttpRequest";
import { HttpResponse } from "../CommonLibrary/HttpResponse";
import { MapLoader } from "../CommonLibrary/MapLoader";
import { mixin } from "../CommonLibrary/mixin";
import { PluginParamsParser } from "../CommonLibrary/PluginParamsParser";
import { Processor } from "../CommonLibrary/Processor";
import { TimerComponent } from "../CommonLibrary/TimerComponent";

simpleExport("CommonLibrary/ChainComponent/ChainComponent", ChainComponent);
simpleExport("CommonLibrary/CommonEventComponent/CommonEventComponent", CommonEventComponent);
simpleExport("CommonLibrary/Component/Component", Component);
simpleExport("CommonLibrary/ComponentRunner/ComponentRunner", ComponentRunner);
simpleExport("CommonLibrary/Degree/Degree", Degree);
simpleExport("CommonLibrary/HttpRequest/HttpRequest", HttpRequest);
simpleExport("CommonLibrary/HttpResponse/HttpResponse", HttpResponse);
simpleExport("CommonLibrary/MapLoader/MapLoader", MapLoader);
simpleExport("CommonLibrary/mixin/mixin", mixin);
simpleExport("CommonLibrary/PluginParamsParser/PluginParamsParser", PluginParamsParser);
simpleExport("CommonLibrary/Processor/Processor", Processor);
simpleExport("CommonLibrary/TimerComponent/TimerComponent", TimerComponent);

window.ARPG_BattlerParameters = ARPG_BattlerParameters;
