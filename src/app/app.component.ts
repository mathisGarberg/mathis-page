import { Component } from '@angular/core';
import { WebFlowPaths } from 'src/core/enums/paths';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mathis-page';
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
}
