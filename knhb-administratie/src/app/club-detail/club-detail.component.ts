import { Component, OnInit } from '@angular/core';

import { Club } from '../club';

import {ActivatedRoute } from '@angular/router';
import {Location } from '@angular/common';
import {ClubsService} from '../clubs.service';

import {Team} from '../team';
import {TeamsService} from '../teams.service';


@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {

  club: Club;
  teams : Team[];

  constructor(private route: ActivatedRoute,
    private clubService: ClubsService,
    private teamService: TeamsService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getClub();
  }

  getClub():void{

    const id = +this.route.snapshot.paramMap.get('club_ID');
    this.clubService.getClub(id).subscribe(club => this.club = club);

  }

  getTeams(number):void{
    this.teamService.getTeamsByClubID(number)
    .subscribe(teams => this.teams = teams);
    
  }

}
