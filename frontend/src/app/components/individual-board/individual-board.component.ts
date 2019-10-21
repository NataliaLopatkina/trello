import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BoardService } from '../../services/board.service';
import { PopupService } from '../../services/popup.service';

@Component({
    selector: 'app-individual-board',
    templateUrl: './individual-board.component.html',
    styleUrls: ['./individual-board.component.scss']
})
export class IndividualBoardComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    idBoard: number;
    nameBoard: string = '';
    color: string = '';
    popup: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private boardService: BoardService,
        private popupService: PopupService) {
        this.idBoard = activatedRoute.snapshot.params['idBoard'];
    }

    ngOnInit() {
        this.drawBoard();
        this.popupService.deletePopup();
    }

    drawBoard() {
        this.subscription = this.boardService.getBoard(this.idBoard)
        .subscribe(
            (response: any) => {
                this.nameBoard = response.board.title;
                this.color = response.board.color;
            },

            (error) => {
                console.log(error)
            }
        )
    }
    
    addTask() {
        this.popupService.popup()
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
