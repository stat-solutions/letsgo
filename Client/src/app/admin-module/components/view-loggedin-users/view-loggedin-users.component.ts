import { UsersService } from './../../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-loggedin-users',
  templateUrl: './view-loggedin-users.component.html',
  styleUrls: ['./view-loggedin-users.component.scss']
})
export class ViewLoggedinUsersComponent implements OnInit {
  loggedInUsers = []

  constructor(private loggedInUser:UsersService) { }

  ngOnInit() {
    this.loggedInUser.viewLoggedIn().subscribe(loggedIn => {
      this.loggedInUsers = loggedIn
    })
  }
  checkLoggedInUsers(array: Array<any>) {
    return array.length?true:false
    
  }

}
