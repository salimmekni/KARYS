import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit{
  playerName: string = '';
  player: any = null;
  matches: any[] = [];
  playerExists: boolean | undefined = undefined;
  private apiKey: string = 'RGAPI-4440b0c2-dfaa-40f1-abe8-19006ee27420';
  private apiUrl: string = 'https://euw1.api.riotgames.com/lol/';
  
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getPlayerInfo() {
    if (!this.playerName) {
      return; // Si le champ de recherche est vide, ne faites rien
    }

    this.playerExists = undefined; // Réinitialisez à chaque nouvelle recherche

    this.http.get<any>(`${this.apiUrl}summoner/v4/summoners/by-name/${this.playerName}?api_key=${this.apiKey}`).subscribe({
      next: (response) => {
        this.player = response;
        this.playerExists = true;
        this.getMatchHistory(response.puuid); // Assurez-vous que ceci est appelé avec le bon identifiant
      },
      error: (error) => {
        this.playerExists = false;
      }
    });
  }

  getMatchHistory(puuid: string) {
    this.http.get<any[]>(`${this.apiUrl}match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${this.apiKey}`).subscribe({
      next: (response) => {
        this.matches = response;
      },
      error: (error) => {
        console.error('Error fetching match history', error);
      }
    });
  }
}
