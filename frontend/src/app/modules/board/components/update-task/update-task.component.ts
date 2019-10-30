import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-update-task',
    templateUrl: './update-task.component.html',
    styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    popup: boolean = false;
    // formTitleTask: FormGroup;
    // titleTask: string = 'Task';
    // updateTitle: boolean = false;
    // formDescriptionTask: FormGroup;
    // updateDescription: boolean = false;

    constructor(
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        // this.subscription = this.popupService.popup.subscribe(
        //     (popup: boolean)=> {
        //         this.popup = popup;
        //     }
        // )
    }

    removeFormUpdateTask() {
        //this.popupService.deletePopup();
        console.log('kkkkk')
    }

    // initFormTitleTask() {
    //     this.formTitleTask = this.formBuilder.group({
    //         title: [this.titleTask, Validators.required]
    //     })
    // }

    // editTitleTask() {
    //     this.updateTitle = true;
    //     this.initFormTitleTask();
    // }

    // focusOut() {
    //     this.updateTitle = false;
    // }

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
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
