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
    popup: boolean = true;
    formTitleTask: FormGroup;
    titleTask: string = 'Task';
    update: boolean = false;

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

        this.initFormTitleTask();
    }

    initFormTitleTask() {
        this.formTitleTask = this.formBuilder.group({
            title: [this.titleTask, Validators.required]
        })
    }

    closePopup() {
        this.popupService.deletePopup();
    }

    editTitleTask() {
        this.update = true;
    }

    focusOut() {
        this.update = false;
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
