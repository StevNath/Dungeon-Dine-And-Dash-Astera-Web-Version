import { mixin } from "../../CommonLibrary/mixin";

declare global {
    interface Game_Temp {
        _mapDataCaches: Map<number, any>;
        _firstMapDataCacheMapId: number | undefined;

        mapDataCache(mapId: number): any;
        setMapDataCache(mapId: number, mapData: any): void;
    }
}

class Game_Temp_Mixin extends Game_Temp {
    static _initialize = Game_Temp.prototype.initialize;
    initialize() {
        Game_Temp_Mixin._initialize.call(this);
        this._mapDataCaches = new Map();
    }

    // mapIdが0の場合は初回に設定されたマップデータキャッシュを返す。
    mapDataCache(mapId: number) {
        if (mapId === 0) {
            if (this._firstMapDataCacheMapId == null) {
                throw new Error(`_firstMapDataCacheMapId is undefined.`);
            }
            return this._mapDataCaches.get(this._firstMapDataCacheMapId);
        }
        return this._mapDataCaches.get(mapId);
    }

    setMapDataCache(mapId: number, mapData: any) {
        if (this._firstMapDataCacheMapId == null) {
            this._firstMapDataCacheMapId = mapId;
        }
        this._mapDataCaches.set(mapId, mapData);
    }
}

mixin(Game_Temp, Game_Temp_Mixin);
