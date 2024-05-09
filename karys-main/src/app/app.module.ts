import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './components/home/home.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { PlayerSearchComponent } from './components/player-search/player-search.component';
import { FormsModule } from '@angular/forms';
import { HistoriqueComponent } from './components/historique/historique.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TournamentComponent } from './components/tournament/tournament.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayerSearchComponent,
    HistoriqueComponent,
    NavbarComponent,
    TournamentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule, 
    provideFirebaseApp(() => initializeApp({"projectId":"karys-86c3d","appId":"1:1014848131457:web:7bb281934bf4ff464cd880","storageBucket":"karys-86c3d.appspot.com","apiKey":"AIzaSyDEjr78Xc3kVfl7YXdAj0ERd2Fc69qypYc","authDomain":"karys-86c3d.firebaseapp.com","messagingSenderId":"1014848131457"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
