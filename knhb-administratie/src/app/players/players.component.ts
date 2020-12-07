import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';

import { Player } from '../player';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[];

  constructor(private playerService: PlayerService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  add(naam: string, geboorteDatum: string, adres: string, postcode: string, plaats: string, email: string, speelgerechtigd: boolean): void{
    naam = naam.trim();
    geboorteDatum = geboorteDatum.trim();
    adres = adres.trim();
    postcode = postcode.trim();
    plaats = plaats.trim();
    email = geboorteDatum.trim();


    if(!naam) return;
    if(!geboorteDatum) return;
    if(!adres) return;
    if(!postcode) return;
    if(!plaats) return;
    if(!email) return;
    if(speelgerechtigd == null) return;

    this.playerService.addPlayer({naam,geboorteDatum, adres, postcode, plaats, email, speelgerechtigd} as Player)
    .subscribe(player => {this.players.push(player);
    });
  }


  getPlayers(): void{
    this.playerService.getPlayers()
     .subscribe(players => this.players = players);
  }

}
