import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../interface/pokemon';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseurl = '/lol/tournament/v5/';

  constructor(private http: HttpClient) {}

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.baseurl + 'games/by-code/' + id);
  }
}
