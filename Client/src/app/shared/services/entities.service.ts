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
import { CompanyInfo } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
    private API_URL = environment.apiUrl;
    httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })};
  constructor(private http: HttpClient, private router: Router) { }
//  create company section
    createCompany(postData: any): Observable<any>{
        return this.http.post<any>(`${this.API_URL}/api/adminUser/setUpCompany`, postData, this.httpOptions)
          .pipe(
           tap(res => console.log(`AFTER MAP: ${res}`)),
           // catchError(this.handleCompanySetupError)
        );
}
    updateCompanyLogo(postData: any): Observable<any>{
        return this.http.post<any>(`${this.API_URL}/api/adminUser/updateCompanyLogo`, postData, this.httpOptions)
          .pipe(
           tap(res => console.log(`AFTER MAP: ${res}`)),
           // catchError(this.handleCompanySetupError)
          );
    }
    getCompanyInfo(): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/api/adminUser/getTheCompanyDetails`)
        .pipe(
         // catchError(this.OtherErrors)
        ) as Observable<any>;
    }

}
