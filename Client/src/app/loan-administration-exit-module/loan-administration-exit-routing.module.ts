import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';


import { CustomersComponent } from './components/customers/customers.component';
import { ReportsComponent } from './components/reports/reports.component';
import {CustomerDetailsComponent} from './components/customer-details/customer-details.component';

import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserTransactionsComponent } from './components/user-transactions/user-transactions.component';
import { LoanAdminExitGuard } from '../shared/services/route-guards/loan-admin-exit-guard.service';

const routes: Routes = [
  {
    path: 'loanexit',
    canActivateChild: [LoanAdminExitGuard],
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
        path: 'editprofile',
        component: EditProfileComponent,
      },
      {
        path: 'usertransactions',
        component: UserTransactionsComponent,
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
export class LoanAdministrativeExitRouting { }
