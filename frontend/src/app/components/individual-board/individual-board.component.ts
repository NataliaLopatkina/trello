import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

import { BoardService } from '../../services/board.service';
import { PopupService } from '../../services/popup.service';

@Component({
    selector: 'app-individual-board',
    templateUrl: './individual-board.component.html',
    styleUrls: ['./individual-board.component.scss']
})
export class IndividualBoardComponent implements OnInit, OnDestroy {

    // constructor(){}
    // ngOnInit() {}
    // ngOnDestroy(){}

    subscription: Subscription;
    boardId: number;
    color: string = '';
    board
    // todoTask: boolean = false;
    // todo: [] = [];
    // doing: [] = [];
    // done: [] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private boardService: BoardService,
        private popupService: PopupService,
        private router: Router) {
        // /this.idBoard = activatedRoute.snapshot.params['idBoard'];

        // this.subscription = this.boardService.currentBoard
        //     .subscribe((board) => {
        //         this.board = board;
        //         console.log(this.board)
        //         // this.boardId = data.board.id;
        //         // this.drawBoard(this.boardId)
        //     })
    }

    ngOnInit() {
        
    }

    drawBoard(id) {
        this.subscription = this.boardService.getBoard(id)
        .subscribe(
            (response: any) => {
                console.log(response)
                //this.color = response.board.color;
                // if (response.board.task) {
                //     const arrayTasks = response.board.task;
                //     // this.todo = this.filterArray(arrayTasks, 'todo');
                //     // this.doing = this.filterArray(arrayTasks, 'doing');
                //     // this.done = this.filterArray(arrayTasks, 'done');
                // }
            },

            (error) => {
                console.log(error)
            }
        )
    }

    // filterArray(array, state) {
    //     return array.filter((item)=>
    //         item.state==state)
    // }
    

    // selectTask(task) {
    //     this.popupService.popup();
    //     //this.router.navigate(['dashboard/c', task.id, task.title]);
    // }

    // drop(event: CdkDragDrop<string[]>) {
    //     if (event.previousContainer !== event.container) {
    //         transferArrayItem(event.previousContainer.data, event.container.data,
    //             event.previousIndex, event.currentIndex)
    //     } else {
    //         moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    //     }
    // }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    // }

}
