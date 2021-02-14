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
      Id: 2,
      Customer: 'Chiller',
      LoanType: 'Group',
      LoanProduct: 'product 2',
      Tenure: 12,
      Amount: 500000,
      userName: 'Katende Nicholas',
    },
    {
      Id: 3,
      Customer: 'Katende',
      LoanType: 'SME',
      LoanProduct: 'product 3',
      Tenure: 5,
      Amount: 500000,
      Stage: 'BranchExit',
      LoanMovedBy: 'Branch office',
      HowLong: 3,
      LoanStatus: 'disbursed',
      StageAt: this.createdAt,
      CreatedAt: this.myCreatedAt,
      comment: 'loan forwarded',
      Branch: 'BranchApproval',
      userName: 'Katende Nicholas',
    },
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
      Id: 4,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'Regional',
      Status: 'Notforwaded',
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
      Id: 5,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'loanVerification',
      Status: 'forwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus: 'deferred',
      CreatedAt: this.myCreatedAt,
      comment: 'loan forwarded',
      Branch: 'BranchApproval',
      userName: 'Katende Nicholas',
    },
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
    },
    {
      Id: 9,
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
      Id: 10,
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
  ];

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
    return of(this.loanData);
  }
  getSpecificCustomers(stage: string): any {
    return of(this.loanData.filter((loans) => loans.Stage === stage));
  }
  getLoanDetails(id: number): any {
    return of(this.loanData.find((loans) => loans.Id === id));
  }
}
