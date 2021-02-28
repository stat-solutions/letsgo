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
  forwardBranchApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/branchApprovalUser/forwardBranchApprovalLoans`, postData);
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
  receiveRegionalApprovalDefferedLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/regionalApprovalUser/receiveRegionalApprovalDefferedLoans`, postData);
  }
  rectifyRegionalApprovalDefferedLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/regionalApprovalUser/rectifyRegionalApprovalDefferedLoans`, postData);
  }
  forwardRectifiedRegionalApprovalDefferedLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/regionalApprovalUser/forwardRectifiedRegionalApprovalDefferedLoans`, postData);
  }

  // creditAnlysisUser
  getForwardedCreditAnlysisLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/creditAnlysisUser/getForwardedCreditAnlysisLoans/?branchId=${id}`);
  }
  getReceivedCreditAnlysisLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/creditAnlysisUser/getReceivedCreditAnlysisLoans/?branchId=${id}`);
  }
  getApprovedCreditAnlysisLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/creditAnlysisUser/getApprovedCreditAnlysisLoans/?branchId=${id}`);
  }
  getCreditAnlysisDefferredLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/creditAnlysisUser/getCreditAnlysisDefferredLoans/?branchId=${id}`);
  }
  getReceivedCreditAnlysisDefferredLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/creditAnlysisUser/getReceivedCreditAnlysisDefferredLoans/?branchId=${id}`);
  }
  getRectifiedCreditAnlysisDefferredLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/creditAnlysisUser/getRectifiedCreditAnlysisDefferredLoans/?branchId=${id}`);
  }
  receiveForwardedCreditAnlysisLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/creditAnlysisUser/receiveForwardedCreditAnlysisLoans`, postData);
  }
  approveCreditAnlysisLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/creditAnlysisUser/approveCreditAnlysisLoans`, postData);
  }
  deferCreditAnlysisLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/creditAnlysisUser/deferCreditAnlysisLoans`, postData);
  }
  rejectCreditAnlysisLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/creditAnlysisUser/rejectCreditAnlysisLoans`, postData);
  }
  forwardCreditAnlysisLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/creditAnlysisUser/forwardCreditAnlysisLoans`, postData);
  }
  receiveCreditAnlysisDefferedLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/creditAnlysisUser/receiveCreditAnlysisDefferedLoans`, postData);
  }
  rectifyCreditAnlysisDefferedLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/creditAnlysisUser/rectifyCreditAnlysisDefferedLoans`, postData);
  }
  forwardRectifiedCreditAnlysisDefferedLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/creditAnlysisUser/forwardRectifiedCreditAnlysisDefferedLoans`, postData);
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

  // loanAdministrationEntryUser
  getForwardedLoanAdministrationEntryLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/loanAdministrationEntryUser/getForwardedLoanAdministrationEntryLoans/?branchId=${id}`);
  }
  getReceivedLoanAdministrationEntryLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/loanAdministrationEntryUser/getReceivedLoanAdministrationEntryLoans/?branchId=${id}`);
  }
  receiveForwardedLoanAdministrationEntryLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/loanAdministrationEntryUser/receiveForwardedLoanAdministrationEntryLoans`, postData);
  }
  forwardLoanAdministrationEntryLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/loanAdministrationEntryUser/forwardLoanAdministrationEntryLoans`, postData);
  }

  // loanAdministrationExitUser
  getForwardedLoanAdministrationExitLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/loanAdministrationExitUser/getForwardedLoanAdministrationExitLoans/?branchId=${id}`);
  }
  getReceivedLoanAdministrationExitLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/loanAdministrationExitUser/getReceivedLoanAdministrationExitLoans/?branchId=${id}`);
  }
  receiveForwardedLoanAdministrationExitLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/loanAdministrationExitUser/receiveForwardedLoanAdministrationExitLoans`, postData);
  }
  forwardLoanAdministrationExitLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/loanAdministrationExitUser/forwardLoanAdministrationExitLoans`, postData);
  }

  // loanAdministrationVerificationUser
  getForwardedLoanAdministrationVerificationLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/loanAdministrationVerificationUser/getForwardedLoanAdministrationVerificationLoans/?branchId=${id}`);
  }
  getReceivedLoanAdministrationVerificationLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/loanAdministrationVerificationUser/getReceivedLoanAdministrationVerificationLoans/?branchId=${id}`);
  }
  getApprovedLoanAdministrationVerificationLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/loanAdministrationVerificationUser/getApprovedLoanAdministrationVerificationLoans/?branchId=${id}`);
  }
  receiveForwardedLoanAdministrationVerificationLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/loanAdministrationVerificationUser/receiveForwardedLoanAdministrationVerificationLoans`, postData);
  }
  approveLoanAdministrationVerificationLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/loanAdministrationVerificationUser/approveLoanAdministrationVerificationLoans`, postData);
  }
  deferLoanAdministrationVerificationLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/loanAdministrationVerificationUser/deferLoanAdministrationVerificationLoans`, postData);
  }
  forwardLoanAdministrationVerificationLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/loanAdministrationVerificationUser/forwardLoanAdministrationVerificationLoans`, postData);
  }

  // headOfficeApprovalUser
  getForwardedHeadOfficeApprovalLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/headOfficeApprovalUser/getForwardedHeadOfficeApprovalLoans/?branchId=${id}`);
  }
  getReceivedHeadOfficeApprovalLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/headOfficeApprovalUser/getReceivedHeadOfficeApprovalLoans/?branchId=${id}`);
  }
  getApprovedHeadOfficeApprovalLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/headOfficeApprovalUser/getApprovedHeadOfficeApprovalLoans/?branchId=602${id}`);
  }
  receiveForwardedHeadOfficeApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/headOfficeApprovalUser/receiveForwardedHeadOfficeApprovalLoans`, postData);
  }
  approveHeadOfficeApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/headOfficeApprovalUser/approveHeadOfficeApprovalLoans`, postData);
  }
  deferHeadOfficeApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/headOfficeApprovalUser/deferHeadOfficeApprovalLoans`, postData);
  }
  forwardHeadOfficeApprovalLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/headOfficeApprovalUser/forwardHeadOfficeApprovalLoans`, postData);
  }

  // legalReviewUser
  getForwardedLegalReviewLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/legalReviewUser/getForwardedLegalReviewLoans/?branchId=${id}`);
  }
  getReceivedlegalReviewLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/legalReviewUser/getReceivedlegalReviewLoans/?branchId=${id}`);
  }
  getApprovedlegalReviewLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/legalReviewUser/getApprovedlegalReviewLoans/?branchId=${id}`);
  }
  receiveForwardedlegalReviewLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/legalReviewUser/receiveForwardedlegalReviewLoans`, postData);
  }
  approvelegalReviewLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/legalReviewUser/approvelegalReviewLoans`, postData);
  }
  deferlegalReviewLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/legalReviewUser/deferlegalReviewLoans`, postData);
  }
  forwardlegalReviewLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/legalReviewUser/forwardlegalReviewLoans`, postData);
  }

  // loanDisbursementUser
  getForwardedLoanDisbursementLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/loanDisbursementUser/getForwardedLoanDisbursementLoans/?branchId=${id}`);
  }
  getReceivedLoanDisbursementLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/loanDisbursementUser/getReceivedLoanDisbursementLoans/?branchId=${id}`);
  }
  getApprovedLoanDisbursementLoans(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/loanDisbursementUser/getApprovedLoanDisbursementLoans/?branchId=${id}`);
  }
  receiveForwardedLoanDisbursementLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/loanDisbursementUser/receiveForwardedLoanDisbursementLoans`, postData);
  }
  approveLoanDisbursementLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/loanDisbursementUser/approveLoanDisbursementLoans`, postData);
  }
  deferLoanDisbursementLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/loanDisbursementUser/deferLoanDisbursementLoans`, postData);
  }
  disburseLoanDisbursementLoans(postData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/loanDisbursementUser/disburseLoanDisbursementLoans`, postData);
  }

  getLoanDetails(id: number): any {
    return this.http.get<any>(`${this.API_URL}/api/loan/getLoanMovementDetails/?loanId=${id}`);
  }
}
