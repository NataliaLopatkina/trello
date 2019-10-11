import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({providedIn: 'root'})

export class AuthService {

    isAuth: boolean = false;

    constructor(
        private httpClient: HttpClient,
        private router: Router) {}
    
    public registration(user: User) {
        const data = {name: user.name, email: user.email, password: user.password};
        return this.httpClient.post('http://localhost:3000/registration', data);
    }

    public provideAccess() {
        return this.isAuth;
    }

    public login(user: User) {
        const data = {email: user.email, password: user.password};
        return this.httpClient.post<any>('http://localhost:3000/login', data)
            .pipe(map(response => {
                localStorage.setItem('accessToken', JSON.stringify(response.accessToken));
                this.isAuth = true;
            }))
    }

    public getToken(): string {
        return localStorage.getItem('accessToken');
    }

    public logout() {
        this.isAuth = false;
        this.router.navigate(['/']);
        localStorage.removeItem('accessToken');
    }
}
