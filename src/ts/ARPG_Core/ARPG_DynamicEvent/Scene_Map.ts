import { ARPG_CorePluginParams } from "../ARPG_Config";
import { MapLoader } from "../../CommonLibrary/MapLoader";
import { mixin } from "../../CommonLibrary/mixin";

export class Scene_Map_Mixin extends Scene_Map {
    static _initialize = Scene_Map.prototype.initialize;
    static _create = Scene_Map.prototype.create;
    static _isReady = Scene_Map.prototype.isReady;
    static _onMapLoaded = Scene_Map.prototype.onMapLoaded;

    protected _mapLoaders!: MapLoader[];

    initialize(): void {
        Scene_Map_Mixin._initialize.call(this);
        this._mapLoaders = [];
    }

    create() {
        Scene_Map_Mixin._create.call(this);
        this.preMapLoad();
    }

    isReady(): boolean {
        // NOTE: isReadyのコンテキストでonMapLoadedをコールするため、それよりも前にmapLoaderの確認を行う。
        for (const mapLoader of this._mapLoaders) {
            if (!mapLoader.isLoaded()) return false;
        }
        return Scene_Map_Mixin._isReady.call(this);
    }

    onMapLoaded(): void {
        // NOTE: onMapLoadedのコンテキストでイベントを初期化するため、それよりも前にマップデータを設定する。
        for (const mapLoader of this._mapLoaders) {
            const mapData = mapLoader.mapData();
            $gameTemp.setMapDataCache(mapLoader.mapId(), mapData);
            DataManager.extractMetadata(mapData);
            DataManager.extractArrayMetadata(mapData.events);
        }
        Scene_Map_Mixin._onMapLoaded.call(this);
    }

    preMapLoad(): void {
        for (const mapId of ARPG_CorePluginParams.CopyEventSetting.DynamicEventSrcMapIds) {
            const mapData = $gameTemp.mapDataCache(mapId);
            if (!mapData) {
                const mapLoader = new MapLoader(mapId);
                this._mapLoaders.push(mapLoader);
            }
        }
    }
}

mixin(Scene_Map, Scene_Map_Mixin);
