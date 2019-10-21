import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[focus]'
})
export class FocusDirective {

    constructor(private elementRef: ElementRef) {
        if (!elementRef.nativeElement['focus']) {
            throw new Error('Element does not accept focus.');
        }
    }

    ngOnInit(): void {
        const input = this.elementRef.nativeElement;
        input.focus();
        input.select();
    }
}
