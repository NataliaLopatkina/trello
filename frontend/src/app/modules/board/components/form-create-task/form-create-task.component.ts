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
    idBoard: number;
    taskForm: FormGroup;
    subscription: Subscription;
    createTaskForm: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private router: Router) { 
            this.idBoard = activatedRoute.snapshot.params['idBoard'];
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
        const data = { title: this.taskForm.value.title, boardId: this.idBoard }
        this.subscription = this.taskService.addTask(data)
        .subscribe(
            (response: any)=> {
                this.formTask.emit();

            },
            (error)=> {
                console.log(error)
            }
        )
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
