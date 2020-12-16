import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Club } from '../club';

import { MessageService } from '../message.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'; 

import { Player } from '../player';
import { PlayerService } from '../player.service';
import { Team } from '../team';




@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnChanges {
  @Input() team: Team;


  club: Club;

  spelers: Player[];
  selectedPlayer: Player; // actual club that is sent;
  playerPlaceholder: Player; //placeholder when editing a club
  newPlayer: Player; // placeholder when creating a new club;

  isAddSpeler:boolean = false;
  closeResult = '';
  

  constructor(private playerService: PlayerService,
     private messageService: MessageService,
    private modalService:NgbModal
    ) { }

  ngOnInit(): void {
    this.getPlayers(this.team.team_ID); 
  }

  ngOnChanges():void{
    this.getPlayers(this.team.team_ID);
  }

  addPlayer(): void{
    this.newPlayer.club_ID = this.team.club_ID;
    this.newPlayer.team_ID = this.team.team_ID;
    
    this.playerService.addPlayer(this.newPlayer)
    .subscribe(player => {this.spelers.push(player);
    });
  }

  getPlayers(id: number): void{
    this.playerService.getPlayersByTeamID(id).subscribe(spelers => this.spelers = spelers);
  }

  selectPlayer(player:Player): void{
    this.playerPlaceholder = player;
  } 

  deletePlayer(player: Player):void{
    this.spelers = this.spelers.filter(p => p !== player);
    this.playerService.deletePlayer(player).subscribe();
  }

  updatePlayer(): void{
    this.playerService.updatePlayer(this.selectedPlayer).subscribe();    
  }

  private getDismissReason(reason: any): string { 
    this.isAddSpeler = false;
    
    if (reason === ModalDismissReasons.ESC) { 
      return 'by pressing ESC'; 
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
      return 'by clicking on a backdrop'; 
    } else { 
      return `with: ${reason}`; 
    } 
  }
  private showPopUpScreen(content){
    
    this.modalService.open(content, 
      {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => { 
         this.closeResult = `Closed with: ${result}`; 
       }, (reason) => { 
         this.closeResult =  
            `Dismissed ${this.getDismissReason(reason)}`; 
       });
  }

  addSpelerScreenActive(content, setActive:boolean):void{
    this.newPlayer = {} as Player;
    this.showPopUpScreen(content);
    this.isAddSpeler = setActive;
  }

}
