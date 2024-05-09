import { Component } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentUser: any;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();

  }
  logout() {
    this.userService.logout();
  }
}
