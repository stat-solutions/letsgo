import { Observable, of } from 'rxjs';
import { LoadingModel } from '../models/loadingModel';
import { Injectable } from '@angular/core';
import * as momemt from 'moment';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpParams, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class LoaningService {
  private createdAt = momemt(1577826000000).format('MM/DD/YYYY, h:mm:ss ');
  private myCreatedAt = momemt(1588280400000).format('MM/DD/YYYY, h:mm:ss ');
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}
  postCreateLoanThreshold(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/adminUser/postCreateLoanThreshold`, postData);
  }
  putUpdateLoanThresholds(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/adminUser/putUpdateLoanThresholds`, postData);
//   {
//     "loanThresholdId":9,
//   "userId":10000015,
// "loanThresholdType":  "MSE",
// "loanThresholdProduct":"MSE Education",
// "loanThresholdMaxAmount": 30000000,
// "loanThresholdMaxTenure":30,
// "loanThresholdTime":5
// }
  }
  getAllLoanThresholds(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/adminUser/getAllLoanThresholds`);
  }
  getOneLoanThresholds(loanThresholdId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/adminUser/getOneLoanThresholds/?loanThresholdId=${loanThresholdId}`);
  }
  postCreateLoanSecurityType(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/adminUser/postCreateLoanSecurityType`, postData);
  }
  getloanData(): any {
    // return of();
  }
  getSpecificCustomers(stage: string): any {
    // return of(this.loanData.filter((loans) => loans.Stage === stage));
  }
  getLoanDetails(id: number): any {
    // return of(this.loanData.find((loans) => loans.Id === id));
  }
}
