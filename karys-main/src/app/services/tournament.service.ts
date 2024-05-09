import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap   } from 'rxjs';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  
  private api_url = 'https://americas.api.riotgames.com/lol/tournament-stub/v5/codes';
  historiqueTournois: any[] = [];

  constructor(private http: HttpClient, private firestore: Firestore) {}

  createTournament(tournamentId: number, count: number, tournamentParameters: any): Observable<any> {
    const urlWithParams = `${this.api_url}?count=${count}&tournamentId=${tournamentId}&api_key=RGAPI-00388229-ca4b-4269-ab3a-33308912bc32`;
    return this.http.post(urlWithParams, tournamentParameters).pipe(
      tap((data: any) => {
        // Ajouter les données du tournoi créé à l'historique
        const nouveauTournoi = { tournamentId, count, tournamentParameters };
        this.historiqueTournois.push(nouveauTournoi);
        
        // Enregistrer les codes du tournoi dans Firestore
        this.saveTournamentCodes(data);
      })
    );
  }

  saveTournamentCodes(codes: string[]): void {
    const accollection = collection(this.firestore, 'codes-tournoi');
    codes.forEach(code => {
      addDoc(accollection, { code })
        .then(() => console.log('Code de tournoi enregistré avec succès dans Firestore'))
        .catch(error => console.error('Erreur lors de l\'enregistrement du code de tournoi dans Firestore : ', error));
    });
  }

  addTournamentToHistory(newTournament: any): void {
    this.historiqueTournois.push(newTournament);
  }

  getPlayerInfo() {
    const urlWithParams = `${this.api_url}/STUB04d67-49f5c8eb-d652-4c5c-9520-58abb0c7013a?api_key=RGAPI-00388229-ca4b-4269-ab3a-33308912bc32`;
    return this.http.get(urlWithParams);
  }

  getTournamentInfo(tournamentIndex: number): any {
    return this.historiqueTournois[tournamentIndex];
  }

  getTournamentDetails(tournamentCode: string): Observable<any> {
    const url = `${this.api_url}/?tournamentCode=${tournamentCode}`;
    return this.http.get(url);
  }
}
