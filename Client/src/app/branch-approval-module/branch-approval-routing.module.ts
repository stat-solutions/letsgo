import { CustomersComponent } from './components/customers/customers.component';
import { ReportsComponent } from './../application-module/components/reports/reports.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserTransactionsComponent } from './components/user-transactions/user-transactions.component';



const routes: Routes = [
  {
    path: '',
    component: PagesCoreAdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },

      {
        path: 'dashboard',
       component:DashboardComponent,
      },
      {
        path: 'editprofile',
       component:EditProfileComponent,
      },
      {
        path: 'reports',
       component:ReportsComponent,
      },
      {
        path: 'usertransactions',
       component:UserTransactionsComponent,
      },
      {
        path: 'customers',
       component:CustomersComponent,
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
