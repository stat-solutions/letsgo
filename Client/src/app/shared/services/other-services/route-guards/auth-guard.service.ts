import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
  
    constructor(private authService: AuthServiceService, private router: Router) { }
  
    canActivate() {
      if (this.authService.isLoggedIn()) {
       if(jwt_decode(this.authService.getJwtToken()).role.toLowerCase() === "admin"){
            this.router.navigate(['admin/dashboard']);
       }
       else if (jwt_decode(this.authService.getJwtToken()).role.toLowerCase() === "application"){
            this.router.navigate(['application/dashboard']);
       }
       else if (jwt_decode(this.authService.getJwtToken()).role === "branchapproval"){
            this.router.navigate(['branchapproval/dashboard']);
       }
       else if (jwt_decode(this.authService.getJwtToken()).role === "branchexit"){
            this.router.navigate(['branchexit/dashboard']);
       }
       else if (jwt_decode(this.authService.getJwtToken()).role === "creditanalysis"){
            this.router.navigate(['creditanalysis/dashboard']);
       }
       else if (jwt_decode(this.authService.getJwtToken()).role === "disbursement"){
            this.router.navigate(['disbursement/dashboard']);
       }
       else if (jwt_decode(this.authService.getJwtToken()).role === "headofficeentry"){
            this.router.navigate(['headofficeentry/dashboard']);
       }
       else if (jwt_decode(this.authService.getJwtToken()).role === "headofficeapproval"){
            this.router.navigate(['headofficeapproval/dashboard']);
       }
       else if (jwt_decode(this.authService.getJwtToken()).role === "legalreview"){
            this.router.navigate(['legalreview/dashboard']);
       }
       else if (jwt_decode(this.authService.getJwtToken()).role === "regional"){
            this.router.navigate(['regional/dashboard']);
       }
       else if (jwt_decode(this.authService.getJwtToken()).role === "loanadministrationexit"){
            this.router.navigate(['loanexit/dashboard']);
       }
       else if (jwt_decode(this.authService.getJwtToken()).role === "loanadministrationentry"){
            this.router.navigate(['loanadministrationentry/dashboard']);
       }
       else if (jwt_decode(this.authService.getJwtToken()).role === "loanadministrationverification"){
            this.router.navigate(['loanadministrationverification/dashboard']);
       }
      }
      else {
        return !this.authService.isLoggedIn();
      }
    }
  }