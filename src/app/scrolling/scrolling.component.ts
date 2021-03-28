import { Component } from '@angular/core';
import { bounceAnimation } from '../core/animations/animations';

@Component({
  selector: 'app-scrolling',
  template: `
    <a mat-fab color="primary" aria-label="Scroll to top" @bounceAnimation>
      <mat-icon svgIcon="arrow_up_icon"></mat-icon>
    </a>
  `,
  animations: [bounceAnimation]
})
export class ScrollingComponent {
  constructor() {}
}
