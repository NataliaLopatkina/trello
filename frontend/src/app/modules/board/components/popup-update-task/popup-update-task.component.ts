import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TaskService } from '../../../../services/task.service';

@Component({
    selector: 'app-popup-update-task',
    templateUrl: './popup-update-task.component.html',
    styleUrls: ['./popup-update-task.component.scss']
})
export class PopupUpdateTaskComponent implements OnInit, OnDestroy {

    @Output() popupTask = new EventEmitter<boolean>();
    popupUpdateTask: boolean = false;
    editTitle: boolean = false;
    formEditTitleTask: FormGroup;
    titleTask: string;
    task
    // subscription: Subscription;
    // updateTitle: boolean = false;
    // formDescriptionTask: FormGroup;
    // updateDescription: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private taskService: TaskService) { }

    ngOnInit() {
        // this.taskService.getTask().subscribe(
        //     (task)=> {
        //         this.task = task;
        //         this.titleTask = task.title;
        //     }
        // )
    }

    removePopupUpdateTask() {
        this.popupTask.emit(this.popupUpdateTask);
    }

    editTitleTask() {
        this.editTitle = true;
        this.formEditTitleTask = this.formBuilder.group({
            title: [this.titleTask, Validators.required]
        })
    }

    focusOut() {
        this.editTitle = false;
    }

    updateTitleTask() {

    }

    // initFormDescriptionTask() {
    //     this.formDescriptionTask = this.formBuilder.group({
    //         description: ['', Validators.required]
    //     })
    // }

    // editDescriptionTask() {
    //     this.updateDescription = true;
    //     this.initFormDescriptionTask();
    // }

    // focusOutDescription() {
    //     setTimeout(()=> {
    //         this.updateDescription = false;
    //     }, 200)
    // }

    // addDescription() {
    //     console.log(this.formDescriptionTask.value);
    // }

    // closeUpdateDescription() {
    //     this.updateDescription = false;
    // }

    ngOnDestroy() {
        // if(this.subscription) {
        //     this.subscription.unsubscribe();
        // }
    }
}
