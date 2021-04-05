import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  NgModule
} from '@angular/core';

@Component({
  selector: 'app-card-button',
  template: `
    <a
      [ngClass]="{ 'card-small': isSmall }"
      class="card"
      target="_blank"
      rel="noopener"
      href="https://angular.io/tutorial"
    >
      <svg
        class="material-icons"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
        />
      </svg>

      <p>{{ content }}</p>

      <svg
        class="material-icons"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      </svg>
    </a>
  `,
  styleUrls: ['./card-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardButtonComponent {
  @Input() icon: string;
  @Input() content: string;
  @Input() matColor: string;
  @Input() isSmall = false;
}

@NgModule({
  imports: [CommonModule],
  declarations: [CardButtonComponent],
  exports: [CardButtonComponent]
})
export class CardButtonModule {}
