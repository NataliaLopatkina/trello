import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { PopupService } from '../../services/popup.service';

@Component({
    selector: 'app-boards',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    popup: boolean = false;
    boards: Board[] = [];
    subscription: Subscription;
    counter: number = 1;

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
                        this.boards = response.boards;
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
        this.router.navigate(['dashboard/b', board.id, board.title]);
    }
}
