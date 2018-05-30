import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'play-view',
    templateUrl: 'play.component.html'
})

export class PlayComponent{
    
    isAnySelected: boolean;
    isComputerSelected: boolean;
    disableButton: number = 0;

    constructor() {
        this.isAnySelected = false;
    }
    
    withComputer(bool): void {
        this.isAnySelected = true;
        this.isComputerSelected = bool == 1 ? true : false;
        this.disableButton = bool;
    }

    enableButtons(): void {
        this.disableButton = 0;
        this.isAnySelected = false;
    }
}