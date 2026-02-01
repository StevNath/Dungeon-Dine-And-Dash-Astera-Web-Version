import { HttpRequest } from "./HttpRequest";

export class MapLoader {
    protected _mapId: number;
    protected _mapData?: any;

    constructor(mapId: any) {
        this._mapId = mapId;
        this.loadMap();
    }

    mapId(): number {
        return this._mapId;
    }

    isLoaded() {
        return !!this._mapData;
    }

    mapData() {
        return this._mapData;
    }

    loadMap() {
        const fileName = "Map%1.json".format(this._mapId.padZero(3));
        this.loadData(fileName);
    }

    async loadData(fileName: string) {
        const res = await HttpRequest.get(`data/${fileName}`, { mimeType: "application/json" });
        if (res.result() === "error") {
            throw new Error(`Unknow file: ${fileName}`);
        } else if (res.status() === 200) {
            this._mapData = JSON.parse(res.response());
        } else {
            throw new Error(`Load failed: ${fileName}`);
        }
    }
}
