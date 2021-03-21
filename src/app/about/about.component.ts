import { Component } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../core/animations/route.animations';
import { WebFlowPaths } from '../core/enums/paths';
import { articles } from '../core/data/articles';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  webFlowPaths = WebFlowPaths;
  articles = articles;
  avatar = 'https://miro.medium.com/fit/c/262/262/1*pzkOXDV0FY3QkIROkVnwkA.png';
}
