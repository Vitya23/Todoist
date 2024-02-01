import { Directive, ElementRef, Input } from '@angular/core';
import { HighlightColor } from '../enums/highlight.enum';

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
        this._el.nativeElement.style.color = HighlightColor.RED;
        break;
      case 2:
        this._el.nativeElement.style.color = HighlightColor.ORANGE;
        break;
      case 3:
        this._el.nativeElement.style.color = HighlightColor.BLUE;
        break;
      case 4:
        this._el.nativeElement.style.color = HighlightColor.DEFAULT;
        break;
    }
  }
}
