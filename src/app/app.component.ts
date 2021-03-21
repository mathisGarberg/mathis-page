import browser from 'browser-detect';
import {
  AfterViewInit,
  Component,
  Inject,
  Injectable,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { AnimationEvent } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { Event, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AppState, selectAuthState } from './core/core.state';
import { ActionAuthLogout } from './core/states/auth/auth.actions';
import { routeAnimations } from './core/animations/route.animations';
import { mediaContents } from './core/data/media-contents';
import { WebFlowPaths } from './core/enums/paths';
import {
  ActionSettingsChangeAnimationsPageDisabled,
  ActionSettingsChangeLanguage
} from './core/states/settings/settings.actions';
import {
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from './core/states/settings/settings.selectors';
import {
  fadeAnimation,
  slideInOutAnimation
} from './core/animations/animations';

@Injectable({
  providedIn: 'root'
})
export class AnimationCompleteCallbackService {
  animationCompleteCallback = new BehaviorSubject(null);
  public readonly animationCompleteCallbackValue = this.animationCompleteCallback.asObservable();
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations, fadeAnimation, slideInOutAnimation]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  static isBrowser = new Subject<boolean>();

  @ViewChild(CdkScrollable, { static: false }) scrollable: CdkScrollable;

  lastOffset = 0;
  isAutoScrollButtonVisible = false;
  isScrollingUpwards = true;

  title = 'mathis-page';
  currentYear = new Date().getFullYear();
  logo = '../assets/images/logo-resized.png';
  webFlowPaths = WebFlowPaths;
  navigation = [
    { link: WebFlowPaths.About, label: 'app.menu.about' },
    { link: WebFlowPaths.Projects, label: 'app.menu.projects' },
    { link: WebFlowPaths.Contact, label: 'app.menu.contact' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: WebFlowPaths.Settings, label: 'app.menu.settings' }
  ];
  languages = ['en', 'no'];
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
    private scroll: ScrollDispatcher,
    private animationCompleteCallbackService: AnimationCompleteCallbackService
  ) {}

  ngOnInit(): void {
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        ActionSettingsChangeAnimationsPageDisabled({
          isPageAnimationsDisabled: true
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

  onAnimationComplete(event: AnimationEvent) {
    if (event.toState === 'about') {
      this.animationCompleteCallbackService.animationCompleteCallback.next(
        event
      );
    }
  }

  onWindowScroll(data: CdkScrollable) {
    const scrollTop = data.getElementRef().nativeElement.scrollTop || 0;
    if (this.lastOffset > scrollTop) {
      this.isAutoScrollButtonVisible = false;
      this.isScrollingUpwards = true;
    } else if (scrollTop < 10) {
      this.isAutoScrollButtonVisible = true;
      this.isScrollingUpwards = true;
    } else if (scrollTop > 100) {
      this.isAutoScrollButtonVisible = true;
      this.isScrollingUpwards = false;
    } else {
      this.isAutoScrollButtonVisible = true;
      this.isScrollingUpwards = false;
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
