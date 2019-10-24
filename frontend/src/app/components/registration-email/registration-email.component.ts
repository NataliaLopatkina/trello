import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration-email',
    templateUrl: './registration-email.component.html',
    styleUrls: ['./registration-email.component.scss']
})
export class RegistrationEmailComponent implements OnInit {

    registrationEmailForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router) { }

    ngOnInit() {
        this.registrationEmailForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]]
        })
    }

    registrationEmail() {
        const email = this.registrationEmailForm.value.email;
        this.router.navigate(['auth/registration/' + email]);
    }
}
