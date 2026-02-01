/*!/*:ja
@target MZ
@plugindesc マップアクターステータス v1.1.0
@author うなぎおおとろ

@help
マップ上にアクターのステータスを表示するプラグインです。

【使用方法】
プラグインパラメータ「マップアクターステータス有効化スイッチID」で指定した
スイッチがONになるとアクターのステータスをマップ上に表示します。

@param EnableMapActorStatusSwitchId
@text マップアクターステータス有効化スイッチID
@type switch
@default 0
@desc
マップ上でのアクターのステータス表示を有効化するスイッチIDを指定します。0を指定した場合常に有効になります。

@param LeaderOnly
@text 先頭キャラクターのみ表示
@type boolean
@default false
@desc
ONを設定すると先頭キャラクターのみをステータス表示の対象とします。

@param StatusAreaX
@text ステータスエリアX
@type number
@default 40
@desc
ステータスエリアの表示X座標を指定します。

@param StatusAreaY
@text ステータスエリアY
@type number
@default 480
@desc
ステータスエリアの表示Y座標を指定します。

@param StatusAreaSpace
@text ステータスエリア表示間隔
@type number
@default 260
@desc
アクターごとのステータスエリアの表示間隔を指定します。

@param GaugeWidth
@text ゲージ横幅
@type number
@default 128
@desc
ゲージの横幅を指定します。

@param GaugeHeight
@text ゲージ縦幅
@type number
@default 24
@desc
ゲージの縦幅を指定します。
*/

import { PluginParamsParser } from "../CommonLibrary/PluginParamsParser";

export const MapActorStatusPluginName = document.currentScript ? decodeURIComponent((document.currentScript as HTMLScriptElement).src.match(/^.*\/(.+)\.js$/)![1]) : "MapActorStatus";

declare global {
    interface Spriteset_Map {
        _partyContainer: PartyContainer;

        createPartyContainer(): void;
        showPartyContainer(): void;
        hidePartyContainer(): void;
    }
}

export interface IMapActorStatusPluginParams {
    EnableMapActorStatusSwitchId: number;
    LeaderOnly: boolean;
    GaugeWidth: number;
    GaugeHeight: number;
    StatusAreaX: number;
    StatusAreaY: number;
    StatusAreaSpace: number;
}

export const MapActorStatusPluginParams: IMapActorStatusPluginParams = PluginParamsParser.parse(PluginManager.parameters(MapActorStatusPluginName));


export class ActorContainer extends PIXI.Container {
    static get GAUGE_START_X() { return 64; }
    static get GAUGE_SPACE_X() { return 16; }
    static get GAUGE_START_Y() { return 12; }
    static get GAUGE_SPACE_Y() { return 0; }

