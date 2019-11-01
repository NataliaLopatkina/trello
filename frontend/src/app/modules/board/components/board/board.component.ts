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
    todoTasks: Array<any>;
    doingTasks: Array<any>;
    doneTasks: Array<any>;
    popupUpdateTask: boolean = false;
    state: string;
    columns: Array<any>;

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
                        const tasksList = board.task;
                        this.todoTasks = this.filterTasks(tasksList, 'todo');
                        this.doingTasks = this.filterTasks(tasksList, 'doing');
                        this.doneTasks = this.filterTasks(tasksList, 'done');
                    }

                    this.createColumnComponent();

                } else {
                    this.router.navigate(['*'])
                }
            }
        )
    }

    getColumnIds() {
        return this.columns.map(column => column.id);
    }

    createColumnComponent() {
        this.columns = [
            {
                title: 'To do',
                id: 'todo',
                tasks: this.todoTasks,
            },
            {
                title: 'Doing',
                id: 'doing',
                tasks: this.doingTasks,
            },
            {
                title: 'Done',
                id: 'done',
                tasks: this.doneTasks,
            }
        ]
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

    addPopupUpdateTask() {
        this.popupUpdateTask = true;
    }

    addTask($event) {
        const data = { title: $event, boardId: this.idBoard, state: this.state }
        this.subscription = this.taskService.addTask(data).subscribe(
            (response)=> {
                this.state = '*';
                this.getBoard(this.idBoard);
            },
            (error)=> {
                console.log(error)
            }
        )
    }

    removeCard(id) {
        this.subscription = this.taskService.removeTask(id).subscribe(
            (response)=> {
                this.getBoard(this.idBoard);
            },

            (error)=> {
                console.log(error)
            }
        )
    }

    moveTask(item) {
        console.log(item)
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
