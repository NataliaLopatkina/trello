import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PopupService } from '../../services/popup.service';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-create-card',
    templateUrl: './create-card.component.html',
    styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit, OnDestroy {

    idBoard: number;
    popup: boolean = false;
    taskForm: FormGroup;
    subscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private popupService: PopupService,
        private formBuilder: FormBuilder,
        private taskService: TaskService) { 
            this.idBoard = activatedRoute.snapshot.params['idBoard'];
        }

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
        const data = { title: this.taskForm.value.title, boardId: this.idBoard }
        this.subscription = this.taskService.createTask(data)
        
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
