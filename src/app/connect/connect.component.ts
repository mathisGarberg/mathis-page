import { Component } from '@angular/core';
import { listStagger } from '@core/animations/animations';

export interface Connection {
  link: string;
  icon: string;
}

@Component({
  selector: 'app-connect',

  template: `
    <div class="speed-dial-buttons">
      <a
        mat-fab
        color="primary"
        aria-label="Speed dial items"
        class="speed-dial-items"
        (click)="isShowingConnections = !isShowingConnections"
      >
        <mat-icon svgIcon="connect_icon"></mat-icon>
      </a>
      <div class="speed-dial-list" @listStagger *ngIf="isShowingConnections">
        <a
          *ngFor="let connection of connections; let i = index"
          [ngStyle]="{ bottom: i * 3.5 + 3.5 + 'rem' }"
          class="circle-link"
          title="Animations"
          [href]="connection.link"
          href="https://angular.io/guide/animations"
          target="_blank"
          rel="noopener"
        >
          <mat-icon>circle</mat-icon>
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      a,
      a[mat-fab] {
        position: fixed;
        right: 3.5rem;
        bottom: 2rem;

        svg {
          height: 1.8rem;
          fill: #fff;
        }
      }

      .circle-link {
        height: 40px;
        width: 40px;
        border-radius: 40px;
        margin: 8px;
        background-color: white;
        border: 1px solid #eeeeee;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: 1s ease-out;
      }

      .circle-link:hover {
        transform: translateY(-0.25rem);
        box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
      }
    `
  ],
  animations: [listStagger]
})
export class ConnectComponent {
  isShowingConnections: boolean;

  connections: Connection[] = [
    {
      link: 'https://linkedin.com/in/mathis-garberg-451672144/',
      icon: 'linkedin_icon'
    },
    {
      link: 'https://twitter.com/MathGarb',
      icon: 'twitter_icon'
    }
  ];
}
