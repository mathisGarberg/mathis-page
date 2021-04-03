import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faCog,
  faBan,
  faFolder,
  faExternalLinkAlt,
  faLanguage,
  faPaintBrush,
  faCloud,
  faLightbulb,
  faWindowMaximize,
  faStream
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faLinkedin,
  faStackOverflow,
  faInstagram,
  faYoutube,
  faUnsplash,
  faAngular
} from '@fortawesome/free-brands-svg-icons';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule]
})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faBars,
      faCog,
      faBan,
      faFolder,
      faExternalLinkAlt,
      faLanguage,
      faPaintBrush,
      faCloud,
      faLightbulb,
      faWindowMaximize,
      faStream,

      faGithub,
      faMediumM,
      faTwitter,
      faLinkedin,
      faStackOverflow,
      faInstagram,
      faYoutube,
      faUnsplash,
      faAngular
    );
  }
}
