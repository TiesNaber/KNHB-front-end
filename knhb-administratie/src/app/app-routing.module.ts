import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ClubsComponent } from './clubs/clubs.component';
import {ClubDetailComponent} from './club-detail/club-detail.component';
import {TeamsComponent} from './teams/teams.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: DashboardComponent},  
  {path: 'clubs', component: ClubsComponent},
  {path: 'clubs/:club_ID', component: ClubDetailComponent},
  {path: 'teams/:team_ID', component: TeamsComponent}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
