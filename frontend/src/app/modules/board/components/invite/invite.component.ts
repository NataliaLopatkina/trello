import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-invite',
    templateUrl: './invite.component.html',
    styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

    @Output() formInvite = new EventEmitter<boolean>();
    formInvitation: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.formInvitation = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            text: ['Я работаю над этим проектом в Trello и хочу поделиться им с вами!', [Validators.required]]
        })
    }

    removeInvite() {
        this.formInvite.emit()
    }

}
