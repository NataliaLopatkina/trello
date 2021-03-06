import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { BoardService } from '@services/board.service';
import { TaskService } from '@services/task.service';

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
        private taskService: TaskService) {
        this.idBoard = this.activatedRoute.snapshot.params['idBoard'];
    }

    ngOnInit() {
        this.getBoard(this.idBoard)
        this.subscription = this.boardService.board.subscribe(
            (board: any)=> {
                this.color = board.color;
            }
        )
        this.subscription = this.boardService.tasks.subscribe(
            (tasks: any)=> {
                if(tasks) {
                    this.todoTasks = tasks.todoTasks;
                    this.doingTasks = tasks.doingTasks;
                    this.doneTasks = tasks.doneTasks;
                }

                this.createColumnComponent();
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
        this.subscription = this.boardService.getBoard(idBoard)
        .subscribe()
    }

    updateTasksList(boardId, id, tasks) {
        this.subscription = this.taskService.moveTask(boardId, id, tasks)
            .subscribe()
    }

    drop(event: CdkDragDrop<any>) {
        if (event.previousContainer !== event.container) {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
                this.updateTasksList(event.container.data[0].id, event.container.id, event.container.data)
        } else {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            this.updateTasksList(event.container.data[0].id, event.container.id, event.container.data)
        }
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

    sortTasks(id) {
        this.typeSort = this.typeSort === 'ascend' ? 'descend' : 'ascend';

        if (id == 'todo') {
            this.tasks = this.todoTasks
        } else if (id == 'doing') {
            this.tasks = this.doingTasks
        } else {
            this.tasks = this.doneTasks
        }

        if (this.typeSort === 'ascend') {
            this.tasks.sort(this.compareFunction)

        } else if (this.typeSort === 'descend') {
            this.tasks.sort(this.compareFunction).reverse();
        }

        this.updateTasksList(this.idBoard, id, this.tasks)
    }

    closeUpdateTask() {
        this.getBoard(this.idBoard)
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
