import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  currentUser: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
  }
  logout() {
    this.userService.logout();
  }

}
