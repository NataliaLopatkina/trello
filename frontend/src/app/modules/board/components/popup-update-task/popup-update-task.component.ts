import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-popup-update-task',
    templateUrl: './popup-update-task.component.html',
    styleUrls: ['./popup-update-task.component.scss']
})
export class PopupUpdateTaskComponent implements OnInit {

    @Output() popupTask = new EventEmitter<boolean>();
    editTitle: boolean = false;
    formEditTitleTask: FormGroup;
    titleTask: string = 'Test';
    formEditDescriptionTask: FormGroup;
    editDescription: boolean = true;

    constructor(
        private formBuilder: FormBuilder) { }

    ngOnInit() {

        this.formEditDescriptionTask = this.formBuilder.group({
            description: ['', Validators.required]
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

    addDescriptionTask() {
        console.log('Запрос на сервер с добавлением или редактированием описания!');
    }
}
