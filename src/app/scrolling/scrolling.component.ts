import { Component, Input } from '@angular/core';
import { rotateAnimation } from '@core/animations/animations';

@Component({
  selector: 'app-scrolling',
  template: `
    <a class="box bounce-2" mat-fab color="primary" aria-label="Scroll to top">
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
        left: 50%;
        bottom: 3rem;
      }

      .box {
        animation-duration: 2s;
        animation-iteration-count: infinite;
      }

      .bounce-2 {
        animation-name: bounce-2;
        animation-timing-function: ease;
      }
      @keyframes bounce-2 {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-50px);
        }
        100% {
          transform: translateY(0);
        }
      }
    `
  ],
  animations: [rotateAnimation]
})
export class ScrollingComponent {
  @Input() currentState: string;
}
