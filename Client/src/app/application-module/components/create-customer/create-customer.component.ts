import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { CustomValidator } from 'src/app/validators/custom-validator';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
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
  
  documents: Array<any> = [
    {
      id:1, document_type:"NationalID"
    },
    {
      id:2, document_type:"Passport"
    },
    {
      id:3, document_type:"DrivingPermit"
    }
  ]
  defaultLabel:string = "ID Number"
  constructor(
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private fb:FormBuilder,
    private customer:CustomerService
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
      document_type: this.fb.control(
        '',
        Validators.compose([Validators.required],)
      ),
      document_id_number: this.fb.control(
        {value:"", disabled:true},
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([a-zA-Z])([a-zA-Z])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z]))$/,
            { nationalIdCheck: true }
          )
        ])
    ),
      user_contact_two: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          )
        ])
        
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

  checkPhoneNumberMatch():boolean {
    const phoneOne = this.fval.user_contact_number.value;
    const phoneTwo = this.fval.user_contact_two.value
    if (phoneOne === '' && phoneTwo === '') return false
    else {
      if(phoneOne === phoneTwo) return true
    }

  }
  getDocument(doc) {
    const document_type = doc.target.value.split(':')[1]
    this.fval.document_type.setValue(doc.target.value)
    this.defaultLabel = document_type
    this.fval.document_id_number.enable()
  }

  returnHome() {
    this.spinner.hide();
    this.revert();
  }
  setClassInvalid(contact) {
    return {
      'is-invalid': (contact.touched || contact.dirty) && contact.errors,
      'add-border': (contact.touched || contact.dirty) && this.checkPhoneNumberMatch()
    }
  }

  register() {
    console.log(this.userForm)
    
    this.submitted = true;
    
    if (this.userForm.invalid) {
      return this.invalid = true
    }
    else {
      this.spinner.show();
      this.customer.addCustomer(this.userForm.value)
      setTimeout(() => {
        this.returnHome()
        this.router.navigate(['application/customers'])
        
      }, 3000)
      
    }
    // if (this.userForm.invalid === true) {
    //   return this.invalid = true
    //   //return;
    // } else {
      
    //   this.authService.registerUser(this.userForm).subscribe(
    //     () => {
    //       this.posted = true;
    //       this.spinner.hide();
    //       this.alertService.success({
    //         html:
    //           '<b>User customer was added  Successful</b>' +
    //           '</br>' +
    //           'Your Can create laon'
    //       });
    //       setTimeout(() => {
    //         //this.router.navigate(['authpage/login']);
    //       }, 3000);
    //     },
    //     (error: string) => {
    //       this.spinner.hide();
    //       this.errored = true;
    //       this.serviceErrors = error;
    //       this.alertService.danger({
    //         html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
    //       });
    //       setTimeout(() => {
    //         location.reload();
    //       }, 3000);
    //       console.log(error);
    //     }
    //   );

    //     this.registered = true;
    // }
   }

  

}