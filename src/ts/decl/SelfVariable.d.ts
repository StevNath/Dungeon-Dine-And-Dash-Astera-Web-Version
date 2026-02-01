declare interface Game_Variables {
    _selfVariablesData: any;
    isSelfVariable(variableId: number): boolean;
    isCommonVariable(variableId: number): boolean;
    isFloatVariable(variableId: number): boolean;
    selfVariableValue(key: [number, number, number]): number;
    setSelfVariableValue(key: [number, number, number], value: number): void;
    setSelfVariableValueByEventTags(eventTags: string[], variableId: number, value: number): void;
    clearSelfVariables(mapId: number, eventId?: number, selfVariableId?: number): void;
}
declare interface Game_Switches {
    _exSelfSwitchesData: any;
    isExSelfSwitch(switchId: number): boolean;
    isCommonSwitch(switchId: number): boolean;
    exSelfSwitchValue(key: [number, number, number]): boolean;
    setExSelfSwitchValue(key: [number, number, number], value: boolean): void;
    setExSelfSwitchValueByEventTags(eventTags: string[], selfSwitchId: number, value: boolean): void;
    clearExSelfSwitches(mapId: number, eventId?: number, selfSwitchId?: number): void;
}
declare interface Game_Interpreter {
    _commonVariableData: any;
    _commonSwitchData: any;
    mapId(): number;
    eventId(): number;
    selfVariableOrExSwitchKey(id: number): [number, number, number];
    commonVariableValue(variableId: number): number;
    setCommonVariableValue(variableId: number, value: number): void;
    commonSwitchValue(switchId: number): boolean;
    setCommonSwitchValue(switchId: number, value: boolean): void;
}
declare interface Game_Event {
    _eventTags: string[];
    selfVariableValue(variableId: number): number;
    setSelfVariableValue(variableId: number, value: number): void;
    exSelfSwitchValue(switchId: number): boolean;
    setExSelfSwitchValue(switchId: number, value: boolean): void;
    selfVariableOrExSwitchKey(id: number): [number, number, number];
    eventTags(): string[];
    parseEventTags(): string[];
    addEventTag(eventTag: string): void;
    hasEventTag(eventTag: string): boolean;
    getAnnotationValues(page: number): {
        [key: string]: string;
    };
    getAnnotation(page: number): string;
}
declare const SelfVariablePluginName: string;
declare var globalActiveInterpreter: Game_Interpreter | undefined;
declare var globalActiveEvent: Game_Event | undefined;
declare namespace SelfVariable {
    type VariableType = "SelfVariable" | "FloatVariable" | "CommonVariable";
    class SelfVariableOrExSwitchUtils {
        static isDebugScene(): boolean;
        static currentExSelfSwitchKey(id: number): [number, number, number];
        static checkPrefixs(name: string): VariableType[];
        static checkPrefix(name: string, index: number, expectedPrefix: string): boolean;
    }
}
