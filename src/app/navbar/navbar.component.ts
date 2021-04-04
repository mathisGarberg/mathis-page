import { WebFlowPaths } from './../core/enums/paths';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() language: string;
  @Input() navigation: string[];
  @Input() isAuthenticated: boolean;

  @Output() openSidenav = new EventEmitter();

  logo = '../../assets/icons/logo/logo-resized.png';
  webFlowPaths = WebFlowPaths;
  languages = ['en', 'no'];
}
