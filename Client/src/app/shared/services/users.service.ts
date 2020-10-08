import { filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'nicholas',
      password: "1234",
      branch: "branch 1",
      contact: "0759983853",
      email: "katznicho@gmail.com",
      photo: "assets/img/man.svg",
      status:"loggedIn"
    },
    {
      id: 2,
      name: 'katende',
      password: "12345",
      branch: "branch 1",
      contact: "0759983853",
      email: "nicho@gmail.com",
      photo: "assets/img/man.svg",
      status:"loggedIn"
    },
    {
      id: 3,
      name: 'nicholas',
      password: "12346",
      branch: "branch 1",
      contact: "0759983853",
      email: "ssemakula@gmail.com",
      photo: "assets/img/man.svg",
      status:"NotLoggedIn"
    }
  ]

  constructor() { }
  
  viewLoggedIn() {
    return of(this.users.filter(user=>user.status === 'loggedIn'))
  }
  logOutUser(id:number) {
    let userId = this.users.find(user => user.id === id)
    if (userId) {
      const updateStatus = { ...userId, status: "NotLoggedIn" }
      return this.users = [...this.users.filter(user=>user.id !== id), updateStatus]
      
    }
    else {
      return this.users
    }
    
  }
  getSpecificUser(email: string) {
    //console.log(this.users.find(user=>user.email===email))
    return this.users.find(user=>user.email === email)
    
  }

}
