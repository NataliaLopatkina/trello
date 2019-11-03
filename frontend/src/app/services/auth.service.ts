import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { map, tap, mapTo, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Tokens } from '../models/tokens';

@Injectable({providedIn: 'root'})

export class AuthService {

    isAuth: boolean = false;
    private accessToken = 'accessToken';
    private resfreshToken = 'refreshToken';
    private loggedUser: string;

    constructor(
        private httpClient: HttpClient,
        private router: Router) {}
    
    public registration(user: User) {
        const data = {name: user.name, email: user.email, password: user.password};
        return this.httpClient.post<any>(environment.baseUrl + 'registration', data)
    }

    public login(user: User) {
        const data = {email: user.email, password: user.password};
        return this.httpClient.post<any>(environment.baseUrl + 'login', data)
            .pipe(
                tap(tokens => 
                    this.doLoginUser(user.name, tokens),
                ),
                mapTo(true),
                catchError(error => {
                alert(error.error);
                return of(false);
            }));
            // .pipe(map(response => {
            //     localStorage.setItem('accessToken', JSON.stringify(response.accessToken));
            //     this.isAuth = true;
            // }))
    }

    isLoggedIn() {
        return !!this.getAccessToken();
    }

    refreshTokenRequest() {
        return this.httpClient.post<any>(environment.baseUrl + '/refresh', {
          'refreshToken': this.getRefreshToken()
        }).pipe(tap((tokens: Tokens) => {
          this.storeAccessToken(tokens.accessToken);
        }));
    }

    getAccessToken() {
        return localStorage.getItem(this.accessToken);
    }

    private doLoginUser(name, tokens: Tokens) {
        this.loggedUser = name;
        this.storeTokens(tokens);
    }

    private getRefreshToken(): string {
        return localStorage.getItem(this.resfreshToken)
    }

    private storeAccessToken(accessToken: string) {
        localStorage.setItem(this.accessToken, accessToken);
      }

    private storeTokens(tokens: Tokens) {
        localStorage.setItem(this.accessToken, tokens.accessToken);
        localStorage.setItem(this.resfreshToken, tokens.refreshToken);
    }

    public authWithVk() {
        return this.httpClient.get(environment.baseUrl + 'vkontakte')
    }

    public provideAccess() {
        return this.isAuth;
    }

    public getToken(): string {
        return localStorage.getItem('accessToken');
    }

    public logout() {
        this.isAuth = false;
        this.router.navigate(['']);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}
