import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import {ActivatedRoute } from '@angular/router';
import {Location } from '@angular/common';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'; 

import { Team } from '../team';
import { TeamsService } from '../teams.service';
import { Player } from '../player';
import { PlayerService } from '../player.service';

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
    private playerService: PlayerService,
    private location: Location,
    private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getTeam();
  }
 
  getTeam():void{
    const id = +this.route.snapshot.paramMap.get('club_ID');
    this.teamService.getTeam(id).subscribe(team => { this.team = team; this.getPlayers(this.team.team_ID)});
  }

  addPlayer(): void{
    this.newPlayer.club_ID = this.team.club_ID;
    this.newPlayer.team_ID = this.team.team_ID;
    
    this.playerService.addPlayer(this.newPlayer)
    .subscribe(player => {this.players.push(player);
    });
  }

  getPlayers(id: number): void{
    this.playerService.getPlayersByTeamID(id).subscribe(spelers => this.players = spelers);
  }

  selectPlayer(player:Player): void{
    this.playerPlaceholder = player;
  } 

  deletePlayer(player: Player):void{
    this.players = this.players.filter(p => p !== player);
    this.playerService.deletePlayer(player).subscribe();
  }

  updatePlayer(): void{
    this.playerService.updatePlayer(this.selectedPlayer).subscribe();    
  }

  

}
