import { Component } from '@angular/core';
import { listStagger } from '../core/animations/animations';

export interface Connection {
  link: string;
  position: { bottom: string };
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
          (click)="openLink(connection.link)"
          aria-label="connection"
          *ngFor="let connection of connections"
          target="_blank"
          class="connection"
          [ngStyle]="{ bottom: connection.position.bottom }"
        >
          <button mat-fab color="primary">
            <div class="btn-content">
              <mat-icon [svgIcon]="connection.icon"></mat-icon>
            </div>
          </button>
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./connect.component.scss'],
  animations: [listStagger]
})
export class ConnectComponent {
  isShowingConnections: boolean;

  connections: Connection[] = [
    {
      link: 'https://linkedin.com/in/mathis-garberg-451672144/',
      position: { bottom: `${9}rem` },
      icon: 'linkedin_icon'
    },
    {
      link: 'https://twitter.com/MathGarb',
      position: { bottom: `${13}rem` },
      icon: 'twitter_icon'
    }
  ];

  openLink(link: string) {
    window.open(link, '_blank');
    this.isShowingConnections = false;
  }
}
