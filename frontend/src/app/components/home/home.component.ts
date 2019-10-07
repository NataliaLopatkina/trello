import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Board } from '../../models/board';
import { AuthService } from '../../services/auth.service';
import { BoardService } from '../../services/board.service';
import { PopupService } from '../../services/popup.service';
 
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    popup: boolean = false;
    boards: Board [] = [];
    searchForm: FormGroup;

    constructor(
        private authService: AuthService,
        private boardService: BoardService,
        private popupService: PopupService,
        private formBuilder: FormBuilder ) { }

    ngOnInit() {
        this.drawBoards();
        this.addSearchForm();
    }

    logout() {
        this.authService.logout();
    }

    addBoard() {
        this.popupService.popup();
    }

    drawBoards() {
        this.boardService.getBoards()
        .subscribe(
            (response: any) => {
                this.boards = response.data;
            },

            (error) => {
                console.log(error)
            }
        )
    }

    addSearchForm() {
        this.searchForm = this.formBuilder.group({
            search: ['', Validators.required]
        })
    }

    search() {
        this.boardService.searchBoards(this.searchForm.value.search)
        .subscribe(
            (response)=> {
                console.log(response)
            },
            (error)=> {
                console.log(error)
            }
        )
    }
}
