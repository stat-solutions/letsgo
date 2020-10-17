import { HttpInterceptor, HttpClient } from '@angular/common/http';
import { LoanAdministrationVerificationModule } from './loan-administration-verification-module/loan-administration-verification.module';
import { BranchExitModule } from './branch-exit-module/branch-exit-module';
import { BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin-module/admin-module';
import { AuthModule } from './auth-module/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BranchApprovalModule } from './branch-approval-module/branch-approval-module';
import { CreditAnalysisModule } from './credit-analysis-module/credit-analysis-module';
import { DisbursementModule } from './disbursement-module/disbursement-module';
import { HeadOfficeApprovalModule } from './head-office-approval-module/head-office-approval-module';
import { HeadOfficeEntry } from './head-office-entry-module/head-office-entry.module';
import { LegalReviewModule } from './legal-review-module/legal-review.module';
import { LoanAdministrationEntryModule } from './loan-administration-entry-module/loan-administration-entry.module';
import { LoanAdministrationExitModule } from './loan-administration-exit-module/loan-administration-exit.module';
import { RegionalApprovalModule } from './regional-approval-module/regional-approval.module';
import { LoanApplicationModule } from './application-module/loanapplication.module';
import { ConstantsComponent } from './admin-module/components/constants/constants.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {ModalModule} from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [
    AppComponent],
  imports: [
    HttpClientModule,
    AdminModule,
    CommonModule,
    BranchApprovalModule,
    BranchExitModule,
    LoanApplicationModule,
    CreditAnalysisModule,
    DisbursementModule,
    HeadOfficeApprovalModule,
    HeadOfficeEntry,
    LegalReviewModule,
    LoanAdministrationEntryModule,
    LoanAdministrationExitModule,
    LoanAdministrationVerificationModule,
    BrowserAnimationsModule,
    RegionalApprovalModule,
    AppRoutingModule,
    AdminModule,
    AuthModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
