import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoaningService } from 'src/app/shared/services/loaning.service';
import { AlertService } from 'ngx-alerts';
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
  invalid = false;
  User = this.authService.loggedInUserInfo();

  constructor(
    private authService: AuthServiceService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private loan: LoaningService
  ) {}

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
  }
  createFormGroup(): any {
    return new FormGroup({
      loan_type: this.fb.control(
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
      maximum_amount: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      loan_product: this.fb.control(
        '',
        Validators.compose([Validators.required])
      )
    });
  }

  revert(): any {
    this.userForm.reset();
  }

  get fval(): any {
    return this.userForm.controls;
  }

  matchPasswords(): boolean {
    const password = this.fval.password.value;
    const confirmed = this.fval.confirm.value;
    if (password !== confirmed) { return true; }
    else { return false; }
  }


  returnHome(): any {
    this.spinner.hide();
    this.revert();
  }

  save(): any{
    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return this.invalid = true;
    } else {
      const data =  {
          userId: this.User.userId,
          loanThresholdType: this.fval.loan_type.value.toUpperCase(),
          loanThresholdProduct: this.fval.loan_product.value.toUpperCase(),
          loanThresholdMaxAmount: this.fval.maximum_amount.value,
          loanThresholdMaxTenure: this.fval.tenure.value,
          loanThresholdTime: this.fval.threshold.value
        };
      this.loan.postCreateLoanThreshold(data).subscribe(
        res => {
          this.spinner.hide();
          this.posted = true;
          this.alertService.success({
            html: '<b> Operation was Successful<b>'
          });
          this.revert();
        },
        error => {
          this.spinner.hide();
          this.errored = true;
          this.alertService.danger({
            html: '<b> There was a problem<b>'
          });
        }
      );
    }
  }
  createSecurity(): any{
    this.router.navigate(['admin/createsecurity']);
  }
  viewConstants(): any{
    this.router.navigate(['admin/constantstable']);
  }
}
