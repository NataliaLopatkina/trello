import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-registration-email',
    templateUrl: './registration-email.component.html',
    styleUrls: ['./registration-email.component.scss']
})
export class RegistrationEmailComponent implements OnInit, OnDestroy {

    registrationFormEmail: FormGroup;
    users: User[] = [];
    subscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.registrationFormEmail = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            name: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(5)]]
        })
    }

    registration() {
        this.subscription = this.authService.registration(this.registrationFormEmail.value)
        .subscribe(
            (data) => {
                this.router.navigate(['/boards']);
                this.notificationService.deleteNotification();
            },

            (error)=> {
                const text = 'Почта уже используется другим аккаунтом. Вы можете использовать вход.';
                this.notificationService.error(text);
            }
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
