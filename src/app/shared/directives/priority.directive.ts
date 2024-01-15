import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[highlightPriority]',
})
export class PriorityDirective {
  @Input('priority') set priority(priority: number) {
    this._highlightPriority(priority);
  }

  constructor(private _el: ElementRef) {}

  private _highlightPriority(priority: number): void {
    switch (priority) {
      case 1:
        this._el.nativeElement.classList.add('red');
        break;
      case 2:
        this._el.nativeElement.classList.add('orange');
        break;
      case 3:
        this._el.nativeElement.classList.add('blue');
        break;
      case 4:
        this._el.nativeElement.classList.add('default');
        break;
    }
  }
}
