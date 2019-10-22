import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
    todoTask: boolean = false;
    todo: [] = [];
    doing: [] = [];
    done: [] = [];

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
                this.todo = response.board.task;
            },

            (error) => {
                console.log(error)
            }
        )
    }
    
    createTodoTask() {
        this.todoTask = true;
    }

    createDoingTask() {
        this.popupService.popup()
    }

    createDoneTask() {
        this.popupService.popup()
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer !== event.container) {
            transferArrayItem(event.previousContainer.data, event.container.data,
                event.previousIndex, event.currentIndex)
        } else {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
