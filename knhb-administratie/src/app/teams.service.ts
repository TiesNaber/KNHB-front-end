import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private serverURL="http://localhost:8080/"; // url to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService
    ) { }

    private log(message: string){
      this.messageService.add(`TeamService: ${message}`);
    }

  getTeams(): Observable<Team[]>{
    this.messageService.add('TeamService: Fetched clubs');
  
    return this.http.get<Team[]>(this.serverURL+`teams/all`)
    .pipe(catchError(this.handleError<Team[]>(`getTeams`, [])));
  }

  getTeamsByClubID(number): Observable<Team[]>{
    this.messageService.add('TeamService: Fetched clubs');

    return this.http.get<Team[]>(this.serverURL+`teams/byClubID${number}`)
    .pipe(catchError(this.handleError<Team[]>(`getTeams`, [])));
  }


  addTeam(team: Team):Observable<Team>{
    this.messageService.add('TeamService: Add team pressed');
    return this.http.post<Team>(this.serverURL+`teams/add`,team, this.httpOptions)
      .pipe(tap((newTeam: Team) => this.log(`added team w/ id=${newTeam.team_ID}`)),
      catchError(this.handleError<Team>(`addTeam`)));
  }

  deleteTeam(team: Team | number):Observable<Team>{
      const id = typeof team === 'number' ? team : team.team_ID;
      const url = this.serverURL+`teams/deleteByID${id}`;

      return this.http.delete<Team>(url,this.httpOptions).pipe(
        tap(_ => this.log(`Deleted Team id=${id}`)),
      catchError(this.handleError<Team>('deleteTeam')));
  }

  updateTeam(team:Team):Observable<Team>{
    const url = this.serverURL+`teams/update${team.team_ID}`;
    return this.http.put(url, team, this.httpOptions).pipe(
      tap(_ => this.log(`updated team id=${team.team_ID}`)),
      catchError(this.handleError<any>('updateTeams'))
    );

  }
  
  testMethod():void{
    this.messageService.add('Team Service: Add team pressed');
  }
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
