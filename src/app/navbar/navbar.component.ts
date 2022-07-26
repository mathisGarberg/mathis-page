import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { WebFlowPaths } from './../core/enums/paths';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActionSettingsChangeLanguage } from '@core/states/settings/settings.actions';
import { ViewportScroller } from '@angular/common';

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

  constructor(
    private store: Store,
    private scroller: ViewportScroller,
    private router: Router
  ) {}

  onLanguageSelect({ value: language }: MatSelectChange) {
    this.store.dispatch(ActionSettingsChangeLanguage({ language }));
  }
}
