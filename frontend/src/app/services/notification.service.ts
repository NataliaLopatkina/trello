import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class NotificationService {

    public error(messageText: string) {
        this.addNotification.next({message: true, messageText})
    }

    public deleteNotification() {
        this.addNotification.next({message: false})
    }

    public addNotification = new Subject();
}
