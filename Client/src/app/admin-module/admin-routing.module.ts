import { BranchesComponent } from './components/branches/branches.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { LogoutUsersComponent } from './components/logout-users/logout-users.component';
import { ApproveUsersComponent } from './components/approve-users/approve-users.component';
import { ViewLoggedinUsersComponent } from './components/view-loggedin-users/view-loggedin-users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {ConstantsComponent } from './components/constants/constants.component';
import {CreateBranchComponent} from './components//create-branch/create-branch.component';
import {CustomerDetailsComponent} from './components/customer-details/customer-details.component';
import {UsersComponent} from './components/users/users.component';
import {EntitiesComponent} from './components/entities/entities.component'
const routes: Routes = [
  {
    path: '',
    component: PagesCoreAdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admindashboard'
      },

      {
        path: 'admindashboard',
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
      {
        path:"editprofile",
        component:EditProfileComponent
      },
      {
        path:"branch",
        component:BranchesComponent
      },
      {

        path:"createbranch",
        component:CreateBranchComponent
      },
      {
        path:"customerdetails/:customerid",
        component:CustomerDetailsComponent
      },
      {
        path: "users",
        component:UsersComponent
      },
      {
        path:"entities",
        component:EntitiesComponent
      }


    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
