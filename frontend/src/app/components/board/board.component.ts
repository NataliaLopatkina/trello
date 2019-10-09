import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { PopupService } from '../../services/popup.service';
import { TaskService } from '../../services/task.service';

import { Task } from '../../models/task';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    todo: Task [] = [];

    doing = [];
    done = [];

    constructor(
        private popupService: PopupService,
        private taskService: TaskService) { }

    ngOnInit() {
        this.taskService.getTasks()
        .subscribe(
            (response: any)=> {
                this.todo = response['data'];
                console.log(this.todo)
            },

            (error)=> {
                console.log(error)
            }
        )
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
        this.popupService.popup();
    }
}
