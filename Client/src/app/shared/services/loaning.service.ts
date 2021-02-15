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
  private loanData = [
    {
      Id: 1,
      Customer: 'Nicolas',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 9,
      Amount: 500000,
      Stage: 'Application',
      Status: 'Notforwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.createdAt,
      HowLong: 4,
      CreatedAt: this.createdAt,
      LoanStatus: 'running',
      comment: 'loan created',
      Branch: 'Application',
      userName: 'Katende Nicholas',
    },
    {
      Id: 5,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'Branch',
      Status: 'forwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus: 'rejected',
      CreatedAt: this.myCreatedAt,
      comment: 'loan forwarded',
      Branch: 'BranchApproval',
      userName: 'Katende Nicholas',
    },
    {
      Id: 6,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'Branch',
      Status: 'forwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus: 'approved',
      CreatedAt: this.myCreatedAt,
      comment: 'loan forwarded',
      Branch: 'BranchApproval',
      userName: 'Katende Nicholas',
    },
    {
      Id: 7,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'Branch',
      Status: 'forwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus: 'approved',
      CreatedAt: this.myCreatedAt,
      comment: 'loan created',
      Branch: 'Application',
      userName: 'Katende Nicholas',
    },
    {
      Id: 8,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'Branch',
      Status: 'forwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus: 'approved',
      CreatedAt: this.myCreatedAt,
      comment: 'loan forwarded',
      Branch: 'BranchApproval',
      userName: 'Katende Nicholas',
    }
  ];

  constructor(private http: HttpClient) {}
  postCreateLoanThreshold(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/adminUser/postCreateLoanThreshold`, postData);
  }
  putUpdateLoanThresholds(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/adminUser/putUpdateLoanThresholds`, postData);
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
  deleteLoanSecurityType(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/adminUser/deleteLoanSecurityType`, postData);
    // {
    //   "securityTypeCode":  99
    //   }
  }
  getLoanSecurityType(): any {
    return this.http.get<any>(`${this.API_URL}/api/adminUser/getLoanSecurityType`);
  }
  postCreateLoan(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/loan/postCreateLoan`, postData);
    //   [
    //     {
    //         "securityTypeCode":100,
    //         "loanSecurityName":"Land Title",
    //    "loanSecurityLocation":"Buloba Nandanda",
    //    "loanSecurityPhotoUrl":"photoUrlMissing.com"
    //     },
    //      {
    //         "securityTypeCode": 100,
    //         "loanSecurityName":"Centenary Bank Cheque",
    //    "loanSecurityLocation":"To be presented",
    //    "loanSecurityPhotoUrl":"photoUrlMissing.com"
    //     }
    //   ]
    //   ]
  }
  getAllLoanDetails(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/loan/getAllLoanDetails`);
  }
  getCreatedLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/applicationUser/getCreatedLoans/?branchId=${id}`);
  }
  forwardApplicationLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/applicationUser/forwardApplicationLoans`, postData);
    // {
    //   "loanId":3000004,
    //      "loanComment":"He is a good customer"
    //    }
  }
  getloanData(): any {
    return of(this.loanData);
  }
  getSpecificCustomers(stage: string): any {
    return of(this.loanData.filter((loans) => loans.Stage === stage));
  }
  getLoanDetails(id: number): any {
    return of(this.loanData.find((loans) => loans.Id === id));
  }
}
