import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable, throwError, of } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpParams, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Tokens } from '../models/tokens';
import { map, tap, catchError, mapTo } from 'rxjs/operators';
import { UserRole } from '../models/user-role';
// import { RegisterUser } from '../models/register';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users  = [
    {
      userId: 1,
      userName: 'katende',
      userEmail: 'katznicho@gmail.com',
      userPassword: 'Kat2',
      userBranch: 'Application',
      userNumber: '0759983853',
      status: 'Approved',
      userRole: 'Application',
      photo: 'assets/img/default.jpg',
      isLogged: true,
    },
    {
      userId: 2,
      userName: 'katende',
      userEmail: 'katznicho@gmail.com',
      userPassword: '1234',
      userBranch: 'Application',
      userNumber: '0759983853',
      status: 'notApproved',
      isLogged: false,
      userRole: 'BranchApproval',
      photo: 'assets/img/default.jpg',
    },
    {
      userId: 3,
      userName: 'katende',
      userEmail: 'katznicho@gmail.com',
      userPassword: '23445',
      userBranch: 'Application',
      userNumber: '0759983853',
      status: 'Approved',
      isLogged: true,
      userRole: 'BranchApproval',
      photo: 'assets/img/default.jpg',
    },
  ];
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(): any {
    return this.http.get<any>(`${this.API_URL}/api/user/getAllUsers`);
  }
  getUserRoles(): any {
    return this.http.get<any>(`${this.API_URL}/api/auth/userRoles`);
  }
  viewLoggedIn(): any {
    // let users: any;
    // this.getUsers().subscribe(
    //   res => users = res,
    //   err => console.log(err.error.message)
    // );
    return of(this.users.filter((user) => user.isLogged === true));
  }
  logOutUser(id: number, email: string, i: number): any {
    const user = this.users.find(
      usr  => usr.userId === id && usr.userEmail === email
    );
    this.users.slice(i, 1);
    user.isLogged = false;
    this.users.push(user);
    return this.users;
  }
  getSpecificUser(email: string): any {
    //  console.log(this.users.find(user=>user.userEmail===email))
    return this.users.find((user) => user.userEmail === email);
  }
  deleteUser(id: number): any {
    return of(this.users.filter((users) => users.userId !== id));
  }
  // tslint:disable-next-line: variable-name
  loginUser(user_email: string, password: string): any {
    return of(
      this.users.find(
        (user) =>
          user.userEmail === user_email && user.userPassword === password
      )
    );
  }
}
