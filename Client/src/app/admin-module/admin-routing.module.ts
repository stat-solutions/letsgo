import { ReportsComponent } from './components/reports/reports.component';
import { LogoutUsersComponent } from './components/logout-users/logout-users.component';
import { ApproveUsersComponent } from './components/approve-users/approve-users.component';
import { ViewLoggedinUsersComponent } from './components/view-loggedin-users/view-loggedin-users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {ConstantsComponent } from './components/constants/constants.component';




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
       component: DashboardComponent,
      },
      {
        path: 'approveusers',
       component:ApproveUsersComponent,
      },
      {
        path: 'logout',
        component: LogoutUsersComponent
      },
      {
        path: 'loggedin',
       component:ViewLoggedinUsersComponent,
      },
      {
        path: 'reports',
       component:ReportsComponent,
      },
      {
        path: 'constants',
       component:ConstantsComponent,
      },
      

    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
