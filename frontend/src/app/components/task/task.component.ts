import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PopupService } from '../../services/popup.service';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

    popup: boolean = false;
    taskForm: FormGroup;
    subscription: Subscription;

    constructor(
        private popupService: PopupService,
        private formBuilder: FormBuilder,
        private taskService: TaskService) { }

    ngOnInit() {
        this.subscription = this.popupService.addPopup.subscribe(
            (popupCreate: { popup: boolean }) => {
                if (popupCreate) {
                    this.popup = popupCreate.popup;
                }
            }
        )

        this.addTaskForm();
    }

    addTaskForm() {
        this.taskForm = this.formBuilder.group({
            title: ['', Validators.required]
        })
    }

    addTask() {
        this.subscription = this.taskService.createTask(this.taskForm.value)
        
        .subscribe(
            (response: any)=> {
                console.log(response)
            },

            (error)=> {
                console.log(error)
            }
        )

        this.popupService.deletePopup();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    closePopupTask() {
        this.popupService.deletePopup();
    }
}
