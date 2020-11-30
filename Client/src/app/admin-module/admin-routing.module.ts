import { BranchesComponent } from './components/branches/branches.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ReportsComponent } from './components/reports/reports.component';
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
import {EntitiesComponent} from './components/entities/entities.component';
import {CreatesecurityComponent} from './components/createsecurity/createsecurity.component';
import { ConstantsTableComponent } from './components/constants-table/constants-table.component';
import {CustomersComponent} from './components/customers/customers.component';
import { AdminGuard } from '../shared/services/route-guards/admin-guard.service';
const routes: Routes = [
  {
    path: 'admin',
    component: PagesCoreAdminComponent,
    canActivateChild: [AdminGuard],
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
       component: ApproveUsersComponent,
      },
      {
       path: 'createsecurity',
       component: CreatesecurityComponent
      },

      {
        path: 'loggedin',
       component: ViewLoggedinUsersComponent,
      },
      {
        path: 'reports',
       component: ReportsComponent,
      },
      {
        path: 'constants',
       component: ConstantsComponent,
      },
      {
        path: "editprofile",
        component: EditProfileComponent
      },
      {
        path: "branch",
        component: BranchesComponent
      },
      {
        path: "constantstable",
        component: ConstantsTableComponent
      },
      {
        path: "createbranch",
        component: CreateBranchComponent
      },
      {
       path: "customers",
       component: CustomersComponent
      },
      {
        path: "customerdetails/:customerid",
        component: CustomerDetailsComponent
      },
      {
        path: "users",
        component: UsersComponent
      },
      {
        path: "entities",
        component: EntitiesComponent
      }


    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
