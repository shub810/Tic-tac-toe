import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'with-computer',
    templateUrl: 'computer.component.html',
})

export class ComputerComponent {
    isSymbolChoosen: boolean = false;
    imgP1: string;
    imgP2: string;
    isGameStart: boolean;
    gameType: string = 'Are you ready to Play?';
    applyStopClass: boolean = false;
    applyStartClass: boolean = true;
    isComputer: boolean;

    constructor() {}
    
    @Input()
    flagComputer: boolean;
        
    recieveObj(value: any) {
        this.imgP1 = value.imgP1;
        this.imgP2 = value.imgP2;
        this.isSymbolChoosen = value.isSymbolChoosen;
        this.isComputer = value.isComputer
    }

    startGame(): void {
        this.isGameStart = true;
        this.gameType = "Stop it. I'm loosing";
        this.applyStopClass = true;
        this.applyStartClass = false;
    }
}    