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
              width: iconDimension.width + 'px'
            }"
          ></mat-icon>
        </div>
        <div class="article-link">
          <code>2018^</code>
        </div>
      </header>
      <section class="card-content">
        <h3>{{ title }}</h3>
      </section>
      <footer class="card-footer">
        <span>Angular</span>
      </footer>
    </div>
  `,
  styles: [
    `
      .card-container {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding: 2rem 1.75rem;
        z-index: 1;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        border-radius: 5px;
        box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%),
          0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
      }

      .card-header {
        display: grid;
        grid-template-columns: 1fr auto;
        margin-bottom: 2rem;
      }

      .card-container:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);
      }

      .card-footer {
        display: flex;
        flex-grow: 1;
        flex-wrap: wrap;
        align-items: flex-end;
        margin-top: 1rem;
      }
    `
  ]
})
export class CardComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() iconSize: string;
  @Input() iconDimension: { width: number; height: number };
  @Input() isBussinessCard: boolean;
}

@NgModule({
  imports: [CommonModule, SharedModule, MatIconModule],
  declarations: [CardComponent],
  exports: [CardComponent]
})
export class CardModule {}
