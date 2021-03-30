import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CarouselComponent, CarouselItemDirective } from './carousel';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [CarouselComponent, CarouselItemDirective],
  declarations: [CarouselComponent, CarouselItemDirective]
})
export class CarouselModule {}
