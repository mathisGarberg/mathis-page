import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
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
