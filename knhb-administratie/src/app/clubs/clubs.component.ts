import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'; 

import { ClubsService } from '../clubs.service';
import {Club} from '../club';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

  clubs: Club[];
  selectedClub: Club; // actual club that is sent;
  clubPlaceholder: Club; //placeholder when editing a club
  newClub: Club; // placeholder when creating a new club;
  
  addClubScreenActive:boolean = false;
  modifyScreenActive:boolean = false;

  closeResult = '';


  constructor(private clubService: ClubsService, private messageService: MessageService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getClubs();
  }

  addClub(): void{     
    this.clubService.addClub(this.newClub)
    .subscribe(club => {this.clubs.push(club);
    });
  }

  getClubs(): void{
    this.clubService.getClubs()
     .subscribe(clubs => this.clubs = clubs);
  }

  selectClub(club:Club): void{
    this.clubPlaceholder = club;
    this.messageService.add("Clubs: Selected club ==" + this.clubPlaceholder.naam);
  } 

  deleteClub(club: Club):void{
    this.clubs = this.clubs.filter(c => c !== club);
    this.clubService.deleteClub(club).subscribe();
  }

  updateClub(): void{
    this.selectedClub = this.clubPlaceholder;
    this.clubService.updateClub(this.selectedClub).subscribe();    
  }
  
  private getDismissReason(reason: any): string { 
    this.modifyScreenActive = false;
    this.addClubScreenActive = false;
    
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
    this.modifyScreenActive = setActive;
    this.addClubScreenActive = false;
    this.messageService.add("Clubs: modifyScreen ==" + this.modifyScreenActive);
  }

  showAddClubScreen(content, setActive:boolean):void{
    this.newClub = {} as Club 
    this.showPopUpScreen(content);
    this.addClubScreenActive = setActive;
    this.modifyScreenActive = false;
    
    this.messageService.add("Clubs: addScreen ==" + this.addClubScreenActive);
  }

  openClubPage(club: Club): void{
    
  }

}
