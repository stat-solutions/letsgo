import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable, throwError, of } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpParams, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Tokens } from '../models/tokens';
import { map, tap, catchError, mapTo } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {

  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getAllBranches(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/adminUser/getAllBranches`);
  }
  getOneBranch(branchId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/adminUser/getOneBranch/?branchId${branchId}`);
  }
  createBranch(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/adminUser/postCreateBranch`, postData);
  }
  putUpdateBranch(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/adminUser/putUpdateBranch`, postData);
  }
  setEditBranch(branch: any): any {
    localStorage.setItem('editBranch', JSON.stringify(branch));
  }
  getEditBranch(): any {
    return JSON.parse(localStorage.getItem('editBranch'));
  }
}
