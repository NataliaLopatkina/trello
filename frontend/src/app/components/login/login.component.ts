import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            password: ['', [Validators.required, Validators.minLength(5)]]
        })
    }

    login() {
        this.authService.login(this.loginForm.value)
        .subscribe(
            (data)=> {
                this.router.navigate(['/boards']);
                this.notificationService.deleteNotification();
            },

            (error)=> {
                if (error.error.password === false) {
                    const text = 'Неверный пароль';
                    this.notificationService.error(text);

                } else if (error.error.email === false) {
                    const text = 'Аккаунт с таким адресом электронной почты не существует';
                    this.notificationService.error(text);
                }
            }
        )
    }
}
