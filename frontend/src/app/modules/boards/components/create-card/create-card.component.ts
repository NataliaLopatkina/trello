import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TaskService } from '../../../../services/task.service';

@Component({
    selector: 'app-create-card',
    templateUrl: './create-card.component.html',
    styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit, OnDestroy {

    idBoard: number;
    taskForm: FormGroup;
    subscription: Subscription;
    createTask: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private taskService: TaskService) { 
            this.idBoard = activatedRoute.snapshot.params['idBoard'];
        }

    ngOnInit() {
        this.subscription = this.taskService.createTask
            .subscribe(
                (createTask: boolean) => {
                    this.createTask = createTask
                }
            )
        this.addTaskForm();
    }

    removeFormCreateTask() {
        this.taskService.removeFormCreateTask();
    }

    addTaskForm() {
        this.taskForm = this.formBuilder.group({
            title: ['', Validators.required]
        })
    }

    addTask() {
        const data = { title: this.taskForm.value.title, boardId: this.idBoard }
        //this.subscription = this.taskService.createTask(data)
        
        // .subscribe(
        //     (response: any)=> {
        //         console.log(response)
        //     },

        //     (error)=> {
        //         console.log(error)
        //     }
        // )

        // this.popupService.deletePopup();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
