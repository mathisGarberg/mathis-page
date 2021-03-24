import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  NgModule,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  style
} from '@angular/animations';

import { CarouselItemDirective } from './carousel-item.directive';
import { MatButtonModule } from '@angular/material/button';

@Directive({ selector: '.carousel-item' })
export class CarouselItemElementDirective {}

@Component({
  selector: 'app-carousel',
  exportAs: 'carousel',
  template: `
    <section class="carousel-wrapper" [ngStyle]="carouselWrapperStyle">
      <ul class="carousel-inner" #carousel>
        <li *ngFor="let item of items" class="carousel-item">
          <ng-container [ngTemplateOutlet]="item.tpl"></ng-container>
        </li>
      </ul>
    </section>
    <div *ngIf="showControls" class="carousel-actions">
      <button
        mat-raised-button
        color="primary"
        (click)="prevSlide()"
        [disabled]="currentSlide === 0"
        class="btn btn-default"
      >
        Previous
      </button>
      <button
        mat-raised-button
        color="primary"
        (click)="nextSlide()"
        [disabled]="currentSlide + 1 === items.length"
        class="btn btn-default"
      >
        Next
      </button>
    </div>
  `,
  styles: [
    `
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 6000px;
      }

      .carousel-wrapper {
        overflow: hidden;
      }

      .carousel-inner {
        display: flex;
      }
    `
  ]
})
export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselItemDirective)
  items: QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElementDirective, { read: ElementRef })
  private itemsElements: QueryList<ElementRef>;
  @ViewChild('carousel') private carousel: ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;
  carouselWrapperStyle = {};

  nextSlide() {
    if (this.currentSlide + 1 === this.items.length) return;
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  private buildAnimation(offset) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }

  prevSlide() {
    if (this.currentSlide === 0) return;

    this.currentSlide =
      (this.currentSlide - 1 + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  constructor(private builder: AnimationBuilder) {}

  ngAfterViewInit() {
    // For some reason only here I need to add setTimeout, in my local env it's working without this.
    setTimeout(() => {
      this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`
      };
    });
  }
}

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemElementDirective
  ],
  exports: [
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemElementDirective
  ]
})
export class CarouselModule {}
