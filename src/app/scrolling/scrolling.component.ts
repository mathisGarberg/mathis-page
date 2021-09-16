import { Component, Input, Output, EventEmitter } from '@angular/core';
import { rotateAnimation } from '@core/animations/animations';

@Component({
  selector: 'app-scrolling',
  template: `
    <a
      class="box bounce-2"
      mat-fab
      color="primary"
      aria-label="Scroll to top"
      (click)="scrollClick.emit()"
    >
      <mat-icon
        [@rotatedState]="currentState"
        svgIcon="arrow_up_icon"
      ></mat-icon>
    </a>
  `,
  styles: [
    `
      a {
        position: fixed;
        right: 8rem;
        bottom: 2rem;
      }
    `
  ],
  animations: [rotateAnimation]
})
export class ScrollingComponent {
  @Input() currentState: string;
  @Output() scrollClick = new EventEmitter();
}
