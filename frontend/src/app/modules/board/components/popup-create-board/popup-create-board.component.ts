import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BoardService } from '../../../../services/board.service';

@Component({
    selector: 'app-popup-create-board',
    templateUrl: './popup-create-board.component.html',
    styleUrls: ['./popup-create-board.component.scss']
})
export class PopupCreateBoardComponent implements OnInit, OnDestroy {

    @Output() popupBoard = new EventEmitter<boolean>();
    formCreateBoard: FormGroup;
    subscription: Subscription;
    color: string = 'rgb(131, 140, 145)';
    colors: Array<string> = ['rgb(0, 121, 191)', 'rgb(210, 144, 52)', 'rgb(81, 152, 57)', 'rgb(176, 70, 50)', 'rgb(137, 96, 158)', 'rgb(205, 90, 145)', 'rgb(0, 174, 204)']

    constructor(
        private formBuilder: FormBuilder,
        private boardService: BoardService,
        private router: Router) { }

    ngOnInit() {
        this.formCreateBoard = this.formBuilder.group({
            title: ['', [Validators.required]]
        })
    }

    addColorBoard(color) {
        this.color = color;
    }

    createBoard() {
        const data = { title: this.formCreateBoard.value.title, color: this.color }
        this.subscription = this.boardService.createBoard(data)
        .subscribe(
            (response: any) => {
                this.router.navigate(['boards/', response.board.id])
            },

            (error) => {
                console.log(error)
            }
        );
    }

    removePopupCreateBoard() {
        this.popupBoard.emit();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
