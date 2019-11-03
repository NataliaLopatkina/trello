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
    inviteForm: boolean = false;
    
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
                if(board) {
                    this.titleBoard = board.title;
                }

                this.initFormRenameBoard();
            }
        )
    }

    initFormRenameBoard() {
        this.formRenameBoard = this.formBuilder.group({
            title: [this.titleBoard, Validators.required]
        })
    }

    updateNameBoard() {
        if (this.titleBoard !== this.formRenameBoard.value.title) {
            this.subscription = this.boardService.renameBoard(this.idBoard, this.formRenameBoard.value.title).subscribe();
            this.titleBoard = this.formRenameBoard.value.title;
        } else {
            return
        }
    }

    ngOnDestroy(){
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
