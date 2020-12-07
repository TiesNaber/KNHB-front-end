import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'; 

import { Team } from '../team';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[];
  selectedTeam: Team; // actual club that is sent;
  teamPlaceholder: Team; //placeholder when editing a club
  newTeam: Team; // placeholder when creating a new club;

  constructor(private teamService: TeamsService, private messageService: MessageService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getTeams();
  }

  addTeam(): void{     
    this.teamService.addTeam(this.newTeam)
    .subscribe(team => {this.teams.push(team);
    });
  }

  getTeams(): void{
    this.teamService.getTeams()
     .subscribe(teams => this.teams = this.teams);
  }

  selectTeam(team:Team): void{
    this.teamPlaceholder = team;
    this.messageService.add("Teams: Selected team ==" + this.teamPlaceholder.teamNaam);
  } 

  deleteTeam(team: Team):void{
    this.teams = this.teams.filter(c => c !== team);
    this.teamService.deleteTeam(team).subscribe();
  }

  updateTeam(): void{
    this.selectedTeam = this.teamPlaceholder;
    this.teamService.updateTeam(this.selectedTeam).subscribe();    
  }

}
