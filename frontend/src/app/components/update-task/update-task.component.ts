import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PopupService } from '../../services/popup.service';

@Component({
    selector: 'app-update-task',
    templateUrl: './update-task.component.html',
    styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    popup: boolean = false;
    formTitleTask: FormGroup;
    titleTask: string = 'Task';
    updateTitle: boolean = false;
    formDescriptionTask: FormGroup;
    updateDescription: boolean = false;

    constructor(
        private popupService: PopupService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.subscription = this.popupService.addPopup.subscribe(
            (popupCreate: { popup: boolean }) => {
                if (popupCreate) {
                    this.popup = popupCreate.popup;
                }
            }
        )
    }

    closePopup() {
        this.popupService.deletePopup();
    }

    initFormTitleTask() {
        this.formTitleTask = this.formBuilder.group({
            title: [this.titleTask, Validators.required]
        })
    }

    editTitleTask() {
        this.updateTitle = true;
        this.initFormTitleTask();
    }

    focusOut() {
        this.updateTitle = false;
    }

    initFormDescriptionTask() {
        this.formDescriptionTask = this.formBuilder.group({
            description: ['', Validators.required]
        })
    }

    editDescriptionTask() {
        this.updateDescription = true;
        this.initFormDescriptionTask();
    }

    focusOutDescription() {
        setTimeout(()=> {
            this.updateDescription = false;
        }, 200)
    }

    addDescription() {
        console.log(this.formDescriptionTask.value);
    }

    closeUpdateDescription() {
        this.updateDescription = false;
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}