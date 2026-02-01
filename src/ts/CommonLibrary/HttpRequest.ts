import { HttpResponse } from "./HttpResponse";

export class HttpRequest {
    private _path: string;
    private _method: string;
    private _mimeType?: string;

    static get(path: string, opt: { mimeType?: string } = {}) {
        const req = new HttpRequest(path, "GET", opt);
        return req.send();
    }

    static post(path: string, params: any, opt: { mimeType?: string } = {}) {
        const req = new HttpRequest(path, "POST", opt);
        return req.send(params);
    }

    constructor(path: string, method: string, opt: { mimeType?: string } = {}) {
        this._path = path;
        this._method = method;
        this._mimeType = opt.mimeType == null ? undefined : opt.mimeType;
    }

    send(params = null) {
        const xhr = new XMLHttpRequest();
        xhr.open(this._method, this._path);
        if (this._mimeType) xhr.overrideMimeType(this._mimeType);
        let json;
        if (params) json = JSON.stringify(params);
        const promise = new Promise<HttpResponse>((resolve, reject) => {
            xhr.addEventListener("load", (e) => {
                resolve(new HttpResponse("load", xhr));
            });
            xhr.addEventListener("error", (e) => {
                reject(new HttpResponse("error", xhr));
            });
        });
        xhr.send(json);
        return promise;
    }
}
