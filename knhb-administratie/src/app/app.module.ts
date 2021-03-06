import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClubsComponent } from './clubs/clubs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamsComponent } from './teams/teams.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';



@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerDetailComponent,
    MessagesComponent,
    DashboardComponent,
    ClubsComponent,
    TeamsComponent,
    ClubDetailComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
