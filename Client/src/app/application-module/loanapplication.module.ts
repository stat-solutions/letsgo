import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './application-routing.module';
import { AlertModule } from 'ngx-alerts';
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
import { CreateLoansComponent } from './components/create-loans/create-loans.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import { UserTransactionsComponent } from './components/user-transactions/user-transactions.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ReportsComponent } from './components/reports/reports.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NgxPaginationModule} from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { TabsModule } from 'ngx-bootstrap/tabs';



@NgModule({
  declarations: [
    PagesCoreAdminComponent,
    LeftPanelAdminComponent,
    RightPanelAdminComponent,
    HeaderAdminComponent,
    ContentSectionAdminComponent,
    DashboardComponent,
    CreateLoansComponent,
    CreateCustomerComponent,
    EditUserProfileComponent,
    UserTransactionsComponent,
    CustomersComponent,
    ReportsComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DatepickerModule,
    BsDatepickerModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    AlertModule.forRoot({ maxMessages: 5, timeout: 7000 }),
    TooltipModule.forRoot(),
    OrderModule,
    TabsModule.forRoot()
  ],
})
export class LoanApplicationModule {}
