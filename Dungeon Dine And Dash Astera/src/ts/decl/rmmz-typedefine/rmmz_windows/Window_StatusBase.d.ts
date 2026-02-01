declare class Window_StatusBase extends Window_Selectable {
    protected _additionalSprites: any;
    initialize(rect: Rectangle): void;
    loadFaceImages(): void;
    refresh(): void;
    hideAdditionalSprites(): void;
    placeActorName(actor: Game_Actor, x: number, y: number): void;
    placeStateIcon(actor: Game_Actor, x: number, y: number): void;
    placeGauge(actor: Game_Actor, type: string, x: number, y: number): void;
    createInnerSprite(key: string, spriteClass: any): any;
    placeTimeGauge(actor: Game_Actor, x: number, y: number): void;
    placeBasicGauges(actor: Game_Actor, x: number, y: number): void;
    gaugeLineHeight(): number;
    drawActorCharacter(actor: Game_Actor, x: number, y: number): void;
    drawActorFace(actor: Game_Actor, x: number, y: number, width?: number, height?: number): void;
    drawActorName(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorClass(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorNickname(actor: Game_Actor, x: number, y: number, width: number): void;
    drawActorLevel(actor: Game_Actor, x: number, y: number): void;
    drawActorIcons(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorSimpleStatus(actor: Game_Actor, x: number, y: number): void;
    actorSlotName(actor: Game_Actor, index: number): string;
}
