import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-card',
  template: `
    <div class="card-container">
      <header class="card-header">
        <div class="folder-icon">
          <mat-icon
            [svgIcon]="icon"
            [ngClass]="{
              'medium-size': iconSize === 'medium',
              'large-size': iconSize === 'large'
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
        box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.35);
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding: 2rem 1.75rem;
        z-index: 1;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        border-radius: 5px;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
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

      .medium-size {
        width: 40px;
        height: 40px;
      }
      .large-size {
        width: 60px;
        height: 60px;
      }
    `
  ]
})
export class CardComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() iconSize: string;
}

@NgModule({
  imports: [CommonModule, SharedModule, MatIconModule],
  declarations: [CardComponent],
  exports: [CardComponent]
})
export class CardModule {}
