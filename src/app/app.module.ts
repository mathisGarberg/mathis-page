import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ConnectComponent } from './connect/connect.component';
import { ScrollingComponent } from './scrolling/scrolling.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { CardButtonModule } from './scams/card-button/card-button.component';
import { CardModule } from './scams/card/card.component';

import { CarouselModule } from './scams/carousel/carousel.module';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ScrollingComponent,
    ConnectComponent,
    NavbarComponent,
    ContactComponent
  ],
  imports: [
    // angular
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,

    ReactiveFormsModule,

    // shared and core
    SharedModule,
    CoreModule,

    // scams
    CardButtonModule,
    CardModule,
    CarouselModule,

    // material
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatSlideToggleModule,

    FlexLayoutModule,

    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
