import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BoardService } from '../../../../services/board.service';

@Component({
    selector: 'app-board-header',
    templateUrl: './board-header.component.html',
    styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit, OnDestroy {
    
    subscription: Subscription;
    titleBoard: string = '';
    formRenameBoard: FormGroup;
    edit: boolean = false;
    idBoard: number;
    
    constructor(
        private boardService: BoardService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute){
            this.idBoard = this.activatedRoute.snapshot.params['idBoard']
        }

    ngOnInit() {
        this.subscription = this.boardService.board
        .subscribe(
            (board: any)=> {
                this.titleBoard = board.title;
            }
        )

        this.renameBoard();
    }

    renameBoard() {
        this.formRenameBoard = this.formBuilder.group({
            title: ['', Validators.required]
        })
    }

    editTitleBoard() {
        this.edit = true;
    }

    focusOut() {
        this.edit = false;
    }

    updateNameBoard() {
        const data = { id: this.idBoard, title: this.formRenameBoard.value.title }
        this.boardService.renameBoard(data).subscribe();
        this.titleBoard = this.formRenameBoard.value.title;
        this.edit = false;
    }

    ngOnDestroy(){
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
