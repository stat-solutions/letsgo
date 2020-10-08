import { UsersService } from './../../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout-users',
  templateUrl: './logout-users.component.html',
  styleUrls: ['./logout-users.component.scss']
})
export class LogoutUsersComponent implements OnInit {
  logOutUsersArray = []

  constructor(private loggoutUsers:UsersService) { }

  ngOnInit() {
    this.loggoutUsers.viewLoggedIn().subscribe(loggedOut => {
      this.logOutUsersArray = loggedOut
    })
  }
  checkLogOutUsers(array: Array<any>) {
    return array.length?true:false
    
  }
  logOutUser(id: number) {
    this.loggoutUsers.logOutUser(id)
    
  }

}
