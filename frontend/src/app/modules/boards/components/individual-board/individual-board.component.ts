import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

import { BoardService } from '../../../../services/board.service';
import { PopupService } from '../../../../services/popup.service';

@Component({
    selector: 'app-individual-board',
    templateUrl: './individual-board.component.html',
    styleUrls: ['./individual-board.component.scss']
})
export class IndividualBoardComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    idBoard: number;
    color: string = '';
    tasks: Array<any> = [];
    todoList: Array<any> = [];
    doingList: Array<any> = [];
    doneList: Array<any> = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private boardService: BoardService,
        private popupService: PopupService,
        private router: Router) {
        this.idBoard = activatedRoute.snapshot.params['idBoard'];
    }

    ngOnInit() {
        this.boardService.getBoard(this.idBoard).subscribe()
        this.boardService.board.subscribe(
            (board: any)=> {
                this.color = board.color;
                if (board.task) {
                    this.tasks = board.task;
                    this.todoList = this.filterTasks(this.tasks, 'todo');
                    this.doingList = this.filterTasks(this.tasks, 'doing');
                    this.doneList = this.filterTasks(this.tasks, 'done');
                }
            }
        )
    }

    getBoard(idBoard) {
        this.subscription = this.boardService.getBoard(idBoard).subscribe()
    }

    filterTasks(array, state) {
        return array.filter((item)=>
            item.state==state)
    }
    

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

    ngOnDestroy() {
        //this.subscription.unsubscribe();
    }

}