    private _actor?: Game_Actor;
    private _hpGauge!: Sprite_MapGauge;
    private _mpGauge!: Sprite_MapGauge;
    private _tpGauge?: Sprite_MapGauge;
    private _actorImage!: Sprite_ActorImage;
    private _nameLabel!: Sprite_Label;
    private _stateSprites!: Sprite_Icon[];
    private _lastStates!: number[];

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.createHpGauge();
        this.createMpGauge();
        if ($dataSystem.optDisplayTp) {
            this.createTpGauge();
        }
        this.createActorImage();
        this.createNameLabel();
        this._lastStates = [];
        this._stateSprites = [];
    }

    update() {
        for (const child of this.children) {
            if ((child as any).update) (child as any).update();
        }
        this.updateStateIcons();
    }

    createHpGauge() {
        this._hpGauge = new Sprite_MapGauge();
        this._hpGauge.x = ActorContainer.GAUGE_START_X;
        this._hpGauge.y = ActorContainer.GAUGE_START_Y;
        this.addChild(this._hpGauge as any);
    }

    createMpGauge() {
        this._mpGauge = new Sprite_MapGauge();
        this._mpGauge.x = ActorContainer.GAUGE_START_X + ActorContainer.GAUGE_SPACE_X;
        this._mpGauge.y = ActorContainer.GAUGE_START_Y + this._hpGauge.height + ActorContainer.GAUGE_SPACE_Y;
        this.addChild(this._mpGauge as any);
    }

    createTpGauge() {
        this._tpGauge = new Sprite_MapGauge();
        this._tpGauge.x = this._mpGauge.x + ActorContainer.GAUGE_SPACE_X;
        this._tpGauge.y = this._mpGauge.y + this._mpGauge.height + ActorContainer.GAUGE_SPACE_Y;
        this.addChild(this._tpGauge as any);
    }

    createActorImage() {
        this._actorImage = new Sprite_ActorImage();
        this._actorImage.x -= 8;
        this._actorImage.y = this._hpGauge.height / 4;
        this.addChild(this._actorImage);
    }

    createNameLabel() {
        this._nameLabel = new Sprite_Label(80, 16, { fontSize: 16, align: "center" });
        this._nameLabel.anchor.x = 0.5;
        this._nameLabel.anchor.y = 0;
        this._nameLabel.x = this._actorImage.x + (144 * 0.5) / 2;
        this._nameLabel.y = this._mpGauge.y + 32;
        this.addChild(this._nameLabel);
    }

    setup(actor: Game_Actor) {
        this._actor = actor;
        this._actorImage.setup(actor);
        this._nameLabel.text = actor.name();
        this._hpGauge.setup(actor, "hp");
        this._mpGauge.setup(actor, "mp");
        this._tpGauge?.setup(actor, "tp");
    }

    delete(): void {
        this._actorImage.bitmap?.destroy();
        this._nameLabel.bitmap?.destroy();
    }

    private updateStateIcons(): void {
        if (!this._actor) return;
        const stateIds = this._actor.states().map(state => state.id);
        if (!this._lastStates.equals(stateIds)) {
            this._lastStates = stateIds;
            for (const sprite of this._stateSprites) {
                this.removeChild(sprite);
            }
            this._stateSprites = [];
            for (let i = 0; i < stateIds.length; i++) {
                const sprite = new Sprite_Icon();
                // TODO: 位置調整
                sprite.x = this._nameLabel.x + i * 32;
                sprite.y = this._nameLabel.y + this._nameLabel.height;
                const state = $dataStates[stateIds[i]];
                sprite.setIconIndex(state.iconIndex);
                this._stateSprites.push(sprite);
                this.addChild(sprite);
            }
        }
    }
}


export class PartyContainer extends PIXI.Container {
    private _actorContainers: ActorContainer[] = [];
    private _lastMembers: Game_Actor[] = [];

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    update() {
        for (const child of this.children) {
            if ((child as any).update) (child as any).update();
        }
        this.visible = this.isMapActorStatusEnabled();
        this.updateActorContainers();
    }

    updateActorContainers(): void {
        let members;
        if (MapActorStatusPluginParams.LeaderOnly) {
            members = [$gameParty.leader()];
        } else {
            members = $gameParty.members();
        }
        if (this._lastMembers.equals(members)) return;

        if (this._lastMembers.length < members.length) {
            for (let i = this._lastMembers.length; i < members.length; i++) {
                const actorContainer = new ActorContainer(i * MapActorStatusPluginParams.StatusAreaSpace, 0);
                this._actorContainers.push(actorContainer);
                this.addChild(actorContainer);
            }
        } else if (this._lastMembers.length > members.length) {
            for (let i = members.length; i < this._lastMembers.length; i++) {
                const deleteContainers = this._actorContainers.splice(i, 1);
                for (const deleteContainer of deleteContainers) {
                    this.removeChild(deleteContainer);
                    deleteContainer.delete();
                }
            }
        }

        members.forEach((actor, i) => {
            this._actorContainers[i].setup(actor);
        });

        this._lastMembers = members;
    }

    protected isMapActorStatusEnabled(): boolean {
        if (MapActorStatusPluginParams.EnableMapActorStatusSwitchId === 0) return true;
        return $gameSwitches.value(MapActorStatusPluginParams.EnableMapActorStatusSwitchId);
    }
}


export class Sprite_ActorImage extends Sprite {
    private _actor?: Game_Actor;
    private _lastActor?: Game_Actor;

    initialize() {
        super.initialize();
        this._actor = undefined;
    }

