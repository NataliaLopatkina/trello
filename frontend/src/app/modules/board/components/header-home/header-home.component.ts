import { Component } from '@angular/core';

import { AuthenticationService } from '@services/authentication.service';

@Component({
    selector: 'app-header-home',
    templateUrl: './header-home.component.html',
    styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent {
    constructor(private authService: AuthenticationService) { }

    logout() {
        this.authService.logout();
    }
}
