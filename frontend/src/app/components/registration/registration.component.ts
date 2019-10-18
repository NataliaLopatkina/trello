import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

    registrationForm: FormGroup;
    users: User[] = [];
    subscription: Subscription;
    email: string;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationService) {
            this.email = activatedRoute.snapshot.params['email'];
        }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            email: [this.email, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            name: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(5)]]
        })
    }

    registration() {
        this.subscription = this.authService.registration(this.registrationForm.value)
        .subscribe(
            (response) => {
                this.router.navigate(['dashboard']);
                this.notificationService.deleteNotification();
            },

            (error)=> {
                if (error.status === 403) {
                    const text = 'Почта уже используется другим аккаунтом. Вы можете использовать вход.';
                    this.notificationService.error(text);
                }
            }
        )
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }   
    }
}
