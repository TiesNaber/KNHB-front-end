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
  team: Team;
  newSpeler: Player;

  constructor(private playerService: PlayerService, private messageService: MessageService) { }

  ngOnInit(): void {
   
  }
}
