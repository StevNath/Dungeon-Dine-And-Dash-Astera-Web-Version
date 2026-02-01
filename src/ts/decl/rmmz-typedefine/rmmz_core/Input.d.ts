/**
 * The static class that handles input data from the keyboard and gamepads.
 *
 * @namespace
 */
declare class Input {
    static _currentState: any;
    static _previousState: any;
    static _gamepadStates: any[];
    static _latestButton: any;
    static _pressedTime: number;
    static _dir4: number;
    static _dir8: number;
    static _preferredAxis: string;
    static _date: number;
    static _virtualButton: any;
    constructor();
    /**
     * Initializes the input system.
     */
    static initialize(): void;
    /**
     * The wait time of the key repeat in frames.
     *
     * @type number
     */
    static keyRepeatWait: number;
    /**
     * The interval of the key repeat in frames.
     *
     * @type number
     */
    static keyRepeatInterval: number;
    /**
     * A hash table to convert from a virtual key code to a mapped key name.
     *
     * @type Object
     */
    static keyMapper: any;
    /**
     * A hash table to convert from a gamepad button to a mapped key name.
     *
     * @type Object
     */
    static gamepadMapper: any;
    /**
     * Clears all the input data.
     */
    static clear(): void;
    /**
     * Updates the input data.
     */
    static update(): void;
    /**
     * Checks whether a key is currently pressed down.
     *
     * @param {string} keyName - The mapped name of the key.
     * @returns {boolean} True if the key is pressed.
     */
    static isPressed(keyName: string): boolean;
    /**
     * Checks whether a key is just pressed.
     *
     * @param {string} keyName - The mapped name of the key.
     * @returns {boolean} True if the key is triggered.
     */
    static isTriggered(keyName: string): boolean;
    /**
     * Checks whether a key is just pressed or a key repeat occurred.
     *
     * @param {string} keyName - The mapped name of the key.
     * @returns {boolean} True if the key is repeated.
     */
    static isRepeated(keyName: string): boolean;
    /**
     * Checks whether a key is kept depressed.
     *
     * @param {string} keyName - The mapped name of the key.
     * @returns {boolean} True if the key is long-pressed.
     */
    static isLongPressed(keyName: string): boolean;
    /**
     * The four direction value as a number of the numpad, or 0 for neutral.
     *
     * @readonly
     * @type number
     * @name static dir4
     */
    static get dir4(): number;
    /**
     * The eight direction value as a number of the numpad, or 0 for neutral.
     *
     * @readonly
     * @type number
     * @name static dir8
     */
    static get dir8(): number;
    /**
     * The time of the last input in milliseconds.
     *
     * @readonly
     * @type number
     * @name static date
     */
    static get date(): number;
    static virtualClick(buttonName: any): void;
    static _setupEventHandlers(): void;
    static _onKeyDown(event: {
        keyCode: number;
        preventDefault: () => void;
    }): void;
    static _shouldPreventDefault(keyCode: any): boolean;
    static _onKeyUp(event: {
        keyCode: string | number;
    }): void;
    static _onLostFocus(): void;
    static _pollGamepads(): void;
    static _updateGamepadState(gamepad: Gamepad): void;
    static _updateDirection(): void;
    static _signX(): number;
    static _signY(): number;
    static _makeNumpadDirection(x: number, y: number): number;
    static _isEscapeCompatible(keyName: string): boolean;
}
