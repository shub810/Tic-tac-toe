import { Component, Input, OnInit } from '@angular/core';
import { IticTac } from './tictac';
import * as _ from 'underscore';
import { RowCol } from './rowCol';

@Component({
    selector: 'start-game',
    templateUrl: 'game.component.html'
})

export class GameComponent implements OnInit{
    
    cellNumber: Map<number, IticTac> = new Map<number, IticTac>();
    whoseTurn: number;
    board: Array<Array<string>> = new Array<Array<string>>();
    player: string;
    opponent: string;
    @Input() player1Symbol: string;
    @Input() player2Symbol: string;
    @Input() isComputer: boolean;
    
    constructor() {
        this.whoseTurn = 0;
        for (let i = 0; i < 3; i++) {
            this.board.push([]);
        }
        for (let i=0; i < 3; i++) {
            this.board[i] = ['_', '_', '_'];
        }
    }

    ngOnInit(){
        this.player = this.player2Symbol;
        this.opponent = this.player1Symbol;
    }

    getRowColFromCellNum(cellNum: number): RowCol {
        let rowCol: RowCol = {
            row: 0,
            col: 0
        }
        if (cellNum >= 1 && cellNum <= 3) {
            rowCol.row = 0;
            rowCol.col = cellNum-1;
        }
        else if (cellNum >= 4 && cellNum <= 6) {
            rowCol.row = 1;
            rowCol.col = cellNum-4;
        }
        else {
            rowCol.row = 2;
            rowCol.col = cellNum-7;
        }
        return rowCol;
    } 

    getCellNumFromRowCol(rowCol: RowCol) : number {
        let cellNum: number;
        switch (rowCol.row) {
            case 0:
                cellNum = rowCol.col + 1;
                break;
            case 1: 
                cellNum = rowCol.col + 4;
                break;
            case 2:
                cellNum = rowCol.col + 7;
                break;
        }
        return cellNum;
    }
    
    insertSymbol(cellNum): void {
        let isEmpty: boolean = this.cellNumber.has(cellNum);
        if (!isEmpty) {
            let rowCol: RowCol = this.getRowColFromCellNum(cellNum);            
            if (this.whoseTurn%2 === 0) {
                this.fillPlayerCell(cellNum, this.player1Symbol);
                this.board[rowCol.row][rowCol.col] = this.opponent;
                
                if (this.isComputer) {
                    if (this.isMoveLeft()) {    
                        this.insertSymbolForComputer();                        
                    }
                    this.whoseTurn += 1;
                }
            }
            else {
                this.fillPlayerCell(cellNum, this.player2Symbol);  
                this.board[rowCol.row][rowCol.col] = this.player;
            }
            this.whoseTurn += 1;
        }
        let winner:number = this.evaluate();
        if (winner == 10) {
            console.log('Player2 or Computer won');
        }
        else if (winner == -10) {
            console.log('Player 1 won');
        }
        else if (!this.isMoveLeft()){
            console.log('Tie');
        }
    }

    isMoveLeft(): boolean {
        for (let i=0; i < 3; i++) {
            for (let j=0; j < 3; j++) {
                if (this.board[i][j] == '_') {
                    return true;
                }
            }
        }
        return false;
    }

    evaluate(): number {
        for (let row=0; row < 3; row++) {
            if (this.board[row][0] == this.board[row][1] && this.board[row][1] == this.board[row][2]) {
                if (this.board[row][0] == this.player) return 10;
                else if (this.board[row][0] == this.opponent) return -10;
            }
        }

        for (let col=0; col < 3; col++) {
            if (this.board[0][col] == this.board[1][col] && this.board[1][col] == this.board[2][col]) {
                if (this.board[0][col] == this.player) return 10;
                else if (this.board[0][col] == this.opponent) return -10;                
            }
        }
        
        if (this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) {
            if (this.board[0][0] == this.player) return 10;
            else if (this.board[0][0] == this.opponent) return -10;            
        }

        if (this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]) {
            if (this.board[0][2] == this.player) return 10;
            else if (this.board[0][2] == this.opponent) return -10;            
        }
        return 0;
    }

    minimax(depth: number, isMaximizer: boolean): number {
        
        let score = this.evaluate();

        if (score == 10) return score;

        if (score == -10) return score;

        if (!this.isMoveLeft()) return 0;

        if (isMaximizer) {
            let best = -1000;
            for (let i=0; i < 3; i++) {
                for (let j=0; j < 3; j++) {
                    if (this.board[i][j] == '_') {
                        this.board[i][j] = this.player;
                        best = Math.max(this.minimax(depth + 1, !isMaximizer), best);
                        this.board[i][j] = '_';
                    }
                }
            }
            return best;
        }
        else {
            let best = 1000;
            for (let i=0; i < 3; i++) {
                for (let j=0; j < 3; j++) {
                    if (this.board[i][j] == '_') {
                        this.board[i][j] = this.opponent;
                        best = Math.min(this.minimax(depth + 1, !isMaximizer), best);
                        this.board[i][j] = '_';
                    }
                }
            }
            return best;
        }
    }

    findBestMove() : RowCol {
        let bestMove: RowCol = {
            row: -1,
            col: -1
        }
        let best = -1000;
        
        for (let i=0; i < 3; i++) {
            for (let j=0; j < 3; j++) {
                if (this.board[i][j] == '_') {
                    this.board[i][j] = this.player;
                    let currentValue = this.minimax(0, false);
                    if (currentValue > best) {
                        best = currentValue;
                        bestMove.row = i;
                        bestMove.col = j;
                    }
                    this.board[i][j] = '_';
                }
            }
        }
        return bestMove;
     }

    insertSymbolForComputer(): void {
        let rowCol: RowCol = this.findBestMove();
        let cellNum = this.getCellNumFromRowCol(rowCol);

        this.board[rowCol.row][rowCol.col] = this.player;

        this.fillPlayerCell(cellNum, this.player2Symbol);
    }

    fillPlayerCell(cellNum: number, symbol: string):void {
        this.cellNumber.set(cellNum, {
            'status': true,
            'imgString': symbol 
        });
    }
    
    resetGame(): void {
        this.whoseTurn = 0;
        this.cellNumber.clear();
        for (let i=0; i < 3; i++) {
            this.board[i] = ['_', '_', '_'];
        }
    }
}