import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import {ClubsComponent } from './clubs/clubs.component';

const routes: Routes = [
  {path: '', redirectTo: '/clubs', pathMatch: 'full' },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'detail/:id', component: PlayerDetailComponent },
  {path: 'players', component: PlayersComponent },
  {path: 'clubs', component: ClubsComponent}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
