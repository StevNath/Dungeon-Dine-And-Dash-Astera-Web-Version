declare class EffectManager {
    constructor();
    static _cache: any;
    static _errorUrls: string[];
    static load(filename: string): any;
    static startLoading(url: string): any;
    static clear(): void;
    static onLoad(url: string): void;
    static onError(url: string): void;
    static makeUrl(filename: string): string;
    static checkErrors(): void;
    static throwLoadError(url: string): void;
    static isReady(): boolean;
}
