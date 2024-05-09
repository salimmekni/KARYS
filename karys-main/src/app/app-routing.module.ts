import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : 'signin',
    loadChildren: () => import('./components/signin/signin.module').then(m => m.SigninModule) 
  },
  {
    path : 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) 
  },
  {
    path : 'signup',
    loadChildren: () => import('./components/signup/signup.module').then(m => m.SignupModule) 
  },
  {
    path : 'player-search',
    loadChildren: () => import('./components/player-search/player-search.module').then(m => m.PlayerSearchModule) 
  },{
    path : 'tournament',
    loadChildren: () => import('./components/tournament/tournament.module').then(m => m.TournamentModule) 
  },
  {
    path : 'navbar',
    loadChildren: () => import('./components/navbar/navbar.module').then(m => m.NavbarModule) 
  },
  {
    path : '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
