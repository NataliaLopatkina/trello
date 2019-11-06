import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";

import { AuthenticationService } from '@services/authentication.service';
import { NotificationService } from '@services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;
    subscription: Subscription;
    user: SocialUser;
    idToken: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            password: ['', [Validators.required, Validators.minLength(5)]]
        })        
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.idToken = this.user.idToken;
        });

        this.subscription = this.authenticationService.signInWithGoogle(this.idToken)
            .subscribe()
      }

    login() {
        this.subscription = this.authenticationService.login(this.loginForm.value)
        .subscribe(
            (response) => {
                this.router.navigate(['boards']);
            },

            (error)=> {
                this.notificationService.error(error.error.message);
            }
        )
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
