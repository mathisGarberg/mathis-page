import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-card',
  template: `
    <div class="card-container">
      <header class="card-header">
        <div class="folder-icon">
          <fa-icon [icon]="['fab', 'medium-m']"></fa-icon>
        </div>
        <div class="article-link">Link</div>
      </header>
      <section class="card-content">
        <h3>Mathis</h3>
        <div class="description">Lorem ipsum dolor sit amet</div>
      </section>
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
    `
  ]
})
export class CardComponent {
  constructor() {}
}

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CardComponent],
  exports: [CardComponent]
})
export class CardModule {}
