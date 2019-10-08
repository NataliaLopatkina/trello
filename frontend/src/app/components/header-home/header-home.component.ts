import { SubscriptionLike } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header-home',
    templateUrl: './header-home.component.html',
    styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit, OnDestroy {

    searchForm: FormGroup;
    boards: Board[] = [];
    subscription: SubscriptionLike;

    constructor(
        private formBuilder: FormBuilder,
        private boardService: BoardService,
        private authService: AuthService) { }

    ngOnInit() {
        this.addSearchForm();
    }

    addSearchForm() {
        this.searchForm = this.formBuilder.group({
            search: ['', Validators.required]
        })
    }

    search() {
        this.subscription = this.boardService.searchBoards(this.searchForm.value.search)
        .subscribe(
            (response: any)=> {
                if (response) {
                    this.boards = response.data;
                }
            },

            (error)=> {
                console.log(error)
            }
        )
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        //this.subscription.unsubscribe();
    }
}
