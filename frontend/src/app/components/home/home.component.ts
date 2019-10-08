import { Component, OnInit } from '@angular/core';

import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { PopupService } from '../../services/popup.service';
 
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    popup: boolean = false;
    boards: Board [] = [];

    constructor(
        private boardService: BoardService,
        private popupService: PopupService ) { }

    ngOnInit() {
        this.drawBoards();
    }

    addBoard() {
        this.popupService.popup();
    }

    drawBoards() {
        this.boardService.getBoards()
        .subscribe(
            (response: any) => {
                if (response) {
                    this.boards = response.data;
                }
            },

            (error) => {
                console.log(error)
            }
        )
    }
}
