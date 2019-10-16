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
    color: string = "#97a0af";

    constructor(
        private formBuilder: FormBuilder,
        private popupService: PopupService,
        private boardService: BoardService,
        private router: Router) { }

    ngOnInit() {
        this.boardForm = this.formBuilder.group({
            title: ['', [Validators.required]]
        })

        this.subscription = this.popupService.addPopup.subscribe(
            (popupCreate: { popup: boolean }) => {
                if (popupCreate) {
                    this.popup = popupCreate.popup;
                }
            }
        )
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    removePopup() {
        this.popupService.deletePopup();
    }

    createBoard() {
        const data = { title: this.boardForm.value.title, color: this.color }
        this.subscription = this.boardService.createBoard(data)
        .subscribe(
            (response) => {
                this.popup = false;
                this.router.navigate(['board', this.boardForm.value.title])
            },

            (error) => {
                console.log(error)
            }
        );
    }

    addRedColor() {
        this.color = 'red';
    }

    addBlueColor() {
        this.color = 'blue';
    }

    addOrangeColor() {
        this.color = 'orange';
    }

    addGreenColor() {
        this.color = 'green';
    }

    addYellowColor() {
        this.color = '#f7cc00';
    }

    addVioletColor() {
        this.color = 'violet';
    }

    addPinkColor() {
        this.color = 'pink';
    }
}
