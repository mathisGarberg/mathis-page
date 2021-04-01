import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from 'src/shared/shared.module';
import { CoreModule } from './core/core.module';
import { CardButtonModule } from './scams/card-button/card-button.component';
import { CardModule } from './scams/card/card.component';
import { TerminalComponent } from './scams/terminal/terminal.component';
import { ScrollingComponent } from './scrolling/scrolling.component';
import { ConnectComponent } from './connect/connect.component';
import { CarouselModule } from './scams/material-carousel/carousel.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TerminalComponent,
    ScrollingComponent,
    ConnectComponent
  ],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,

    // shared and core
    SharedModule,
    CoreModule,

    // scams
    CardButtonModule,
    CardModule,
    CarouselModule,

    // material
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,

    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
