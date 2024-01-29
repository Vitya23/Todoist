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
        this._el.nativeElement.style.color = 'var(--red-300)';
        break;
      case 2:
        this._el.nativeElement.style.color = 'var(--orange-200)';
        break;
      case 3:
        this._el.nativeElement.style.color = 'var(--blue-200)';
        break;
      case 4:
        this._el.nativeElement.style.color = 'var(--surface-800)';
        break;
    }
  }
}
