
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanAdministrativeExitRouting } from './loan-administration-exit-routing.module';
import { AlertModule } from 'ngx-alerts';
import { SharedModule } from '../shared/shared.module';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ReactiveFormsModule } from '@angular/forms';
import { LeftPanelAdminComponent } from './common/left-panel/left-panel-admin.component';
import { RightPanelAdminComponent } from './common/right-panel/right-panel-admin.component';
import { HeaderAdminComponent } from './common/header/header-admin.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ContentSectionAdminComponent } from './content-section/content-section-admin.component';

import { CustomersComponent } from './components/customers/customers.component';
import { ReportsComponent } from './components/reports/reports.component';

import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserTransactionsComponent } from './components/user-transactions/user-transactions.component';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    PagesCoreAdminComponent,
    LeftPanelAdminComponent,
    RightPanelAdminComponent,
    HeaderAdminComponent,
    ContentSectionAdminComponent,
    DashboardComponent,
    CustomersComponent,
    ReportsComponent,
    UserTransactionsComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    LoanAdministrativeExitRouting,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DatepickerModule,
    BsDatepickerModule,
    ModalModule.forRoot(),
    AlertModule.forRoot({maxMessages: 5, timeout: 7000}),
    TooltipModule.forRoot()
  ],
})
export class LoanAdministrationExitModule { }
