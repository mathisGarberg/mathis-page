import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  init() {
    this.matIconRegistry.addSvgIcon(
      'linkedin_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/svg/linkedin-icon.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'twitter_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/svg/twitter-icon.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'connect_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/svg/connect-icon.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'folder_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/svg/folder-icon.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'medium_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/svg/medium-icon.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'github_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/svg/github-icon.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'arrow_up_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/svg/arrow-up-icon.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'ice_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/svg/ice-icon.svg'
      )
    );
  }
}