    update() {
        super.update();
        this.updateActorImage();
    }

    setup(actor: Game_Actor) {
        this._actor = actor;
        this.refresh();
    }

    updateActorImage() {
        if (!this._actor || this._actor === this._lastActor) return;
        this.refresh();
        this._lastActor = this._actor;
    }

    refresh(): void {
        if (!this._actor) return;
        if (this.bitmap) {
            this.bitmap.destroy();
        }
        const faceName = this._actor.faceName();
        const faceIndex = this._actor.faceIndex();
        const faceBitmap = ImageManager.loadFace(faceName);
        if (!faceBitmap.isReady()) return;
        const dstBitmap = new Bitmap(144, 144);
        this.actorImageDrawFace(dstBitmap, faceBitmap, faceIndex);
        this.bitmap = dstBitmap;
        this.scale.x = 0.5;
        this.scale.y = 0.5;
    }

    protected actorImageDrawFace(dstBitmap: Bitmap, faceBitmap: Bitmap, faceIndex: number): void {
        const tmpBitmap = this.createSingleFaceBitmap(faceBitmap, faceIndex);
        let ctx = dstBitmap.context;
        let x = 0;
        let y = 0;
        let w = dstBitmap.width;
        let h = dstBitmap.height;
        let len = 8;
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y + len);
        ctx.lineTo(x + w - len, y + h / 2);
        ctx.lineTo(x + w / 2, y + h - len);
        ctx.lineTo(x + len, y + h / 2);
        ctx.closePath();

        const cx = dstBitmap.width / 2;
        const cy = dstBitmap.height / 2;
        const grdCx = dstBitmap.width / 3;
        const grdCy = dstBitmap.height / 3;
        const r = dstBitmap.width / 2
        const grd = ctx.createRadialGradient(grdCx, grdCy, 0, cx, cy, r);
        // grd.addColorStop(0, "#ffff00");
        grd.addColorStop(0, "#aaaaff");
        grd.addColorStop(0.99, "#ffffaa");
        grd.addColorStop(1, "#ffffff");

        ctx.strokeStyle = "#88ffff";
        ctx.lineWidth = len;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.clip();
        ctx.drawImage(tmpBitmap.canvas, 0, 0);
    }

    createSingleFaceBitmap(faceBitmap: Bitmap, faceIndex: number) {
        const dstBitmap = new Bitmap(144, 144);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sw = Math.min(dstBitmap.width, pw);
        const sh = Math.min(dstBitmap.height, ph);
        const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
        const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        dstBitmap.blt(faceBitmap, sx, sy, pw, ph, 0, 0);
        return dstBitmap;
    }
}


export class Sprite_Icon extends Sprite {
    setIconIndex(iconIndex: number) {
        if (iconIndex > 0) {
            if (!this.bitmap) {
                this.bitmap = ImageManager.loadSystem("IconSet");
            }
            const iconFrame = this.iconFrame(iconIndex);
            this.setFrame(iconFrame.x, iconFrame.y, iconFrame.width, iconFrame.height);
        } else {
            this.bitmap = null;
        }
    }

    iconFrame(iconIndex: number) {
        let pw, ph;
        if (Utils.RPGMAKER_NAME === "MZ") {
            pw = ImageManager.iconWidth;
            ph = ImageManager.iconHeight;
        } else {
            pw = 32;
            ph = 32;
        }
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        return new Rectangle(sx, sy, pw, ph);
    }
}


export interface ILabelOption {
    fontSize?: number;
    fontFace?: string;
    align?: CanvasTextAlign;
}

export class Sprite_Label extends Sprite {
    private _text!: string;
    private _align!: CanvasTextAlign;

    constructor(width: number, height: number, opt?: ILabelOption);

    constructor(...args: []) {
        super(...args);
    }

    initialize(width: number, height: number, opt?: ILabelOption): void;

    initialize(...args: any[]): void {
        super.initialize();
        let width: number;
        let height: number;
        let opt: ILabelOption;
        if (args.length === 2) {
            [width, height] = args;
            opt = {};
        } else {
            [width, height, opt] = args;
        }
        this._text = "";
        this._align = opt.align ?? "left";
        this.bitmap = new Bitmap(width, height);
        this.bitmap.fontFace = opt.fontFace ?? $gameSystem.mainFontFace();
        this.bitmap.fontSize = opt.fontSize ?? $gameSystem.mainFontSize();
    }

