import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskService } from '../../../../services/task.service';

@Component({
    selector: 'app-form-create-task',
    templateUrl: './form-create-task.component.html',
    styleUrls: ['./form-create-task.component.scss']
})
export class FormCreateTaskComponent implements OnInit, OnDestroy {

    @Output() formTask = new EventEmitter();
    @Output() createTask = new EventEmitter();
    idBoard: number;
    taskForm: FormGroup;
    subscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder) { 
            this.idBoard = this.activatedRoute.snapshot.params['idBoard'];
        }

    ngOnInit() {
        this.addTaskForm();
    }

    removeFormCreateTask() {
        this.formTask.emit();
    }

    addTaskForm() {
        this.taskForm = this.formBuilder.group({
            title: ['', Validators.required]
        })
    }

    addTask() {
        this.createTask.emit(this.taskForm.value.title);
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
