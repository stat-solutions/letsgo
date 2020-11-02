import { filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import {Registration} from '../models/registration-interface'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users:Registration[] = [
    {
<<<<<<< Updated upstream
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 1,
      name: 'nicholas',
      password: '1234',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'katznicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'Application',
    },
    {
      id: 2,
      name: 'katende',
      password: '12345',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'nicho@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'loggedIn',
      role: 'BranchApproval',
    },
    {
      id: 3,
      name: 'nicholas',
      password: '12346',
      branch: 'branch 1',
      contact: '0759983853',
      email: 'ssemakula@gmail.com',
      photo: 'assets/img/man.svg',
      status: 'NotLoggedIn',
      role: 'RegionalApproval',
    },
  ];
=======
    userId: 1,
    userName: "katende",
    userEmail:"katznicho@gmail.com",
    userPassword:"Kat2",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"Approved",
    userRole:"Application",
    photo:"assets/img/default.jpg",
    isLogged:true
    },
    {
    userId: 2,
    userName: "katende",
    userEmail:"katznicho@gmail.com",
    userPassword:"1234",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"notApproved",
    isLogged:false,
    userRole:"BranchApproval",
    photo:"assets/img/default.jpg"
    },
    {
    userId: 3,
    userName: "katende",
    userEmail:"katznicho@gmail.com",
    userPassword:"23445",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"Approved",
    isLogged:true,
    userRole:"BranchApproval",
    photo:"assets/img/default.jpg"
    },
    {
    userId: 4,
    userName: "katende",
    userEmail:"katznicho@gmail.com",
    userPassword:"23445",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"Approved",
    isLogged:true,
    userRole:"BranchApproval",
    photo:"assets/img/default.jpg"
    },
    {
    userId: 5,
    userName: "katende",
    userEmail:"katznicho@gmail.com",
    userPassword:"23445",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"Approved",
    isLogged:true,
    userRole:"BranchApproval",
    photo:"assets/img/default.jpg"
    },
    {
    userId: 6,
    userName: "katende",
    userEmail:"katznicho@gmail.com",
    userPassword:"23445",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"Approved",
    isLogged:true,
    userRole:"BranchApproval",
    photo:"assets/img/default.jpg"
    },
    {
    userId: 7,
    userName: "katende",
    userEmail:"katznicho@gmail.com",
    userPassword:"23445",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"Approved",
    isLogged:true,
    userRole:"BranchApproval",
    photo:"assets/img/default.jpg"
    },
    {
    userId: 8,
    userName: "katende",
    userEmail:"katznicho@gmail.com",
    userPassword:"23445",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"Approved",
    isLogged:true,
    userRole:"BranchApproval",
    photo:"assets/img/default.jpg"
    },
    {
    userId: 9,
    userName: "katende",
    userEmail:"katznicho@gmail.com",
    userPassword:"23445",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"Approved",
    isLogged:true,
    userRole:"BranchApproval",
    photo:"assets/img/default.jpg"
    },
    {
    userId: 10,
    userName: "katende",
    userEmail:"katznicho@gmail.com",
    userPassword:"23445",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"Approved",
    isLogged:true,
    userRole:"BranchApproval",
    photo:"assets/img/default.jpg"
    },

  ]
>>>>>>> Stashed changes

  constructor() {}
  getAllUsers() {
    return of(this.users);
  }

  viewLoggedIn() {
<<<<<<< Updated upstream
    return of(this.users.filter((user) => user.status === 'loggedIn'));
  }
  logOutUser(id: number) {
    let userId = this.users.find((user) => user.id === id);
    if (userId) {
      const updateStatus = { ...userId, status: 'NotLoggedIn' };
      return (this.users = [
        ...this.users.filter((user) => user.id !== id),
        updateStatus,
      ]);
    } else {
      return this.users;
    }
  }
  getSpecificUser(email: string) {
    //console.log(this.users.find(user=>user.email===email))
    return this.users.find((user) => user.email === email);
  }
  deleteUser(id: number) {
    return of(this.users.filter((users) => users.id !== id));
  }
=======
    return of(this.users.filter(user=>user.isLogged === true))
  }
  logOutUser(id:number, email:string, i:number):Registration[]{
   let user = this.users.find(user=>user.userId ===id && user.userEmail === email)
   this.users.slice(i, 1)
   user.isLogged = false
  this.users.push(user)
   return this.users
  }
  getSpecificUser(email: string) {
    //console.log(this.users.find(user=>user.userEmail===email))
    return this.users.find(user=>user.userEmail === email)

  }
  deleteUser(id:number){
    return of(this.users.filter(users=>users.userId !== id))
  }
  loginUser(user_email:string, password:string){
    return of(this.users.find(user=>user.userEmail===user_email&&user.userPassword===password))

  }
>>>>>>> Stashed changes
}
