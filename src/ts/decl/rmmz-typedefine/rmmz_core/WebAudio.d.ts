/**
 * The audio object of Web Audio API.
 *
 * @class
 * @param {string} url - The url of the audio file.
 */
declare class WebAudio {
    static _context: AudioContext | null;
    static _masterGainNode: any;
    static _masterVolume: number;
    protected _url: string;
    protected _data: any;
    protected _fetchedSize: number;
    protected _fetchedData: any[];
    protected _buffers: any[];
    protected _sourceNodes: any[];
    protected _gainNode: any;
    protected _pannerNode: any;
    protected _totalTime: number;
    protected _sampleRate: number;
    protected _loop: boolean | number;
    protected _loopStart: number;
    protected _loopLength: number;
    protected _loopStartTime: number;
    protected _loopLengthTime: number;
    protected _startTime: number;
    protected _volume: number;
    protected _pitch: number;
    protected _pan: number;
    protected _endTimer: any;
    protected _loadListeners: any[];
    protected _stopListeners: any[];
    protected _lastUpdateTime: number;
    protected _isLoaded: boolean;
    protected _isError: boolean;
    protected _isPlaying: boolean;
    protected _decoder: any;
    constructor(url: string);
    initialize(url: string): void;
    /**
     * Initializes the audio system.
     *
     * @returns {boolean} True if the audio system is available.
     */
    static initialize(): boolean;
    /**
     * Sets the master volume for all audio.
     *
     * @param {number} value - The master volume (0 to 1).
     */
    static setMasterVolume(value: number): void;
    static _createContext(): void;
    static _currentTime(): number;
    static _createMasterGainNode(): void;
    static _setupEventHandlers(): void;
    static _onUserGesture(): void;
    static _onVisibilityChange(): void;
    static _onHide(): void;
    static _onShow(): void;
    static _shouldMuteOnHide(): boolean;
    static _resetVolume(): void;
    static _fadeIn(duration: number): void;
    static _fadeOut(duration: number): void;
    /**
     * Clears the audio data.
     */
    clear(): void;
    /**
     * The url of the audio file.
     *
     * @readonly
     * @type string
     * @name WebAudio#url
     */
    get url(): string;
    /**
     * The volume of the audio.
     *
     * @type number
     * @name WebAudio#volume
     */
    get volume(): number;
    set volume(value: number);
    /**
     * The pitch of the audio.
     *
     * @type number
     * @name WebAudio#pitch
     */
    get pitch(): number;
    set pitch(value: number);
    /**
     * The pan of the audio.
     *
     * @type number
     * @name WebAudio#pan
     */
    get pan(): number;
    set pan(value: number);
    /**
     * Checks whether the audio data is ready to play.
     *
     * @returns {boolean} True if the audio data is ready to play.
     */
    isReady(): boolean;
    /**
     * Checks whether a loading error has occurred.
     *
     * @returns {boolean} True if a loading error has occurred.
     */
    isError(): boolean;
    /**
     * Checks whether the audio is playing.
     *
     * @returns {boolean} True if the audio is playing.
     */
    isPlaying(): boolean;
    /**
     * Plays the audio.
     *
     * @param {boolean} loop - Whether the audio data play in a loop.
     * @param {number} offset - The start position to play in seconds.
     */
    play(loop: boolean, offset?: number): void;
    /**
     * Stops the audio.
     */
    stop(): void;
    /**
     * Destroys the audio.
     */
    destroy(): void;
    /**
     * Performs the audio fade-in.
     *
     * @param {number} duration - Fade-in time in seconds.
     */
    fadeIn(duration: any): void;
    /**
     * Performs the audio fade-out.
     *
     * @param {number} duration - Fade-out time in seconds.
     */
    fadeOut(duration: any): void;
    /**
     * Gets the seek position of the audio.
     */
    seek(): number;
    /**
     * Adds a callback function that will be called when the audio data is loaded.
     *
     * @param {function} listner - The callback function.
     */
    addLoadListener(listner: {
        (): void;
        (): void;
    }): void;
    /**
     * Adds a callback function that will be called when the playback is stopped.
     *
     * @param {function} listner - The callback function.
     */
    addStopListener(listner: any): void;
    /**
     * Tries to load the audio again.
     */
    retry(): void;
    _startLoading(): void;
    _shouldUseDecoder(): boolean;
    _createDecoder(): any;
    _destroyDecoder(): void;
    _realUrl(): string;
    _startXhrLoading(url: string | URL): void;
    _startFetching(url: URL | RequestInfo): void;
    _onXhrLoad(xhr: XMLHttpRequest): void;
    _onFetch(response: Response): void;
    _onError(): void;
    _onFetchProcess(value: string | any[]): void;
    _updateBufferOnFetch(): void;
    _concatenateFetchedData(): void;
    _updateBuffer(): void;
    _readableBuffer(): any;
    _decodeAudioData(arrayBuffer: any[]): void;
    _onDecode(buffer: {
        duration: number;
    }): void;
    _refreshSourceNode(): void;
    _startPlaying(offset: number): void;
    _startAllSourceNodes(): void;
    _startSourceNode(index: number): void;
    _stopSourceNode(): void;
    _createPannerNode(): void;
    _createGainNode(): void;
    _createAllSourceNodes(): void;
    _createSourceNode(index: number): void;
    _removeNodes(): void;
    _createEndTimer(): void;
    _removeEndTimer(): void;
    _updatePanner(): void;
    _onLoad(): void;
    _readLoopComments(arrayBuffer: ArrayBufferLike): void;
    _readMetaData(view: DataView, index: number, size: number): void;
    _readFourCharacters(view: DataView, index: number): string;
}
