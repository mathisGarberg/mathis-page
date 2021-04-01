import { Component } from '@angular/core';

import { experiences } from '@core/data/experience';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@core/animations/route.animations';
import { WebFlowPaths } from '@core/enums/paths';
import { articles } from '@core/data/articles';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  webFlowPaths = WebFlowPaths;
  articles = articles;
  experiences = experiences;
  avatar =
    'https://res.cloudinary.com/practicaldev/image/fetch/s--qEBhOASw--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/205987/7779d2ed-fb9f-4fca-a5d2-84df4345abb5.jpg';
  items = [{ title: 'Slide 1' }, { title: 'Slide 2' }, { title: 'Slide 3' }];
}
