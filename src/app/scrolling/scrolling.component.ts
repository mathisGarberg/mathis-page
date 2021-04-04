import { Component, Input } from '@angular/core';
import { rotateAnimation } from '@core/animations/animations';

@Component({
  selector: 'app-scrolling',
  template: `
    <a mat-fab color="primary" aria-label="Scroll to top">
      <!-- <mat-icon
        [@rotatemat-icondState]="currentState"
        svgIcon="arrow_up_icon"
      ></mat-icon> -->
    </a>
  `,
  animations: [rotateAnimation]
})
export class ScrollingComponent {
  @Input() currentState: string;
}