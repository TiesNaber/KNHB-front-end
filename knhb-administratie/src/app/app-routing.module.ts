import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ClubsComponent } from './clubs/clubs.component';
import {ClubDetailComponent} from './club-detail/club-detail.component';
import {TeamsComponent} from './teams/teams.component';

const routes: Routes = [
  {path: '', redirectTo: '/clubs', pathMatch: 'full' },  
  {path: 'clubs', component: ClubsComponent},
  {path: 'clubs/:club_ID', component: ClubDetailComponent},
  {path: 'teams/:team_ID', component: TeamsComponent}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
