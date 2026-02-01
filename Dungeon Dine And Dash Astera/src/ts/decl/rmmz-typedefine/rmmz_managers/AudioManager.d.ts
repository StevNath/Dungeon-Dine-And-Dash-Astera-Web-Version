declare class AudioManager {
    constructor();
    static _bgmVolume: number;
    static _bgsVolume: number;
    static _meVolume: number;
    static _seVolume: number;
    static _currentBgm: any;
    static _currentBgs: any;
    static _bgmBuffer: any;
    static _bgsBuffer: any;
    static _meBuffer: any;
    static _seBuffers: any;
    static _staticBuffers: any;
    static _replayFadeTime: number;
    static _path: string;
    static _currentMe: any;
    static get bgmVolume(): number;
    static set bgmVolume(value: number);
    static get bgsVolume(): number;
    static set bgsVolume(value: number);
    static get meVolume(): number;
    static set meVolume(value: number);
    static get seVolume(): number;
    static set seVolume(value: number);
    static playBgm(bgm: IAudioObject | null, pos?: number): void;
    static replayBgm(bgm: any): void;
    static isCurrentBgm(bgm: IAudioObject | null): any;
    static updateBgmParameters(bgm: any): void;
    static updateCurrentBgm(bgm: any, pos: number | undefined): void;
    static stopBgm(): void;
    static fadeOutBgm(duration: number): void;
    static fadeInBgm(duration: any): void;
    static playBgs(bgs: any, pos?: number): void;
    static replayBgs(bgs: any): void;
    static isCurrentBgs(bgs: any): any;
    static updateBgsParameters(bgs: any): void;
    static updateCurrentBgs(bgs: any, pos: any): void;
    static stopBgs(): void;
    static fadeOutBgs(duration: number): void;
    static fadeInBgs(duration: any): void;
    static playMe(me: {
        name: any;
    }): void;
    static updateMeParameters(me: any): void;
    static fadeOutMe(duration: number): void;
    static stopMe(): void;
    static playSe(se: {
        name: any;
    }): void;
    static updateSeParameters(buffer: any, se: any): void;
    static cleanupSe(): void;
    static stopSe(): void;
    static playStaticSe(se: {
        name: any;
    }): void;
    static loadStaticSe(se: {
        name: any;
    }): void;
    static isStaticSe(se: {
        name: any;
    }): boolean;
    static stopAll(): void;
    static saveBgm(): IAudioObject | {
        name: any;
        volume: any;
        pitch: any;
        pan: any;
        pos: any;
    };
    static saveBgs(): IAudioObject | {
        name: any;
        volume: any;
        pitch: any;
        pan: any;
        pos: any;
    };
    static makeEmptyAudioObject(): IAudioObject;
    static createBuffer(folder: string, name: any): any;
    static updateBufferParameters(buffer: {
        volume: number;
        pitch: number;
        pan: number;
    }, configVolume: number, audio: {
        volume: any;
        pitch: any;
        pan: any;
    }): void;
    static audioFileExt(): string;
    static checkErrors(): void;
    static throwLoadError(webAudio: {
        retry: {
            bind: (arg0: any) => any;
        };
        url: any;
    }): void;
}
interface IAudioObject {
    name: string;
    volume: number;
    pitch: number;
    pan?: number;
    pos?: number;
}
