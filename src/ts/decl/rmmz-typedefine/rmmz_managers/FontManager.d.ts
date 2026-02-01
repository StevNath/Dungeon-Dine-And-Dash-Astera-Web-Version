declare class FontManager {
    constructor();
    static _urls: any;
    static _states: any;
    static load(family: string, filename: string): void;
    static isReady(): boolean;
    static startLoading(family: string, url: string): void;
    static throwLoadError(family: string): void;
    static makeUrl(filename: string): string;
}
