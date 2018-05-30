import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'choose-player',
    templateUrl: 'chooseplayer.component.html'
})

export class ChooseplayerComponent{

    @Input()
    isComputer: boolean;

    @Output()
    sendObj: EventEmitter<any> = new EventEmitter<any>();
    
    isSymbolChoosen: boolean = false;
    imgP1: string;
    imgP2: string;

    onImgClicked(imgType: string): void {
        this.imgP1 = imgType;
        this.imgP2 = imgType === 'O' ? 'X' : 'O';
        this.isSymbolChoosen = true;
        this.sendObj.emit({
            'imgP1': this.imgP1,
            'imgP2': this.imgP2,
            'isSymbolChoosen': this.isSymbolChoosen,
            'isComputer': this.isComputer
        });
    }
}