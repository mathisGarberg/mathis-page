import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WebFlowPaths } from '../core/enums/paths';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isScrollingUpwards: boolean;
  @Input() navigation: any;
  @Input() stickyHeader: boolean;
  @Input() isAuthenticated: boolean;
  @Input() language: any;

  @Output() openSidenav = new EventEmitter();
  @Output() selectLanguage = new EventEmitter();
  @Output() logoutClick = new EventEmitter();

  logo = '../../assets/images/logo-resized.png';
  languages = ['en', 'no'];
  webFlowPaths = WebFlowPaths;
}
