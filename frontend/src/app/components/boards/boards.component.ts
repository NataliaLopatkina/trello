import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { PopupService } from '../../services/popup.service';

@Component({
    selector: 'app-boards',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy {

    popup: boolean = false;
    boards: Board[] = [];
    subscription: Subscription;

    constructor(
        private boardService: BoardService,
        private popupService: PopupService,
        private router: Router) { }

    ngOnInit() {
        this.drawBoards();
    }

    addBoard() {
        this.popupService.popup();
    }

    drawBoards() {
        this.subscription = this.boardService.getBoards()
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

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    selectBoard(board) {
        this.router.navigate(['boards', board.title]);
        this.boardService.initBoard(board);
    }
}
