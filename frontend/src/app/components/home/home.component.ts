import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { BoardService } from '../../services/board.service';
 
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    popup: boolean = false;
    boardForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private boardService: BoardService,
        private router: Router ) { }

    ngOnInit() {
        this.boardForm = this.formBuilder.group({
            title: ['', [Validators.required]]
        })
    }

    logout() {
        this.authService.logout();
    }

    addBoard() {
        this.popup = true;
    }

    removePopup() {
        this.popup = false;
    }

    createBoard() {
        this.boardService.createBoard(this.boardForm.value)
        .subscribe(
            (response)=> {
                console.log(response)
            },

            (error)=> {
                console.log(error)
            }
        );
    }
}
