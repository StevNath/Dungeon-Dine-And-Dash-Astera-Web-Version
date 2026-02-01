export class HttpResponse {
    private _result: string;
    private _xhr: XMLHttpRequest;

    constructor(result: string, xhr: XMLHttpRequest) {
        this._result = result;
        this._xhr = xhr;
    }

    result() {
        return this._result;
    }

    status() {
        return this._xhr.status;
    }

    response() {
        return this._xhr.response;
    }
}