    get text() {
        return this._text;
    }

    set text(_text) {
        this._text = _text;
        this.redrawText();
    }

    get fontSize() {
        return this.bitmap.fontSize;
    }

    set fontSize(_fontSize) {
        this.bitmap.fontSize = _fontSize;
        this.redrawText();
    }

    get fontFace() {
        return this.bitmap.fontFace;
    }

    set fontFace(_fontFace) {
        this.bitmap.fontFace = _fontFace;
        this.redrawText();
    }

    get align() {
        return this.bitmap.fontFace;
    }

    set align(_align) {
        this._align = _align
        this.redrawText();
    }

    private redrawText() {
        if (this._text === "") {
            this.hide();
        } else {
            this.show();
            this.bitmap.clear();
            this.bitmap.drawText(this._text, 0, 0, this.bitmap.width, this.bitmap.fontSize, this._align);
        }
    }
}


export class Sprite_MapGauge extends Sprite_Gauge {
    createBitmap() {
        const width = this.bitmapWidth() + this.bitmapLen();
        const height = this.bitmapHeight();
        this.bitmap = new Bitmap(width, height);
    }

    gaugeX() {
        return this.labelOutlineWidth() / 2;
    }

    labelY() {
        return 0;
    }

    drawLabel() {
        const label = this.label();
        const x = this.labelOutlineWidth() + 24;
        const y = this.labelY();
        const width = this.bitmapWidth();
        const height = this.bitmapHeight();
        this.setupLabelFont();
        this.bitmap.paintOpacity = this.labelOpacity();
        this.bitmap.drawText(label, x, y, width, height, "left");
        this.bitmap.paintOpacity = 255;
    }

    drawGauge() {
        const gaugeX = this.gaugeX();
        const gaugeY = this.bitmapHeight() - this.gaugeHeight();
        const gaugewidth = this.bitmapWidth() - gaugeX;
        const gaugeHeight = this.gaugeHeight();
        this.drawGaugeRect(gaugeX, gaugeY, gaugewidth, gaugeHeight);
    }

    drawGaugeRect(x: number, y: number, width: number, height: number) {
        const rate = this.gaugeRate();
        const fillX = x + 1;
        const fillY = y + 1;
        const fillW = Math.floor((width - 2) * rate);
        const fillH = height - 2;
        const color0 = this.gaugeBackColor();
        const color1 = this.gaugeColor1();
        const color2 = this.gaugeColor2();

        let ctx = this.bitmap.context;
        let len = 8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x + len, y);
        ctx.lineTo(x + len + width, y);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x, y + height);
        ctx.closePath();
        ctx.fillStyle = color0;
        ctx.fill();

        ctx = this.bitmap.context;
        ctx.beginPath();
        ctx.moveTo(fillX + len, fillY);
        ctx.lineTo(fillX + len + fillW, fillY);
        ctx.lineTo(fillX + fillW, fillY + fillH);
        ctx.lineTo(fillX, fillY + fillH);
        ctx.closePath();
        const grad = ctx.createLinearGradient(fillX, y, fillX + fillW, fillY + fillH);
        grad.addColorStop(0, color1);
        grad.addColorStop(1, color2);
        ctx.fillStyle = grad;
        ctx.fill();
    }

    bitmapLen() {
        return 20;
    }

    bitmapWidth() {
        return MapActorStatusPluginParams.GaugeWidth;
    }

    bitmapHeight() {
        return MapActorStatusPluginParams.GaugeHeight;
    }

    gaugeHeight() {
        return this.bitmapHeight() - 12;
    }
}


const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);
    this.createPartyContainer();
};

Spriteset_Map.prototype.createPartyContainer = function() {
    this._partyContainer = new PartyContainer(MapActorStatusPluginParams.StatusAreaX, MapActorStatusPluginParams.StatusAreaY);
    this.addChild(this._partyContainer);
};
