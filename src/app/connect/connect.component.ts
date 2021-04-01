import { Component } from '@angular/core';
import { listStagger } from '@core/animations/animations';

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
          *ngFor="let connection of connections"
          [ngStyle]="{ bottom: connection.position.bottom }"
          class="circle-link"
          title="Animations"
          href="https://angular.io/guide/animations"
          target="_blank"
          rel="noopener"
        >
          <svg
            id="Group_20"
            data-name="Group 20"
            xmlns="http://www.w3.org/2000/svg"
            width="21.813"
            height="23.453"
            viewBox="0 0 21.813 23.453"
          >
            <path
              id="Path_15"
              data-name="Path 15"
              d="M4099.584,972.736h0l-10.882,3.9,1.637,14.4,9.245,5.153,9.245-5.153,1.686-14.4Z"
              transform="translate(-4088.702 -972.736)"
              fill="#ffa726"
            />
            <path
              id="Path_16"
              data-name="Path 16"
              d="M4181.516,972.736v23.453l9.245-5.153,1.686-14.4Z"
              transform="translate(-4170.633 -972.736)"
              fill="#fb8c00"
            />
            <path
              id="Path_17"
              data-name="Path 17"
              d="M4137.529,1076.127l-7.7-3.723,4.417-2.721,7.753,3.723Z"
              transform="translate(-4125.003 -1058.315)"
              fill="#ffe0b2"
            />
            <path
              id="Path_18"
              data-name="Path 18"
              d="M4137.529,1051.705l-7.7-3.723,4.417-2.721,7.753,3.723Z"
              transform="translate(-4125.003 -1036.757)"
              fill="#fff3e0"
            />
            <path
              id="Path_19"
              data-name="Path 19"
              d="M4137.529,1027.283l-7.7-3.723,4.417-2.721,7.753,3.723Z"
              transform="translate(-4125.003 -1015.199)"
              fill="#fff"
            />
          </svg>
        </a>
        <!-- <a
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
        </a> -->
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
      position: { bottom: `${4.5}rem` },
      icon: 'linkedin_icon'
    },
    {
      link: 'https://twitter.com/MathGarb',
      position: { bottom: `${8}rem` },
      icon: 'twitter_icon'
    }
  ];

  openLink(link: string) {
    window.open(link, '_blank');
    this.isShowingConnections = false;
  }
}
