import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TaskService } from '../../../../services/task.service';

@Component({
    selector: 'app-form-create-task',
    templateUrl: './form-create-task.component.html',
    styleUrls: ['./form-create-task.component.scss']
})
export class FormCreateTaskComponent implements OnInit, OnDestroy {

    @Output() formTask = new EventEmitter<boolean>();
    formCreateTask: boolean = false;

    idBoard: number;
    taskForm: FormGroup;
    subscription: Subscription;
    createTaskForm: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private taskService: TaskService) { 
            this.idBoard = activatedRoute.snapshot.params['idBoard'];
        }

    ngOnInit() {
        this.addTaskForm();
    }

    removeFormCreateTask() {
        this.formTask.emit(this.formCreateTask);
    }

    addTaskForm() {
        this.taskForm = this.formBuilder.group({
            title: ['', Validators.required]
        })
    }

    addTask() {
        const data = { title: this.taskForm.value.title, boardId: this.idBoard }
    }

    ngOnDestroy() {
        // /this.subscription.unsubscribe();
    }
}
