import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NavbarComponent } from '../navbar/navbar.component';

const routes: Routes = [  
  { 
    path: '',
    component: SignupComponent 
  }
]

@NgModule({
  declarations: [
    SignupComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltip,
    MatIconModule,
    MatCheckboxModule,
    AngularFirestoreModule
  ]
})
export class SignupModule { }
