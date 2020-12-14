import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import {ActivatedRoute } from '@angular/router';
import {Location } from '@angular/common';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'; 

import { Team } from '../team';
import { TeamsService } from '../teams.service';
import { Player } from '../player';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  team : Team;

  players: Player[];
  selectedPlayer: Player; // actual club that is sent;
  playerPlaceholder: Player; //placeholder when editing a club
  newPlayer: Player; // placeholder when creating a new club;

  constructor(private teamService: TeamsService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getTeam();
  }
 
  getTeam():void{
    const id = +this.route.snapshot.paramMap.get('club_ID');
    this.teamService.getTeam(id).subscribe(team => { this.team = team;});
  }



  

}
