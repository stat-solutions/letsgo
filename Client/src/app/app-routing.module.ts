
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/route-guards/auth-guard.service';

const routes: Routes = [
  { path: 'authpage', redirectTo: '/authpage/login', pathMatch: 'full', },
  {
    path: '',
    redirectTo: '/authpage/login',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  { path: 'admin', loadChildren: () => import('./admin-module/admin-module').then(m => m.AdminModule) },


  { path: 'application', loadChildren: () => import('./application-module/loanapplication.module').then(m => m.LoanApplicationModule)},

  // tslint:disable-next-line: max-line-length
  { path: 'branchapproval', loadChildren: () => import('./branch-approval-module/branch-approval-module').then(m => m.BranchApprovalModule) },

  { path: 'branchexit', loadChildren: () => import('./branch-exit-module/branch-exit-module').then(m => m.BranchExitModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'creditanalysis', loadChildren: () => import('./credit-analysis-module/credit-analysis-module').then(m => m.CreditAnalysisModule) },

  { path: 'disbursement', loadChildren: () => import('./disbursement-module/disbursement-module').then(m => m.DisbursementModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'headofficeentry', loadChildren: () => import('./head-office-entry-module/head-office-entry.module').then(m => m.HeadOfficeEntry) },

  // tslint:disable-next-line: max-line-length
  { path: 'headofficeapproval', loadChildren: () => import('./head-office-approval-module/head-office-approval-module').then(m => m.HeadOfficeApprovalModule) },

  { path: 'legalreview', loadChildren: () => import('./legal-review-module/legal-review.module').then(m => m.LegalReviewModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'loanentry', loadChildren: () => import('./loan-administration-entry-module/loan-administration-entry.module').then(m => m.LoanAdministrationEntryModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'loanexit', loadChildren: () => import('./loan-administration-exit-module/loan-administration-exit.module').then(m => m.LoanAdministrationExitModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'loanverification', loadChildren: () => import('./loan-administration-verification-module/loan-administration-verification.module').then(m => m.LoanAdministrationVerificationModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'regional', loadChildren: () => import('./regional-approval-module/regional-approval.module').then(m => m.RegionalApprovalModule) },
  {
    path: '**',
    redirectTo: '/authpage/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
