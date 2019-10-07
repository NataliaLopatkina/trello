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

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.notificationService.addNotification.subscribe(
            (notification: {message: boolean, messageText: string})=> {
                if (notification) {
                    this.message = notification.message;
                    this.messageText = notification.messageText;
                }
            }
        )
    }

    ngOnDestroy() {
        this.notificationService.addNotification.unsubscribe();
    }

    removeNotification() {
        this.notificationService.deleteNotification();
    }
}
