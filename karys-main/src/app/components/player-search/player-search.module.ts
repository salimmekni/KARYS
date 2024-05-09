import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { PlayerSearchComponent } from './player-search.component';
import { RouterModule } from '@angular/router';


const routes: Routes = [  
  { 
    path: '',
    component: PlayerSearchComponent 
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),

  ]
})
export class PlayerSearchModule { }
