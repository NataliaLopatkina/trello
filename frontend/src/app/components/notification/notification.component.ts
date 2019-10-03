import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

    message: boolean = false;
    messageInfo: boolean = false;
    messageText: string = '';

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.notificationService.addNotification.subscribe(
            (notification: boolean)=> {
                if (notification) {
                    this.message = true;

                    // setTimeout(()=> {
                    //     this.message = false;
                    // }, 2000)
                }
            }
        )

        this.notificationService.addInfoNotification.subscribe(
            (notificationInfo: boolean)=> {
                if (notificationInfo) {
                    this.message = true;
                    this.messageInfo = true;

                    setTimeout(() => {
                        this.message = false;
                        this.messageInfo = false;
                    }, 2000)
                }
            }
        )

        this.notificationService.removeNotification.subscribe(
            (notification: boolean)=> {
                if (notification) {
                    this.message = false;
                }
            }
        )

        this.notificationService.addNotificationText.subscribe(
            (text: string)=> {
                this.messageText = text;
            }
        )
    }

    ngOnDestroy() {
        this.notificationService.addNotification.unsubscribe();
        this.notificationService.addInfoNotification.unsubscribe();
        this.notificationService.removeNotification.unsubscribe();
        this.notificationService.addNotificationText.unsubscribe();
    }

    removeNotification() {
        this.notificationService.removeNotification.next(true);
    }
}
