import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomersComponent} from './components/customers/customers.component';
//import {EditUserProfileComponent} from './components/edit-profile/edit-profile.component';
import {UserTransactionsComponent} from './components/user-transactions/user-transactions.component'
import {ReportsComponent} from './components/reports/reports.component'


const routes: Routes = [
  {
    path: '',
    component: PagesCoreAdminComponent, children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },

      {
        path: 'dashboard',
       component: DashboardComponent,
      },
      {
        path: 'usertransactions',
       component:UserTransactionsComponent,
      },
      {
        path: 'customers',
       component:CustomersComponent,
      },
      {
        path: "reports",
        component:ReportsComponent
      }

    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanAdministrativeVerificationRouting { }
