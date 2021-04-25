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
          <code>{{ createdAt }}^</code>
        </div>
      </header>
      <section class="card-content">
        <h3>{{ title }}</h3>
        <span>{{ description }}</span>
      </section>
      <footer class="card-footer">
        <span>Angular 12+</span>
        <span>NodeJS</span>
        <span>TypeScript</span>
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
