import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PopupService {
    public popup = new Subject()

    public addPopup() {
        this.popup.next(true)
    }

    public deletePopup() {
        this.popup.next(false)
    }
}
