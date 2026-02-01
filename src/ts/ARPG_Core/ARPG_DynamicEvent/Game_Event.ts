import { ARPG_CorePluginParams } from "../ARPG_Config";
import { mixin } from "../../CommonLibrary/mixin";

declare global {
    interface Game_Event {
        new(mapId: number, eventId: number, opt?: { isDynamicEvent?: boolean, srcMapId?: number, srcEventId?: number }): Game_Event;
        initialize(mapId: number, eventId: number, opt?: { isDynamicEvent?: boolean, srcMapId?: number, srcEventId?: number }): Game_Event;
        isDynamicEvent(): boolean
        isErased(): boolean;
    }
}

class Game_Event_Mixin extends Game_Event {
    static _initialize = Game_Event.prototype.initialize;
    static _initMembers = Game_Event.prototype.initMembers;
    static _event = Game_Event.prototype.event;
    static _refresh = Game_Event.prototype.refresh;

    protected _isDynamicEvent!: boolean;
    protected _srcMapId!: number;
    protected _srcEventId!: number;
    protected _copied!: boolean;

    initMembers(): void {
        Game_Event_Mixin._initMembers.call(this);
        this._isDynamicEvent = false;
        this._srcMapId = 0;
        this._srcEventId = 0;
        this._copied = false;
    }

    // @ts-ignore // TODO: 暫定
    initialize(mapId: number, eventId: number, opt: { isDynamicEvent?: boolean, srcMapId?: number, srcEventId?: number } = {}): void {
        Game_Character.prototype.initialize.call(this);
        this._mapId = mapId;
        this._eventId = eventId;
        if (opt.isDynamicEvent) {
            if (opt.srcMapId == null) throw new Error(`opt.srcMapId is not defined.`);
            if (opt.srcEventId == null) throw new Error(`opt.srcEventId is not defined.`);
            this._isDynamicEvent = true;
            this.setupCopyEvent(opt.srcMapId, opt.srcEventId);
        }
        this.locate(this.event().x, this.event().y);
        this.refresh();
        this.initCopyEventProcess();
        if (this.event().meta.PushableEvent) {
            this._pushableEvent = true;
        } else {
            const values = this.getAnnotationValues(0);
            if (values.PushableEvent) {
                this._pushableEvent = true;
            }
        }
    }

    isDynamicEvent(): boolean {
        return this._isDynamicEvent;
    }

    isErased(): boolean {
        return this._erased;
    }

    setupCopyEvent(srcMapId: number, srcEventId: number): void {
        if (!this._copied) {
            globalActiveEvent = this as unknown as Game_Event;
            this._copied = true;
            this._srcMapId = srcMapId;
            this._srcEventId = srcEventId;
            const newPageIndex = this._erased ? -1 : this.findProperPageIndex();
            this._pageIndex = newPageIndex;
            this.setupPage();
            globalActiveEvent = undefined;
        }
    }

    event(): any {
        if (this._copied) {
            const mapData = $gameTemp.mapDataCache(this._srcMapId);
            return mapData.events[this._srcEventId];
        } else {
            return Game_Event_Mixin._event.call(this);
        }
    }

    initCopyEventProcess(): void {
        const tag = this.event().meta[ARPG_CorePluginParams.CopyEventSetting.CopyEventTag];
        if (!tag) return;
        let md: RegExpMatchArray;
        let mapIds: number[];
        let srcEventIdOrName: string;
        if (md = tag.match(/\s*(.+)\,(.+)/)) {
            mapIds = [parseInt(md[1])];
            srcEventIdOrName = md[2];
        } else if (md = tag.match(/\s*(.+)/)) {
            mapIds = ARPG_CorePluginParams.CopyEventSetting.DynamicEventSrcMapIds;
            srcEventIdOrName = md[1];
        } else {
            return;
        }

        for (const mapId of mapIds) {
            const mapData = $gameTemp.mapDataCache(mapId);
            for (const eventData of mapData.events) {
                if (!eventData) continue;
                let eventMatched = false;
                if (srcEventIdOrName.match(/^\d+$/)) {
                    if (eventData.id === parseInt(srcEventIdOrName)) eventMatched = true;
                } else {
                    if (eventData.name === srcEventIdOrName) eventMatched = true;
                }
                if (eventMatched) {
                    this.setupCopyEvent(mapId, eventData.id);
                    return;
                }
            }
        }
    }
}

mixin(Game_Event, Game_Event_Mixin);
