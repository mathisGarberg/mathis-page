import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faLinkedin,
  faStackOverflow,
  faInstagram,
  faYoutube,
  faUnsplash,
  faAngular,
} from '@fortawesome/free-brands-svg-icons';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
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
