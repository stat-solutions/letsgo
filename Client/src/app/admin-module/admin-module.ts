import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ViewLoggedinUsersComponent } from './components/view-loggedin-users/view-loggedin-users.component';
import { LogoutUsersComponent } from './components/logout-users/logout-users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-alerts';
import {  AdminRoutingModule} from "./admin-routing.module";
import { SharedModule } from '../shared/shared.module';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeftPanelAdminComponent } from './common/left-panel/left-panel-admin.component';
import { RightPanelAdminComponent } from './common/right-panel/right-panel-admin.component';
import { HeaderAdminComponent } from './common/header/header-admin.component';
import { ContentSectionAdminComponent } from './content-section/content-section-admin.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ConstantsComponent } from './components/constants/constants.component';
import {ApproveUsersComponent} from './components/approve-users/approve-users.component'
import { BranchesComponent } from './components/branches/branches.component';
import { CreateBranchComponent } from './components/create-branch/create-branch.component';



@NgModule({
  declarations: [
    PagesCoreAdminComponent,
    LeftPanelAdminComponent,
    RightPanelAdminComponent,
    HeaderAdminComponent,
    ContentSectionAdminComponent,
    DashboardComponent,
    ConstantsComponent,
    ApproveUsersComponent,
    LogoutUsersComponent,
    ViewLoggedinUsersComponent,
    ReportsComponent,
    BranchesComponent,
    CreateBranchComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DatepickerModule,
    BsDatepickerModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 7000}),
    TooltipModule.forRoot()
  ],
})
export class AdminModule { }
