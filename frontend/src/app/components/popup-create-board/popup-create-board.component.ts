import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PopupService } from '../../services/popup.service';
import { AuthService } from '../../services/auth.service';
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
    color: string = '#97a0af';
    colors: Array<string> = ['#FF6347', '#00CED1', '#F4A460', '#00FA9A', '#FFD700', '#DDA0DD', '#FF69B4']

    constructor(
        private formBuilder: FormBuilder,
        private popupService: PopupService,
        private authService: AuthService,
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
                const id = this.boardService.id;
                const title = this.boardService.title;
                
                this.popup = false;
                this.router.navigate(['dashboard/', id, title]);
            },

            (error) => {
                console.log(error)
            }
        );
    }

    addColor(color) {
        this.color = color;
    }
}
