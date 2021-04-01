import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ConnectComponent } from './connect/connect.component';
import { ContactComponent } from './contact/contact.component';

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

import { SharedModule } from 'src/shared/shared.module';
import { CoreModule } from './core/core.module';

import { TerminalComponent } from './scams/terminal/terminal.component';
import { ScrollingComponent } from './scrolling/scrolling.component';
import { CardButtonModule } from './scams/card-button/card-button.component';
import { CarouselModule } from './scams/material-carousel/carousel.module';
import { CardModule } from './scams/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TerminalComponent,
    ScrollingComponent,
    ConnectComponent,
    ContactComponent
  ],
  imports: [
    // angular
    BrowserModule,
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
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,

    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
