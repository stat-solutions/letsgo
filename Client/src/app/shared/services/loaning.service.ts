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
  }
  getLoanSecurityType(): any {
    return this.http.get<any>(`${this.API_URL}/api/adminUser/getLoanSecurityType`);
  }
  postCreateLoan(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/loan/postCreateLoan`, postData);
  }
  getAllLoanDetails(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/loan/getAllLoanDetails`);
  }


  // Application User
  getCreatedLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/applicationUser/getCreatedLoans/?branchId=${id}`);
  }
  getApplicationDefferredLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/applicationUser/getApplicationDefferredLoans/?branchId=${id}`);
  }
  getApplicationReceivedDefferredLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/applicationUser/getApplicationReceivedDefferredLoans/?branchId=${id}`);
  }
  getApplicationRectifiedDefferredLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/applicationUser/getApplicationRectifiedDefferredLoans/?branchId=${id}`);
  }
  forwardApplicationLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/applicationUser/forwardApplicationLoans`, postData);
  }
  receiveApplicationDefferedLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/applicationUser/receiveApplicationDefferedLoans`, postData);
  }
  rectifyApplicationDefferedLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/applicationUser/rectifyApplicationDefferedLoans`, postData);
  }
  forwardApplicationRectifiedDefferedLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/applicationUser/forwardApplicationRectifiedDefferedLoans`, postData);
  }


  // BranchApproval
  getBranchApprovalForwardedLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/branchApprovalUser/getBranchApprovalForwardedLoans/?branchId=${id}`);
  }
  getReceivedBranchApprovalLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/branchApprovalUser/getReceivedBranchApprovalLoans/?branchId=${id}`);
  }
  getApprovedBranchApprovalLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/branchApprovalUser/getApprovedBranchApprovalLoans/?branchId=${id}`);
  }
  receiveBranchApprovalForwardedLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/branchApprovalUser/receiveBranchApprovalForwardedLoans`, postData);
  }
  approveBranchApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/branchApprovalUser/approveBranchApprovalLoans`, postData);
  }
  deferBranchApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/branchApprovalUser/deferBranchApprovalLoans`, postData);
  }
  rejectBranchApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/branchApprovalUser/rejectBranchApprovalLoans`, postData);
  }

  // BranchExit
  getForwardedBranchExitLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/branchExitUser/getForwardedBranchExitLoans/?branchId=${id}`);
  }
  getReceivedBranchExitLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/branchExitUser/getReceivedBranchExitLoans/?branchId=${id}`);
  }
  receiveForwardedBranchExitLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/branchExitUser/receiveForwardedBranchExitLoans`, postData);
  }
  forwardBranchExitLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/branchExitUser/forwardBranchExitLoans`, postData);
  }

  // Regional Approval
  getForwardedRegionalApprovalLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/regionalApprovalUser/getForwardedRegionalApprovalLoans/?branchId=${id}`);
  }
  getReceivedRegionalApprovalLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/regionalApprovalUser/getReceivedRegionalApprovalLoans/?branchId=${id}`);
  }
  getApprovedRegionalApprovalLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/regionalApprovalUser/getApprovedRegionalApprovalLoans/?branchId=${id}`);
  }
  getRegionalApprovalDefferredLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/regionalApprovalUser/getRegionalApprovalDefferredLoans/?branchId=${id}`);
  }
  getReceivedRegionalApprovalDefferredLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/regionalApprovalUser/getReceivedRegionalApprovalDefferredLoans/?branchId=${id}`);
  }
  getRectifiedRegionalApprovalDefferredLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/regionalApprovalUser/getRectifiedRegionalApprovalDefferredLoans/?branchId=${id}`);
  }
  receiveForwardedRegionalApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/regionalApprovalUser/receiveForwardedRegionalApprovalLoans`, postData);
  }
  approveRegionalApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/regionalApprovalUser/approveRegionalApprovalLoans`, postData);
  }
  deferRegionalApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/regionalApprovalUser/deferRegionalApprovalLoans`, postData);
  }
  rejectRegionalApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/regionalApprovalUser/rejectRegionalApprovalLoans`, postData);
  }
  forwardRegionalApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/regionalApprovalUser/forwardRegionalApprovalLoans`, postData);
  }
  rectifyRegionalApprovalDefferedLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/regionalApprovalUser/rectifyRegionalApprovalDefferedLoans`, postData);
  }
  forwardRectifiedRegionalApprovalDefferedLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/regionalApprovalUser/forwardRectifiedRegionalApprovalDefferedLoans`, postData);
  }

  // Head Office Entry
  getForwardedHeadOfficeEntryLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/headOfficeEntryUser/getForwardedHeadOfficeEntryLoans/?branchId=${id}`);
  }
  getReceivedHeadOfficeEntryLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/headOfficeEntryUser/getReceivedHeadOfficeEntryLoans/?branchId=${id}`);
  }
  receiveForwardedHeadOfficeEntryLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/headOfficeEntryUser/receiveForwardedHeadOfficeEntryLoans`, postData);
  }
  forwardHeadOfficeEntryLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/headOfficeEntryUser/forwardHeadOfficeEntryLoans`, postData);
  }

  getSpecificCustomers(stage: string): any {
    return of(this.loanData.filter((loans) => loans.Stage === stage));
  }
  getLoanDetails(id: number): any {
    return of(this.loanData.find((loans) => loans.Id === id));
  }
}
