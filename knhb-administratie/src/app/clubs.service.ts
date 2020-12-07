import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Club } from './club';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  private serverURL="http://localhost:8080/"; // url to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService
    ) { }


    private log(message: string){
      this.messageService.add(`ClubsService: ${message}`);
    }

  getClubs(): Observable<Club[]>{
    this.messageService.add('ClubService: Fetched clubs');
  
    return this.http.get<Club[]>(this.serverURL+`clubs/all`)
    .pipe(catchError(this.handleError<Club[]>(`getClubs`, [])));
  }

  addClub(club: Club):Observable<Club>{
    this.messageService.add('ClubService: Add club pressed');
    return this.http.post<Club>(this.serverURL+`clubs/add`,club, this.httpOptions)
      .pipe(tap((newClub: Club) => this.log(`added club w/ id=${newClub.club_ID}`)),
      catchError(this.handleError<Club>(`addClub`)));
  }

  deleteClub(club: Club | number):Observable<Club>{
      const id = typeof club === 'number' ? club : club.club_ID;
      const url = this.serverURL+`clubs/deleteByID${id}`;

      return this.http.delete<Club>(url,this.httpOptions).pipe(
        tap(_ => this.log(`Deleted Club id=${id}`)),
      catchError(this.handleError<Club>('deleteClub')));
  }

  updateClub(club:Club):Observable<Club>{
    const url = this.serverURL+`clubs/update${club.club_ID}`;
    return this.http.put(url, club, this.httpOptions).pipe(
      tap(_ => this.log(`updated club id=${club.club_ID}`)),
      catchError(this.handleError<any>('updateClub'))
    );

  }
  
  testMethod():void{
    this.messageService.add('ClubService: Add club pressed');
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
