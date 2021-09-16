import { WebFlowPaths } from './../core/enums/paths';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() language: string;
  @Input() navigation: { link: string; label: string }[];
  @Input() isAuthenticated: boolean;

  @Output() openSidenav = new EventEmitter();

  logo = '../../assets/icons/logo/logo-resized.png';
  webFlowPaths = WebFlowPaths;
  languages = ['en', 'no'];

  onLogoutClick() {}

  onLanguageSelect(language: MatSelectChange) {}
}
