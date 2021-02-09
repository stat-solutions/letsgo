import { HttpInterceptor } from '@angular/common/http';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import {ModalModule} from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InterceptorService } from './shared/services/interceptor.service';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
],
  imports: [
    HttpClientModule,
    AdminModule,
    CommonModule,
    BrowserModule,
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
NgbModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    JwtModule.forRoot({
      config: {
      //   tokenGetter: () => {
      //   //   // ;
      //   // },
      //   allowedDomains: ["localhost:4200/"],
      //   disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    SharedModule,
    AsyncPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
