import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

    message: boolean = false;
    messageText: string = '';
    info: boolean = false;
    subscription: Subscription;

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.subscription = this.notificationService.addNotification.subscribe(
            (notification: {message: boolean, messageText: string, info: boolean})=> {
                if (notification) {
                    this.message = notification.message;
                    this.messageText = notification.messageText;
                    this.info = notification.info;
                }
            }
        )
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    removeNotification() {
        this.notificationService.deleteNotification();
    }
}
