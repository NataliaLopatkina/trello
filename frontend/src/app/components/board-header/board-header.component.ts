import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BoardService } from '../../services/board.service';

@Component({
    selector: 'app-board-header',
    templateUrl: './board-header.component.html',
    styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    nameBoard: string = '';
    idBoard: number;
    edit: boolean = false;
    formRenameBoard: FormGroup;

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private boardService: BoardService) {

        this.nameBoard = activatedRoute.snapshot.params['nameBoard'];
        this.idBoard = activatedRoute.snapshot.params['idBoard'];
    }

    ngOnInit() {
        this.addFormRenameBoard();
    }

    addFormRenameBoard() {
        this.formRenameBoard = this.formBuilder.group({
            title: [this.nameBoard, Validators.required]
        })
    }

    editTitleBoard() {
        this.edit = true;
    }

    focusOut() {
        this.edit = false;
    }

    renameBoard() {
        this.subscription = this.boardService.renameBoard(this.idBoard, this.formRenameBoard.value.title)
        .subscribe(
            (response) => {
                this.edit = false;
                this.nameBoard = this.formRenameBoard.value.title;
            },

            (error) => {
                console.log(error)
            }
        )
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
