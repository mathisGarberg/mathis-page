import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-card',
  template: `
    <div class="card-container">
      <header class="card-header">
        <div class="folder-icon">
          <mat-icon
            [svgIcon]="icon"
            inline="true"
            [ngStyle]="{
              width: iconWidth + 'px'
            }"
          ></mat-icon>
        </div>
        <div class="article-link">
          <code>
            <small>{{ createdAt }}</small>
          </code>
        </div>
      </header>
      <section class="card-content">
        <h3 class="card-heading">{{ title }}</h3>
        <p>{{ description }}</p>
      </section>
      <footer class="card-footer">
        <span> <fa-icon [icon]="['fab', 'angular']"></fa-icon> Docs.</span>
        <span> <fa-icon [icon]="['fab', 'medium-m']"></fa-icon> Guide</span>
      </footer>
    </div>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string;
  @Input() description = '';
  @Input() icon: string;
  @Input() createdAt: string;
  @Input() iconWidth: string;
  @Input() isBussinessCard: boolean;
}

@NgModule({
  imports: [CommonModule, SharedModule, MatIconModule],
  declarations: [CardComponent],
  exports: [CardComponent]
})
export class CardModule {}
