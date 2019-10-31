import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { BoardService } from '../../../../services/board.service';
import { TaskService } from '../../../../services/task.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    idBoard: number;
    color: string = '';
    tasksList: Array<any> = [];
    todoTasks: Array<any> = [];
    doingTasks: Array<any> = [];
    doneTasks: Array<any> = [];
    popupUpdateTask: boolean = false;
    state: string;
    columns:any = [
        {
            title: 'To do',
            id: 'todo',
            tasks: ['task1', 'task2']
        },
        {
            title: 'Doing',
            id: 'doing',
            tasks: ['task3', 'task4'],
        },
        {
            title: 'Done',
            id: 'done',
            tasks: ['task6', 'task8'],
        }
    ]

    constructor(
        private activatedRoute: ActivatedRoute,
        private boardService: BoardService,
        private taskService: TaskService,
        private router: Router) {
        this.idBoard = this.activatedRoute.snapshot.params['idBoard'];
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
                    this.router.navigate(['*'])
                }
            }
        )
    }

    getColumnIds() {
        return this.columns.map(column => column.id);
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

    addFormCreateTask(columnId) {
        this.state = columnId;
    }

    addPopupUpdateTask(task) {
        this.popupUpdateTask = true;
        console.log('Запрос на сервер на добавление таска!')
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
