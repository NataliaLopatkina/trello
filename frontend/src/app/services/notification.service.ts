import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class NotificationService {
    public addNotification = new Subject();
    public addInfoNotification = new Subject();
    public removeNotification = new Subject();
    public addNotificationText = new Subject();
}
