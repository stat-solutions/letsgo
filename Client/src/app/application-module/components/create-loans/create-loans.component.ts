import { CustomerService } from './../../../shared/services/customer.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { CustomValidator } from 'src/app/validators/custom-validator';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-loans',
  templateUrl: './create-loans.component.html',
  styleUrls: ['./create-loans.component.scss']
})
export class CreateLoansComponent implements OnInit {
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  positionValue: string;
  invalid: boolean = false;
  authService: any;
  loan_types = ['Group', 'SME']
  securities = ['security one', 'security two', 'security 3', 'security 4', 'security 5']


  constructor(private customer:CustomerService, private fb:FormBuilder,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.userForm = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      full_name:this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      loan_type:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      loan_product:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      amount:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),  
      tenure:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),      
      security:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),  
    });
  }

  revert() {
    this.userForm.reset();
  }

  get fval() {
    return this.userForm.controls;
  }
  checkCustomer(customer:string):boolean{
    if (customer !== '' || customer !== null) return false
    else {
      this.customer.getCustomers().subscribe(allcustomer => {
      
        const found = allcustomer.find(customers => customers.name.toLowerCase === customer.toLowerCase)
        if (found) return false
        else return true
      })
    }

    
  }
    

  getLoanType(loan) {
    this.fval.loan_type.setValue(loan.target.value)
  }
  getSecurity(security) {
    this.fval.security.setValue(security.target.value)
  
  }

  returnHome() {
    this.spinner.hide();
    this.revert();
  }

   

  register() {
    console.log(this.userForm)
    
    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return this.invalid = true
      //return;
    } else {
      
     
    }
  }


}
/*
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AlertService } from 'ngx-alerts';
// import { UserRole } from 'src/app/models/user-role';
// import { CompanyPetroStations } from 'src/app/models/company-petro-stations';
// import { TheStations } from 'src/app/models/the-stations';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  positionValue: string;
  invalid: boolean = false;
  
  branch: Array<string> = [
    "Branch One",
    "Branch Two"
  ];

  
  constructor(
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private fb:FormBuilder
  ) {}

  ngOnInit() {
    this.userForm = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      full_name:this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      email: this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.email],)
      ),
      password: this.fb.control(
        '',
        Validators.compose([Validators.required, CustomValidator.patternValidator(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/, { hasNumber: true })])
      ),
      confirm:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),

      branches: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),


      user_contact_number: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          )
        ])
      )
    });
  }

  revert() {
    this.userForm.reset();
  }

  get fval() {
    return this.userForm.controls;
  }
    //toggle visibility of password field
    toggleFieldType() {
      this.fieldType = !this.fieldType;
    }
  matchPasswords():boolean {
    const password = this.fval.password.value;
    const confirmed = this.fval.confirm.value
    if (password !== confirmed) return true
    else return false
  }
  getBranch(branch) {
    this.fval.branches.setValue(branch.target.value)
  }

  returnHome() {
    this.spinner.hide();
    this.revert();

    setTimeout(() => {
      this.router.navigate(['authpage/loginpage']);
    }, 2000);
  }

  register() {
    console.log(this.userForm)
    
    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return this.invalid = true
      //return;
    } else {
      
      this.authService.registerUser(this.userForm).subscribe(
        () => {
          this.posted = true;
          this.spinner.hide();
          this.alertService.success({
            html:
              '<b>User Registration Was Successful</b>' +
              '</br>' +
              'Your Can Login'
          });
          setTimeout(() => {
            this.router.navigate(['authpage/login']);
          }, 3000);
        },
        (error: string) => {
          this.spinner.hide();
          this.errored = true;
          this.serviceErrors = error;
          this.alertService.danger({
            html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
          console.log(error);
        }
      );

        this.registered = true;
    }
  }
}


*/
