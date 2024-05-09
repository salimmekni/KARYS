import { Component, ViewChild } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { TournamentService } from '../../services/tournament.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent {

  @ViewChild("createTournamentForm") tournamentform!: NgForm;

  TournamentCodeParametersV5: any = {
    "enoughPlayers": true,
    "mapType": "",
    "pickType": "",
    "spectatorType": "",
    "teamSize": 0
  };

  count: number = 2; // Modifiez cette valeur si nécessaire
  tournamentId: number = 0;
  tournamentCodes: string[] = []; // Tableau pour stocker les codes du tournoi
  showTournamentCode: boolean = false;

  constructor(private tournamentService: TournamentService, private firestore: Firestore) {}

 createTournament(): void {
  if (this.validateForm()) {
    // Mettre à jour les paramètres du tournoi en fonction des sélections de l'utilisateur
    const tournamentParameters = {
      enoughPlayers: this.TournamentCodeParametersV5.enoughPlayers,
      mapType: this.TournamentCodeParametersV5.mapType,
      pickType: this.TournamentCodeParametersV5.pickType,
      spectatorType: this.TournamentCodeParametersV5.spectatorType,
      teamSize: this.TournamentCodeParametersV5.teamSize,
    };

    this.tournamentService.createTournament(this.tournamentId, this.count, tournamentParameters)
      .subscribe((data: any) => {
        // Mettre à jour les codes du tournoi
        this.tournamentCodes = data;
        this.showTournamentCode = true;

        // Ajouter le nouveau tournoi à l'historique
        const nouveauTournoi = { tournamentId: this.tournamentId, count: this.count, tournamentParameters };
        this.tournamentService.addTournamentToHistory(nouveauTournoi);

        // Enregistrer les données dans Firestore
        this.saveData(); // Passer les données à la méthode saveData()

      }, (error: any) => {
        console.error('Erreur lors de la création du tournoi : ', error);
      });
  }
}

  
  

  validateForm(): boolean {
    // Vérifiez ici si tous les champs requis sont remplis
    // Vous pouvez personnaliser cette fonction selon vos besoins
    return this.tournamentId !== 0;
  }

  closeCard(): void {
    this.showTournamentCode = false;
  }

  saveData(): void {
    // Concaténer tous les codes en une seule chaîne séparée par des virgules
    const concatenatedCodes = this.tournamentCodes.join(', ');
    
    // Enregistrer la chaîne de codes dans Firestore
    const accollection = collection(this.firestore, 'tournois');
    addDoc(accollection, { 
      'tournamentId' : this.tournamentform.value.tournamentId,
      'count': this.tournamentform.value.count,
      'spectatorType': this.tournamentform.value.spectatorType,
      'pickType': this.tournamentform.value.pickType,
      'MapType': this.tournamentform.value.mapType,
      'teamSize': this.tournamentform.value.teamSize,
      'enoughPlayers': this.tournamentform.value.enoughPlayers,
      'codes': concatenatedCodes // Champ contenant tous les codes concaténés
    })
    .then(() => console.log('Codes de tournoi enregistrés avec succès dans Firestore'))
    .catch(error => console.error('Erreur lors de l\'enregistrement des codes de tournoi dans Firestore : ', error));
  }
  

  resetForm(): void {
    this.tournamentform.reset({
      'tournamentId' : 0,
      'count': 0,
      'spectatorType': '',
      'pickType': '',
      'MapType': '',
      'teamSize': 0,
      'enoughPlayers': false
    });
  }

  submitForm(): void {
    if (this.validateForm()) { // Valider le formulaire avant de le soumettre
      this.createTournament(); // Créer le tournoi
      this.saveData(); // Enregistrer les données
     
    } else {
      // Afficher un message d'erreur ou gérer le cas où le formulaire n'est pas valide
      console.error('Le formulaire n\'est pas valide.');
    }
  }
  
}

