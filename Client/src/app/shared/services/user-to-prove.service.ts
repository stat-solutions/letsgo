import { Observable, of as ObservableOf} from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserToProveService {
  private userToProve = [
    {
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
  }
  addUsers() {}
}
