import { Component } from '@angular/core';
import { WebFlowPaths } from 'src/core/enums/paths';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mathis-page';
  currentYear = new Date().getFullYear();
  logo = '../assets/images/logo-resized.png';
  navigation = [
    { link: WebFlowPaths.About, label: 'app.menu.about' },
    { link: WebFlowPaths.Projects, label: 'app.menu.projects' },
    { link: WebFlowPaths.Contact, label: 'app.menu.contact' },
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: WebFlowPaths.Settings, label: 'app.menu.settings' },
  ];
  mediaContents = [
    {
      link: 'https://www.linkedin.com/in/mathis-garberg-451672144/',
      name: 'LinkedIn',
      icon: 'linkedin',
    },
    {
      link: 'https://www.github.com/mathisGarberg',
      name: 'Github',
      icon: 'github',
    },
    {
      link: 'https://www.medium.com/@mathis.garberg',
      name: 'Medium',
      icon: 'medium-m',
    },
    {
      link: 'https://stackoverflow.com/users/4228322/mathis-garberg',
      name: 'Stack Overflow',
      icon: 'stack-overflow',
    },
    {
      link: 'https://unsplash.com/@pi_mathis',
      name: 'Unsplash',
      icon: 'unsplash',
    },
  ];
}
