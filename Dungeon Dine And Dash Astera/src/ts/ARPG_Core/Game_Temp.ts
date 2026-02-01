import { ARPG_CharacterTempData } from "./ARPG_CharacterTempData";
import { ARPG_GlobalTempData } from "./ARPG_GlobalTempData";
import { mixin } from "../CommonLibrary/mixin";

export type ARPGMode = "start" | "end";

declare global {
    interface Game_Temp {
        _arpgGlobalTempData: ARPG_GlobalTempData;
        _arpgCharacterTempDatas: Map<Game_Character, ARPG_CharacterTempData>;
        _fieldDamagePopupRequest: Map<Game_CharacterBase, Game_ActionResult>;
        _changeNextActorRequest: IChangeActorRequest | undefined;

        arpgGlobalTempData(): ARPG_GlobalTempData;
        requestARPGMode(arpgMode: ARPGMode): void;
        checkARPGModeRequest(): ARPGMode | undefined;
        arpgCharacterTempData(character: Game_Character): ARPG_CharacterTempData;
        clearUnusedArpgCharacterTempDatas(): void;
        requestFieldDamagePopup(character: Game_CharacterBase, result: Game_ActionResult): void;
        checkRequestedFieldDamagePopup(character: Game_CharacterBase): Game_ActionResult | undefined;
        requestChangeNextActor(request?: IChangeActorRequest): void;
        checkRequestedChangeNextActor(): IChangeActorRequest | undefined;
    }
}

export interface IChangeActorRequest {
    force?: boolean;
}

class Game_Temp_Mixin extends Game_Temp {
    static _initialize = Game_Temp.prototype.initialize;

    initialize() {
        Game_Temp_Mixin._initialize.call(this);
        this._arpgCharacterTempDatas = new Map();
        this._fieldDamagePopupRequest = new Map();
    }

    arpgGlobalTempData() {
        if (!this._arpgGlobalTempData) {
            this._arpgGlobalTempData = new ARPG_GlobalTempData();
        }
        return this._arpgGlobalTempData;
    }

    arpgCharacterTempData(character: Game_Character) {
        let tempData = this._arpgCharacterTempDatas.get(character);
        if (tempData) return tempData;
        tempData = character.createArpgTempData();
        this._arpgCharacterTempDatas.set(character, tempData);
        return tempData;
    }

    clearUnusedArpgCharacterTempDatas() {
        const allCharacters = $gameMap.allCharacters();
        for (const character of this._arpgCharacterTempDatas.keys()) {
            if (!allCharacters.has(character)) {
                this._arpgCharacterTempDatas.delete(character);
            }
        }
    }

    requestFieldDamagePopup(character: Game_CharacterBase, result: Game_ActionResult): void {
        this._fieldDamagePopupRequest.set(character, result);
    }

    checkRequestedFieldDamagePopup(character: Game_CharacterBase): Game_ActionResult | undefined {
        const result = this._fieldDamagePopupRequest.get(character);
        this._fieldDamagePopupRequest.delete(character);
        return result;
    }

    requestChangeNextActor(request = {}): void {
        this._changeNextActorRequest = request;
    }

    checkRequestedChangeNextActor(): IChangeActorRequest | undefined {
        if (this._changeNextActorRequest) {
            const request = this._changeNextActorRequest;
            this._changeNextActorRequest = undefined;
            return request;
        }
        return undefined;
    }
}

mixin(Game_Temp, Game_Temp_Mixin);
