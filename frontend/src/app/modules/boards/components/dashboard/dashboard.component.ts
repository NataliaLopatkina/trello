import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Board } from '../../../../models/board';
import { BoardService } from '../../../../services/board.service';
import { PopupService } from '../../../../services/popup.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    boards: Board[] = [];
    popup: boolean = false;

    constructor(
        private boardService: BoardService,
        private popupService: PopupService,
        private router: Router) { }

    ngOnInit() {
        this.getBoards();
    }

    getBoards() {
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

    removeBoard(board) {
        this.boardService.removeBoard(board.id).subscribe();
        this.getBoards();
    }

    addBoard() {
        this.popupService.addPopup();
        this.popupService.popup
        .subscribe(
            (popup: boolean)=> {
                this.popup = popup;
            }
        )
    }

    selectBoard(board) {
        this.router.navigate(['boards/' + board.id]);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
