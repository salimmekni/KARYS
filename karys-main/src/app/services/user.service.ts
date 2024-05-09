import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  constructor(private  router: Router) { }
  
  getUser() {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  isLoggedIn() {
    return this.getUser() !== null;
  }

  logout() {
    //localStorage.removeItem('user');
    localStorage.clear()
    this.router.navigate(['/signin']);
  }
}
