import { UsersService } from './services/users.service';
import { UserToProveService } from './services/user-to-prove.service';
import { CustomerService } from './services/customer.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutService } from './services/layout.service';
import { MenudropdownDirective } from './directives/menudropdown.directive';
import { AuthServiceService } from './services/auth-service.service';
import { BranchesService } from './services/branches.service';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [
    MenudropdownDirective,
    
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    MenudropdownDirective
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        LayoutService,
        CustomerService,
        UserToProveService,
        UsersService,
        AuthServiceService,
        BranchesService,
        InterceptorService
      ]
    };
  }
}
