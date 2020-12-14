import { Component, OnInit } from '@angular/core';

import { Club } from '../club';

import {ActivatedRoute } from '@angular/router';
import {Location } from '@angular/common';
import {ClubsService} from '../clubs.service';

import {Team} from '../team';
import {TeamsService} from '../teams.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'; 


@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {

  club: Club;
  teams : Team[];
  selectedTeam: Team;
  teamPlaceholder: Team;
  newTeam: Team;

  isModifyTeam:boolean = false;
  isAddTeam:boolean = false;
  closeResult = '';
  

  constructor(private route: ActivatedRoute,
    private clubService: ClubsService,
    private teamService: TeamsService,
    private location: Location,
    private modalService:NgbModal
    ) {}

    ngOnInit(): void {

    this.getClub();
  
  }

  getClub():void{

    const id = +this.route.snapshot.paramMap.get('club_ID');
    this.clubService.getClub(id).subscribe(club => { this.club = club; this.getTeams(this.club.club_ID)});
    
  }

  getTeams(id: number):void{
    
    this.teamService.getTeamsByClubID(id)
    .subscribe(teams => this.teams = teams);
    
  }

  selectTeam(team: Team):void{
    this.teamPlaceholder = team;
    this.selectedTeam = team;
  }

  updateTeam():void{
    this.selectedTeam = this.teamPlaceholder;
   
    this.teamService.updateTeam(this.selectedTeam);
  }

  deleteTeam(team:Team):void{
    this.teams = this.teams.filter(t => t !== team);
    this.teamService.deleteTeam(team).subscribe();
  }

  addTeam():void{
    this.newTeam.club_ID = this.club.club_ID;
    this.teamService.addTeam(this.newTeam)
    .subscribe(team => {this.teams.push(team);
    });
  }

  private getDismissReason(reason: any): string { 
    this.isModifyTeam = false;
    this.isAddTeam = false;
    
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

  showModifyScreen(content, setActive:boolean):void{
    this.showPopUpScreen(content);
    this.isModifyTeam = setActive;
    this.isAddTeam = false;
    
  }

  showAddTeamScreen(content, setActive:boolean):void{
  
    this.newTeam = {} as Team;
    this.showPopUpScreen(content);
    this.isAddTeam = setActive;
    this.isModifyTeam = false;
    
  }

}
