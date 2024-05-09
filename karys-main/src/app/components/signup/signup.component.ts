import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { addDoc, collection } from 'firebase/firestore';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  form!:FormGroup;
  isCheckboxChecked = false;
  constructor(
    private authentificationService: AuthentificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      prenom: ['',[Validators.required]],
      nom: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required], Validators.minLength(6)],
      confirmPassword: ['',[Validators.required]],
      username: ['',[Validators.required]]
    });
  }

  public checkboxselector(event: MatCheckboxChange) {
    if (event.source.checked) {
      this.isCheckboxChecked = true;
      console.log('Checkbox is checked');
    }
  };
  
    createAccount() {
      if(this.form.value.password === this.form.value.confirmPassword && this.isCheckboxChecked === true) {
        
        from(
          this.authentificationService.signUp(
            {
              email: this.form.value.email,
              password: this.form.value.password
            })
      ).subscribe(async () => {
          
          const userData = {
            prenom: this.form.value.prenom,
            nom: this.form.value.nom,
            email: this.form.value.email,
            username: this.form.value.username
          };
          try {
            const userCollectionRef =collection(this.authentificationService.firestore,'users');
            await addDoc(userCollectionRef, userData);

            this.router.navigate(['/signin']);
          } catch (error) {
            console.error('Add to collection error:', error);
            throw error;
          }
            // this.authentificationService.firestore.collection('users').add(userData).then(() => {
            //   // Redirect the user to the sign-in page
            //   
            // }).catch(error => {
            //   console.error('Error adding user data to Firestore: ', error);
            //   this.snackBar.open('Error signing up. Please try again later.', 'Ok', {
            //     duration: 5000
            //   });
            // });

        });
      }
      else
      {
        this.snackBar.open("Erreur de création du compte", 'Ok',{
          duration: 5000
        })
      }
    }
}

