import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../services/auth.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;
    subscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['nata.salimowa2015@yndex.ru', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            password: ['tosovu96', [Validators.required, Validators.minLength(5)]]
        })
    }

    login() {
        this.subscription = this.authService.login(this.loginForm.value)
        .subscribe(
            (response) => {
                this.router.navigate(['boards']);
                this.notificationService.deleteNotification();
            },

            (error)=> {
                if (error.error.message === 'Неверный логин или пароль!') {
                    this.notificationService.error(error.error.message);
                }
            }
        )
    }

    authWithGoogle() {
        this.subscription = this.authService.authWithGoogle()
        .subscribe(
            (response)=> {
                console.log(response)
            },

            (error)=> {
                console.log(error)
            }
        )
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
