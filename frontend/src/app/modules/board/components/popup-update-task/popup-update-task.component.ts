import { Subscription } from 'rxjs';

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TaskService } from '../../../../services/task.service';

@Component({
    selector: 'app-popup-update-task',
    templateUrl: './popup-update-task.component.html',
    styleUrls: ['./popup-update-task.component.scss']
})
export class PopupUpdateTaskComponent implements OnInit {

    @Output() popupTask = new EventEmitter<boolean>();
    @Input() task;
    idTask: number;
    editTitle: boolean = false;
    formEditTitleTask: FormGroup;
    titleTask: string = '';
    formEditDescriptionTask: FormGroup;
    editDescription: boolean = false;
    description: string = 'Добавить более подробное описание';
    subscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private taskService: TaskService) { }

    ngOnInit() {
        this.titleTask = this.task.title;
        this.idTask = this.task.id;
        
        if(this.task.description) {
            this.description = this.task.description;
        }

        this.formEditDescriptionTask = this.formBuilder.group({
            description: [this.description, Validators.required]
        })
    }

    removePopupUpdateTask() {
        this.popupTask.emit();
    }

    editTitleTask() {
        this.formEditTitleTask = this.formBuilder.group({
            title: [this.titleTask, Validators.required]
        })
    }

    updateTitleTask() {
        if (this.titleTask !== this.formEditTitleTask.value.title) {
            this.subscription = this.taskService.renameTask(this.formEditTitleTask.value.title, this.idTask)
                .subscribe(
                    (response) => {
                        this.titleTask = this.formEditTitleTask.value.title;
                    }
                )
        }
    }

    addDescriptionTask() {
        this.subscription = this.taskService.updateDescriptionTask(this.formEditDescriptionTask.value.description, this.idTask)
            .subscribe(
                (response) => {
                    this.description = this.formEditDescriptionTask.value.description;
                    this.popupTask.emit();
                }
            )
    }
}
