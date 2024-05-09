import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TournamentComponent } from './tournament.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [  
  { 
    path: '',
    component: TournamentComponent 
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ]
})
export class TournamentModule { }
