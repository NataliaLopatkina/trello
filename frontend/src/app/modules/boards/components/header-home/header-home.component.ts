import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Board } from '../../../../models/board';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-header-home',
    templateUrl: './header-home.component.html',
    styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit, OnDestroy {
    boards: Board[] = [];
    subscription: Subscription;

    constructor(
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() {
    }

    returnHome() {
        const id = this.authService.userId;
        this.router.navigate(['dashboard/user' + id + '/' + 'boards']);
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
