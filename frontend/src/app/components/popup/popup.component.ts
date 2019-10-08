import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PopupService } from '../../services/popup.service';
import { BoardService } from '../../services/board.service';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {

    popup: boolean = false;
    boardForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private popupService: PopupService,
        private boardService: BoardService,
        private router: Router) { }

    ngOnInit() {
        this.boardForm = this.formBuilder.group({
            title: ['', [Validators.required]]
        })

        this.popupService.addPopup.subscribe(
            (popupCreate: { popup: boolean }) => {
                if (popupCreate) {
                    this.popup = popupCreate.popup;
                }
            }
        )
    }

    ngOnDestroy() {
        this.popupService.addPopup.unsubscribe();
    }

    removePopup() {
        this.popupService.deletePopup();
    }

    createBoard() {
        this.boardService.createBoard(this.boardForm.value)
        .subscribe(
            (response) => {
                this.popup = false;
                this.router.navigate(['/board'])
            },

            (error) => {
                console.log(error)
            }
        );
    }
}
