import { Component } from '@angular/core';

import { AuthService } from '@services/auth.service';

@Component({
    selector: 'app-header-home',
    templateUrl: './header-home.component.html',
    styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent {
    constructor(private authService: AuthService) { }

    logout() {
        this.authService.logout();
    }
}
