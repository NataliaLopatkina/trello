import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { BoardService } from '../../../../services/board.service';
import { TaskService } from '../../../../services/task.service';
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
    tasksList: Array<any> = [];
    todoTasks: Array<any> = [];
    doingTasks: Array<any> = [];
    doneTasks: Array<any> = [];
    createTask: boolean = false;
    popup: boolean = false;
    columns:any = [
        {
            title: 'To do',
            connection: 'todoList',
            connection1: 'doingList',
            connection2: 'doneList',
            tasks: ['Test', 'Test1'],
        },
        {
            title: 'Doing',
            connection: 'doingList',
            connection1: 'todoList',
            connection2: 'doneList',
            tasks: ['Test2', 'Test3'],
        },
        {
            title: 'Done',
            connection: 'doneList',
            connection1: 'todoList',
            connection2: 'doingList',
            tasks: ['Test4', 'Test5'],
        }
    ]

    constructor(
        private activatedRoute: ActivatedRoute,
        private boardService: BoardService,
        private taskService: TaskService,
        private popupService: PopupService,
        private router: Router) {
        this.idBoard = activatedRoute.snapshot.params['idBoard'];
    }

    ngOnInit() {
        this.boardService.getBoard(this.idBoard).subscribe()
        this.boardService.board.subscribe(
            (board: any)=> {
                if (board) {
                    this.color = board.color;
                    if (board.task) {
                        this.tasksList = board.task;
                        this.todoTasks = this.filterTasks(this.tasksList, 'todo');
                        this.doingTasks = this.filterTasks(this.tasksList, 'doing');
                        this.doneTasks = this.filterTasks(this.tasksList, 'done');
                    }
                } else {
                    this.router.navigate(['*  '])
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

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer !== event.container) {
            transferArrayItem(event.previousContainer.data, event.container.data,
                event.previousIndex, event.currentIndex)
        } else {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    addTask() {
        this.taskService.addFormCreateTask();
        this.taskService.createTask
        .subscribe(
            (createTask: boolean)=> {
                this.createTask = createTask;
            }
        )
        
        this.createTask = !this.createTask
    }

    selectTask() {
        this.popupService.addPopup();
        this.popupService.popup.subscribe(
            (popup: boolean)=> {
                this.popup = popup
            }
        )
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
