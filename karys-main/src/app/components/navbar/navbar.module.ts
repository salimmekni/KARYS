import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar.component';


const routes: Routes = [  
  { 
    path: '',
    component: NavbarComponent 
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,    
    RouterModule.forChild(routes)

  ]
})
export class NavbarModule { }
