import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PopupService {

    public popup() {
        this.addPopup.next({ popup: true })
    }

    public deletePopup() {
        this.addPopup.next({ popup: false })
    }

    public addPopup = new Subject();
}
