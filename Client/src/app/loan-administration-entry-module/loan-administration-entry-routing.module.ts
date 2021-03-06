import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { CustomersComponent } from './components/customers/customers.component';
import { ReportsComponent } from './components/reports/reports.component';
import {CustomerDetailsComponent} from './components/customer-details/customer-details.component';

import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserTransactionsComponent } from './components/user-transactions/user-transactions.component';
import { LoanAdminEntryGuard } from '../shared/services/route-guards/loan-admin-entry-guard.service';

const routes: Routes = [
  {
    path: 'loanentry',
    canActivateChild: [LoanAdminEntryGuard],
    component: PagesCoreAdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },

      {
        path: 'dashboard',
        component: DashboardComponent,
      },

      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'usertransactions',
        component: UserTransactionsComponent,
      },
      {
        path: 'editprofile',
        component: EditProfileComponent,
      },
      {
        path: 'customerdetails/:customerid',
        component: CustomerDetailsComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanAdministrativeEntryRouting { }
