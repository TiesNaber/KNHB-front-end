import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { Player } from './player';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private serverURL = "http://localhost:8080/" // url to web API
  private getPlayerURL = "spelers/all";
  private getPlayerByID = "spelers/getByID";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

  constructor(private http: HttpClient, private messageService: MessageService) { }

    private log(message: string){
      this.messageService.add(`PlayerService: ${message}`);
    }

  addPlayer(player: Player): Observable<Player>{
      
    return this.http.post<Player>(this.serverURL+`spelers/addSpeler`,player, this.httpOptions)
      .pipe(tap((newPlayer: Player) => this.log(`added hero w/ id=${newPlayer.id}`)),
      catchError(this.handleError<Player>(`addPlayer`))
    );
  }

  updatePlayer(player:Player):Observable<Player>{
    const url = this.serverURL+`players/update${player.id}`;
    return this.http.put(url, player, this.httpOptions).pipe(
      tap(_ => this.log(`updated player id=${player.id}`)),
      catchError(this.handleError<any>('updatePlayer'))
    );

  }

  deletePlayer(player: Player | number):Observable<Player>{
    const id = typeof player === 'number' ? player : player.id;
    const url = this.serverURL+`clubs/deleteByID${id}`;

    return this.http.delete<Player>(url,this.httpOptions).pipe(
      tap(_ => this.log(`Deleted Club id=${id}`)),
    catchError(this.handleError<Player>('deleteClub')));
}

  getPlayer(id: number): Observable<Player>{

   const url =  `${this.serverURL + this.getPlayerByID}${id}`;
   return this.http.get<Player>(url).pipe(
     tap(_ => this.log(`Fetched player id =${id}`)),
     catchError(this.handleError<Player>(`getPlayer id =${id}`))
   );
  }

  getPlayersByTeamID(id: number): Observable<Player[]>{

    const url =  `${this.serverURL + `spelers/byTeamID`}${id}`;
    return this.http.get<Player[]>(url).pipe(
      tap(_ => this.log(`Fetched player id =${id}`)),
      catchError(this.handleError<Player[]>(`getPlayer id =${id}`))
    );
   }

   getPlayersByClubID(id: number): Observable<Player[]>{

    const url =  `${this.serverURL + `spelers/byClubID`}${id}`;
    return this.http.get<Player[]>(url).pipe(
      tap(_ => this.log(`Fetched player id =${id}`)),
      catchError(this.handleError<Player[]>(`getPlayer id =${id}`))
    );
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