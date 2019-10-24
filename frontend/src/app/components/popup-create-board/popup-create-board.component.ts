import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PopupService } from '../../services/popup.service';
import { BoardService } from '../../services/board.service';

@Component({
    selector: 'app-popup-create-board',
    templateUrl: './popup-create-board.component.html',
    styleUrls: ['./popup-create-board.component.scss']
})
export class PopupCreateBoardComponent implements OnInit, OnDestroy {

    popup: boolean = false;
    boardForm: FormGroup;
    subscription: Subscription;
    color: string = 'rgb(131, 140, 145)';
    colors: Array<string> = ['rgb(0, 121, 191)', 'rgb(210, 144, 52)', 'rgb(81, 152, 57)', 'rgb(176, 70, 50)', 'rgb(137, 96, 158)', 'rgb(205, 90, 145)', 'rgb(0, 174, 204)']

    constructor(
        private formBuilder: FormBuilder,
        private popupService: PopupService,
        private boardService: BoardService,
        private router: Router) { }

    ngOnInit() {
        this.subscription = this.popupService.addPopup.subscribe(
            (popupCreate: { popup: boolean }) => {
                if (popupCreate) {
                    this.popup = popupCreate.popup;
                }
            }
        )

        this.initBoardForm();
    }

    initBoardForm() {
        this.boardForm = this.formBuilder.group({
            title: ['', [Validators.required]]
        })
    }

    addColor(color) {
        this.color = color;
    }

    createBoard() {
        this.subscription = this.boardService.createBoard({ title: this.boardForm.value.title, color: this.color })
        .subscribe(
            (response) => {
                this.router.navigate(['boards', this.boardService.id, this.boardService.title]);
            },

            (error) => {
                console.log(error)
            }
        );
    }

    removePopup() {
        this.popupService.deletePopup();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
