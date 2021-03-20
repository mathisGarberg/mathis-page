import browser from 'browser-detect';
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { isPlatformBrowser } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { Event, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AppState, selectAuthState } from './core/core.state';
import { WebFlowPaths } from './core/enums/paths';
import {
  ActionSettingsChangeAnimationsPageDisabled,
  ActionSettingsChangeLanguage,
} from './core/states/settings/settings.actions';
import {
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader,
} from './core/states/settings/settings.selectors';
import { ActionAuthLogout } from './core/states/auth/auth.actions';
import { mediaContents } from './core/data/media-contents';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  static isBrowser = new Subject<boolean>();

  @ViewChild(CdkScrollable, { static: false }) scrollable: CdkScrollable;

  lastOffset = 0;
  isScrollToTop = false;
  isScrollingUpwards = true;

  title = 'mathis-page';
  currentYear = new Date().getFullYear();
  logo = '../assets/images/logo-resized.png';
  webFlowPaths = WebFlowPaths;
  navigation = [
    { link: WebFlowPaths.About, label: 'app.menu.about' },
    { link: WebFlowPaths.Projects, label: 'app.menu.projects' },
    { link: WebFlowPaths.Contact, label: 'app.menu.contact' },
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: WebFlowPaths.Settings, label: 'app.menu.settings' },
  ];
  mediaContents = mediaContents;

  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  isAuthenticated$: Observable<boolean>;

  scrollingSubscription$ = new Subscription();
  routerSubscription$ = new Subscription();

  static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private router: Router,
    private store: Store<AppState>,
    private scroll: ScrollDispatcher
  ) {}

  ngOnInit(): void {
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        ActionSettingsChangeAnimationsPageDisabled({
          isPageAnimationsDisabled: true,
        })
      );
    }

    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));

    this.isAuthenticated$ = this.store
      .select(selectAuthState)
      .pipe(map(({ isAuthenticated }) => isAuthenticated));
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.routerSubscription$ = this.router.events.subscribe(
        (event: Event) => {
          this.navigationInterceptor(event);
        }
      );

      this.scrollingSubscription$ = this.scroll
        .scrolled()
        .subscribe((data: CdkScrollable) => {
          this.onWindowScroll(data);
        });
    }
  }

  onScrollToTop() {
    this.scrollable
      .getElementRef()
      .nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(ActionSettingsChangeLanguage({ language }));
  }

  onLogoutClick() {
    this.store.dispatch(ActionAuthLogout());
  }

  onWindowScroll(data: CdkScrollable) {
    console.log('Called!!!');

    const scrollTop = data.getElementRef().nativeElement.scrollTop || 0;
    if (this.lastOffset > scrollTop) {
      this.isScrollToTop = false;
      this.isScrollingUpwards = true;
    } else if (scrollTop < 10) {
      this.isScrollToTop = true;
      this.isScrollingUpwards = true;
    } else if (scrollTop > 100) {
      this.isScrollToTop = true;
      this.isScrollingUpwards = false;
    } else {
      this.isScrollingUpwards = false;
      this.isScrollToTop = true;
    }

    this.lastOffset = scrollTop;
  }

  private navigationInterceptor(event: Event): void {
    this.scrollable.getElementRef().nativeElement.scrollTo({ top: 0 });
  }

  ngOnDestroy() {
    this.scrollingSubscription$.unsubscribe();
    this.routerSubscription$.unsubscribe();
  }
}
