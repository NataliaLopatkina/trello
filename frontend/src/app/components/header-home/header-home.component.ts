import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header-home',
    templateUrl: './header-home.component.html',
    styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit, OnDestroy {
    boards: Board[] = [];
    subscription: Subscription;

    constructor(
        private boardService: BoardService,
        private authService: AuthService) { }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
