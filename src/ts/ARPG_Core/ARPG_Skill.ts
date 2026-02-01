import { ARPG_Utils } from "ARPG_Utils";

export class ARPG_Skill {
    static DEFAULT_NO_ATTACK_FRAME: number = 60;
    static DEFAULT_NO_DAMAGE_FRANE: number = 30;

    private _skillOrItem: "item" | "skill";
    private _id: number;
    private _data: RMMZData.Item;
    private _params: any;
    private _noAttackFrame: number;
    private _noDamageFrame: number;
    private _actionName: string = "";
    private _actionCommonEventId: number = 0;
    private _showSkillName: boolean;
    private _cancelAcceleration: boolean = true;
    private _disableMove: boolean = true;
    private _commonEventVariables: { id: number; value: number; }[] = [];
    private _commonEventSwitches: number[] = [];

    get skillOrItem() { return this._skillOrItem; }
    get id() { return this._id; }

    constructor(skillOrItem: "item" | "skill", idOrName: number | string) {
        this._skillOrItem = skillOrItem;

        if (typeof idOrName === "number") {
            this._id = idOrName;
        } else {
            if (skillOrItem === "item") {
                this._id = this.findItemIdByName(idOrName);
            } else {
                this._id = this.findSkillIdByName(idOrName);
            }
        }

        if (skillOrItem === "skill") {
            this._data = $dataSkills[this._id];
        } else if (skillOrItem === "item") {
            this._data = $dataItems[this._id];
        } else {
            throw new Error(`ARPG_Skill error (skillOrItem=${skillOrItem}, id=${this._id})`);
        }

        if (this._data.meta.params) {
            try {
                this._params = JSON.parse(`{${this._data.meta.params}}`);
            } catch (e) {
                throw new Error(`Skill parameter (${this._data.meta.params}) is invalid.`);
            }
        } else {
            this._params = {};
        }

        if (typeof this._data.meta.noAttackFrame === "string") {
            const strNoAttackFrame = this._data.meta.noAttackFrame.replace(/\s/, "");
            this._noAttackFrame = parseInt(strNoAttackFrame);
        } else {
            this._noAttackFrame = ARPG_Skill.DEFAULT_NO_ATTACK_FRAME;
        }

        if (typeof this._data.meta.noDamageFrame === "string") {
            const strNoDamageFrame = this._data.meta.noDamageFrame.replace(/\s/, "");
            this._noDamageFrame = parseInt(strNoDamageFrame);
        } else {
            this._noDamageFrame = ARPG_Skill.DEFAULT_NO_DAMAGE_FRANE;
        }

        if (typeof this._data.meta.action === "string") {
            const actionName = this._data.meta.action.replace(/\s/, "");
            if (actionName != null) {
                this._actionName = actionName;
                if (actionName.match(/^\d+$/)) {
                    this._actionCommonEventId = parseInt(actionName);
                } else {
                    const commonEventId = this.searchCommonEventId(actionName);
                    if (commonEventId) this._actionCommonEventId = commonEventId;
                }
            }
        }

        if (this._data.meta.showSkillName) {
            this._showSkillName = true;
        } else {
            this._showSkillName = false;
        }

        if ((typeof this._data.meta.cancelAcceleration === "string") && this._data.meta.cancelAcceleration.match(/\s*false$/)) {
            this._cancelAcceleration = false;
        }

        if ((typeof this._data.meta.disableMove === "string") && this._data.meta.disableMove.match(/\s*false$/)) {
            this._disableMove = false;
        }

        this._commonEventSwitches = this.parseCommonEventSwitches();
        this._commonEventVariables = this.parseCommonEventVariables();
    }

    private parseCommonEventSwitches(): number[] {
        let commonEventSwitches = new Set<number>();
        for (const matchData of this._data.note.matchAll(/\<set-sw\s*\:\s*(.+)\s*\>/g)) {
            if (matchData && matchData[1]) {
                const id = parseInt(matchData[1]);
                commonEventSwitches.add(id);
            }
        }
        return [...commonEventSwitches];
    }

    private parseCommonEventVariables(): { id: number, value: number }[] {
        let commonEventVariables = new Set<{ id: number, value: number }>();
        for (const matchData of this._data.note.matchAll(/\<set-var\s*\:\s*(.+)\s*\,\s*(.+)\>/g)) {
            if (matchData && matchData[1] && matchData[2]) {
                const id = parseInt(matchData[1]);
                const value = parseInt(matchData[2]);
                commonEventVariables.add({ id, value });
            }
        }
        return [...commonEventVariables];
    }

    private findSkillIdByName(name: string): number {
        for (const skillData of $dataSkills) {
            if (!skillData) continue;
            if (skillData.name === name) {
                return skillData.id;
            }
        }
        throw new Error(`${name} is not fount in all skills.`);
    }

    private findItemIdByName(name: string): number {
        for (const itemData of $dataItems) {
            if (!itemData) continue;
            if (itemData.name === name) {
                return itemData.id;
            }
        }
        throw new Error(`${name} is not fount in all items.`);
    }

    isSkill() {
        return this._skillOrItem === "skill";
    }

    isItem() {
        return this._skillOrItem === "item";
    }

    params() {
        return this._params;
    }

    commonEventVariables(): { id: number, value: number }[] {
        return this._commonEventVariables;
    }

    commonEventSwitches(): number[] {
        return this._commonEventSwitches;
    }

    noAttackFrame() {
        return this._noAttackFrame;
    }

    noDamageFrame() {
        return this._noDamageFrame;
    }

    actionName(): string {
        return this._actionName;
    }

    actionCommonEventId(): number {
        return this._actionCommonEventId;
    }

    isOverwriteCollideAttack(): boolean {
        return !!this._data.meta.overwriteCollideAttack;
    }

    data(): RMMZData.Item {
        return this._data;
    }

    checkItemScope(list: Array<number>): boolean {
        return list.includes(this._data.scope);
    }

    isForOpponent(): boolean {
        return this.checkItemScope([1, 2, 3, 4, 5, 6, 14]);
    }

    isForFriend(): boolean {
        return this.checkItemScope([7, 8, 9, 10, 11, 12, 13, 14]);
    }

    isForEveryone(): boolean {
        return this.checkItemScope([14]);
    }

    isForAliveFriend(): boolean {
        return this.checkItemScope([7, 8, 11, 14]);
    }

    isForDeadFriend(): boolean {
        return this.checkItemScope([9, 10]);
    }

    isForUser(): boolean {
        return this.checkItemScope([11]);
    }

    isShowSkillName(): boolean {
        return this._showSkillName;
    }

    isCancelAcceleration(): boolean {
        return this._cancelAcceleration;
    }

    isMoveDisabled(): boolean {
        return this._disableMove;
    }

    elementIds(): number[] {
        return ARPG_Utils.itemAttackElementIds(this._data);
    }

    private searchCommonEventId(commonEventName: string): number | undefined {
        const foundCommonEvent = $dataCommonEvents.find((commonEvent: any) => {
            if (!commonEvent) return false;
            return commonEvent.name === commonEventName;
        });
        if (foundCommonEvent) return foundCommonEvent.id;
        return undefined;
    }
}
