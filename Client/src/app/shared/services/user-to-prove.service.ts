import { Observable, of as ObservableOf} from 'rxjs';
import { Injectable } from '@angular/core';
import {Registration} from '../models/registration-interface'
@Injectable({
  providedIn: 'root',
})
export class UserToProveService {
  private userToProve:Registration[] = [
    {
<<<<<<< Updated upstream
      id: 1,
      name: 'katende',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    },
    {
      id: 2,
      name: 'nicholas',
      status: 'notApproved',
    },
    {
      id: 3,
      name: 'stuart',
      status: 'notApproved',
    }  ];
  myApprovedUsers = [];
=======
    userId: 1,
    userName: "katende",
    userEmail:"katznicho@gmail.com",
    userPassword:"kat2",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"notApproved"
    },
    {
    userId: 2,
    userName: "nichoas",
    userEmail:"nico@gmail.com",
    userPassword:"kat2",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"notApproved"
    },
    {
    userId: 3,
    userName: "james",
    userEmail:"katznicho@gmail.com",
    userPassword:"kat2",
    userBranch:"Application",
    userNumber:"0759983853",
    status:"notApproved"
    },

  ]
  myApprovedUsers = []
>>>>>>> Stashed changes

  constructor() {}

  approveUsers() {
    return ObservableOf(
      this.userToProve.filter((user) => user.status === 'notApproved')
    );
  }
  approvedUsers() {
    return ObservableOf(
      this.userToProve.filter((user) => user.status === 'approved')
    );
  }
<<<<<<< Updated upstream
  approveUser(id: Number, role) {
    const userID = this.userToProve.find((userId) => userId.id === id);
    if (userID) {
      const newUser = { ...userID, status: 'approved', role: role };
      this.userToProve = [
        ...this.userToProve.filter((user) => user.id !== id),
        newUser,
      ];
    } else {
      return this.userToProve;
    }
=======
  approveUser(object) {
    console.log(object)
    const {id, role} = object
    const userID = this.userToProve.find(userId => userId.userId === id)
    if (userID) {
      const newUser = { ...userID, status: "approved", role:role }
      this.userToProve = [...this.userToProve.filter(user=>user.userId!==id ), newUser]
    }
    else {
      return this.userToProve
    }

  }
  addUsers(object) {
    let index = this.userToProve.slice(-1)[0].userId
    const userId = index+1;
    const newObject = {...object, status:"notApproved"}
    return this.userToProve.push(newObject)

>>>>>>> Stashed changes
  }
  addUsers() {}
}
