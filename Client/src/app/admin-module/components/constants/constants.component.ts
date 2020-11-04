import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-constants',
  templateUrl: './constants.component.html',
  styleUrls: ['./constants.component.scss']
})
export class ConstantsComponent implements OnInit {
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
    "GroupLoan",
    "SME Loans"
  ];

  constructor(
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb:FormBuilder
  ) {}

  ngOnInit() {
    this.userForm = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      loan_type:this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      threshold: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      tenure: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      maximum_amount:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      loan_product:this.fb.control(
        '',
        Validators.compose([Validators.required])
      )
    });
  }

  revert() {
    this.userForm.reset();
  }

  get fval() {
    return this.userForm.controls;
  }
    
  matchPasswords():boolean {
    const password = this.fval.password.value;
    const confirmed = this.fval.confirm.value
    if (password !== confirmed) return true
    else return false
  }


  returnHome() {
    this.spinner.hide();
    this.revert();
  }

  save() {
    console.log(this.userForm)

    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return this.invalid = true
      //return;
    } else {

         //get data and send to back end

        this.registered = true;
    }
  }
  createSecurity(){
    this.router.navigate(['admin/createsecurity'])
  }
  viewConstants(){
    this.router.navigate(['admin/constantstable'])

  }


}
