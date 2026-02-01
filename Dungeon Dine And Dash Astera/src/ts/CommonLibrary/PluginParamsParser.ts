export class PluginParamsParser {
    private _predictEnable: boolean;

    static parse(params: any, typeData: any = {}, predictEnable: boolean = true) {
        return new PluginParamsParser(predictEnable).parse(params, typeData);
    }

    constructor(predictEnable = true) {
        this._predictEnable = predictEnable;
    }

    parse(params: any, typeData: any = {}): any {
        const result: any = {};
        for (const name in params) {
            const expandedParam = this.expandParam(params[name]);
            result[name] = this.convertParam(expandedParam, typeData[name]);
        }
        return result;
    }

    expandParam(strParam: string, loopCount = 0) {
        if (++loopCount > 255) throw new Error("endless loop error");
        if (strParam.match(/^\s*\[.*\]\s*$/)) {
            const aryParam = JSON.parse(strParam);
            return aryParam.map((data: any) => this.expandParam(data), loopCount + 1);
        } else if (strParam.match(/^\s*\{.*\}\s*$/)) {
            const result: any = {};
            const objParam = JSON.parse(strParam);
            for (const name in objParam) {
                result[name] = this.expandParam(objParam[name], loopCount + 1);
            }
            return result;
        }
        return strParam;
    }

    convertParam(param: any, type: any, loopCount: number = 0): any {
        if (++loopCount > 255) throw new Error("endless loop error");
        if (typeof param === "string") {
            return this.cast(param, type);
        } else if (typeof param === "object" && param instanceof Array) {
            if (!((param == null) || (typeof param === "object" && param instanceof Array))) {
                throw new Error(`Invalid array type: ${type}`);
            }
            return param.map((data: any, i) => {
                const dataType: any = type == null ? undefined : type[i];
                return this.convertParam(data, dataType, loopCount + 1)
            });
        } else if (typeof param === "object") {
            if (!((param == null) || (typeof param === "object"))) {
                throw new Error(`Invalid object type: ${type}`);
            }
            const result: any = {};
            for (const name in param) {
                const dataType = type == null ? undefined : type[name];
                result[name] = this.convertParam(param[name], dataType, loopCount + 1);
            }
            return result;
        } else {
            throw new Error(`Invalid param: ${param}`);
        }
    }

    cast(param: any, type: any): any {
        if (param == null || param === "") return undefined;
        if (type == null) type = "any";
        switch (type) {
            case "any":
                if (!this._predictEnable) throw new Error("Predict mode is disable");
                return this.cast(param, this.predict(param));
            case "string":
                return param;
            case "number":
                if (param.match(/^\-?\d+\.\d+$/)) return parseFloat(param);
                return parseInt(param);
            case "boolean":
                return param === "true";
            default:
                throw new Error(`Unknow type: ${type}`);
        }
    }

    predict(param: any): string {
        if (param.match(/^\-?\d+$/) || param.match(/^\-?\d+\.\d+$/)) {
            return "number";
        } else if (param === "true" || param === "false") {
            return "boolean";
        } else {
            return "string";
        }
    }
}
