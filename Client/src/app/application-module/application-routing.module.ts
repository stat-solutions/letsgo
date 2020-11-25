import { CustomersComponent } from './components/customers/customers.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UserTransactionsComponent } from './components/user-transactions/user-transactions.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { CreateLoansComponent } from './components/create-loans/create-loans.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {CustomerDetailsComponent} from './components/customer-details/customer-details.component';

const routes: Routes = [
  {
    path: '',
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
        path: 'customerdetails/:customerid',
        component: CustomerDetailsComponent,
      },
      {
        path: 'createloans',
        component: CreateLoansComponent,
      },
      {
        path: 'createcustomer',
        component: CreateCustomerComponent,
      },
      {
        path: 'editprofile',
        component: EditUserProfileComponent,
      },
      {
        path: 'usertransactions',
        component: UserTransactionsComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
