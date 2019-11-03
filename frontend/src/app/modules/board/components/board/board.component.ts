import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { BoardService } from '../../../../services/board.service';
import { TaskService } from '../../../../services/task.service';
import { nextTick } from 'q';

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
    task: string;
    typeSort: string = 'ascend';
    tasks: Array<any> = [];

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

    addPopupUpdateTask(task) {
        this.popupUpdateTask = true;
        this.task = task;
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

    compareFunction(prev, next) {
        if (prev.title < next.title) {
            return -1
        } else {
            return 1
        }
    }

    sortTasks(tasks) {
        this.typeSort = this.typeSort === 'ascend' ? 'descend' : 'ascend';

        if (this.typeSort === 'ascend') {
            tasks.sort(this.compareFunction)

        } else if (this.typeSort === 'descend') {
            tasks.sort(this.compareFunction).reverse();
        }
    }

    sortTasksList(id) {
        if (id == 'todo') {
            this.tasks = this.todoTasks;
        } else if (id == 'doing') {
            this.tasks = this.doingTasks;
        } else {
            this.tasks = this.doneTasks;
        }
        this.sortTasks(this.tasks);
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
