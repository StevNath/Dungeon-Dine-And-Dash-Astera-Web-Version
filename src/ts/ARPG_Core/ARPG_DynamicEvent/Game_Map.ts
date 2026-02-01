import { mixin } from "../../CommonLibrary/mixin";

declare global {
    interface Game_Map {
        makeDynamicEvent(srcMapId: number, srcEventIdOrName: number | string, x?: number, y?: number): Game_Event;
    }
}

class Game_Map_Mixin extends Game_Map {
    static _initialize = Game_Map.prototype.initialize;
    static _setup = Game_Map.prototype.setup;
    static _update = Game_Map.prototype.update;
    static _eraseEvent = Game_Map.prototype.eraseEvent;

    protected _makeEventId!: number;

    initialize(): void {
        Game_Map_Mixin._initialize.call(this);
        this._makeEventId = 0;
    }

    setup(mapId: number): void {
        Game_Map_Mixin._setup.call(this, mapId);
        this._makeEventId = 0;
    }

    update(sceneActive: boolean): void {
        Game_Map_Mixin._update.call(this, sceneActive);
        for (const event of this.events()) {
            if (event.isDynamicEvent() && event.isErased()) {
                this.eraseDynamicEvent(event.eventId());
            }
        }
    }

    makeDynamicEvent(srcMapId: number, srcEventIdOrName: number | string, x: number = 0, y: number = 0): Game_Event {
        let srcEventId;
        if (typeof srcEventIdOrName === "number") {
            srcEventId = srcEventIdOrName;
        } else if (srcEventIdOrName.match(/^\d+$/)) {
            srcEventId = parseInt(srcEventIdOrName);
        } else {
            srcEventId = this.nameToId(srcMapId, srcEventIdOrName);
        }

        if (this._makeEventId === 0) {
            this._makeEventId = this.maxEventId();
        }
        this._makeEventId++;

        const opt = { isDynamicEvent: true, srcMapId, srcEventId };
        // TODO: 暫定でanyにキャスト
        const event = new (Game_Event as any)($gameMap.mapId(), this._makeEventId, opt);
        this._events[event.eventId()] = event;
        event.setPosition(x, y);
        return event;
    }

    eraseEvent(eventId: number): void {
        Game_Map_Mixin._eraseEvent.call(this, eventId);
        const event = $gameMap.event(eventId);
        if (event.isDynamicEvent()) {
            this.eraseDynamicEvent(eventId);
        }
    }

    private eraseDynamicEvent(eventId: number) {
        (this._events as any)[eventId] = undefined;
        delete this._events[eventId];
        $gameSelfSwitches.clearSelfSwitches(this._mapId, eventId);
        $gameVariables.clearSelfVariables(this._mapId, eventId);
        $gameSwitches.clearExSelfSwitches(this._mapId, eventId);
    }

    private maxEventId() {
        let maxEventId = 0;
        for (const event of $gameMap.events()) {
            if (event.eventId() > maxEventId) {
                maxEventId = event.eventId();
            }
        }
        return maxEventId;
    }

    private nameToId(srcMapId: number, srcEventName: string): number {
        const mapData = $gameTemp.mapDataCache(srcMapId);
        for (const eventData of mapData.events) {
            if (!eventData) continue;
            if (eventData.name === srcEventName) {
                return eventData.id;
            }
        }
        throw new Error(`Event name(${srcEventName}) is not found.`);
    }
}

mixin(Game_Map, Game_Map_Mixin);
