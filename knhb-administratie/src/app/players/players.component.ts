import { Component, OnInit } from '@angular/core';
import { Club } from '../club';

import { MessageService } from '../message.service';

import { Player } from '../player';
import { PlayerService } from '../player.service';
import { Team } from '../team';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  club: Club;

  players: Player[];
  selectedPlayer: Player; // actual club that is sent;
  playerPlaceholder: Player; //placeholder when editing a club
  newPlayer: Player; // placeholder when creating a new club;
  

  constructor(private playerService: PlayerService, private messageService: MessageService) { }

  ngOnInit(): void {
   
  }

  addPlayer(team: Team): void{
    this.newPlayer.club_ID = team.club_ID;
    this.newPlayer.team_ID = team.team_ID;
    
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
