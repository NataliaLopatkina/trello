import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const valueIsAuth = this.authService.getToken();
        if (valueIsAuth) {
            return true;

        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
