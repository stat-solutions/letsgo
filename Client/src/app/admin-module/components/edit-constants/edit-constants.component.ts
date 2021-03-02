import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoaningService } from 'src/app/shared/services/loaning.service';
import { AlertService } from 'ngx-alerts';
@Component({
  selector: 'app-constants',
  templateUrl: './edit-constants.component.html',
  styleUrls: ['./edit-constants.component.scss']
})
export class EditConstantsComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  values: any;
  numberValue: any;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  positionValue: string;
  invalid = false;
  User = this.authService.loggedInUserInfo();
  constant: any;

  constructor(
    private authService: AuthServiceService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private loan: LoaningService
  ) {}

  ngOnInit(): void {
    this.constant = this.loan.getEditConstant();
    this.userForm = this.createFormGroup();
    this.fval.loan_type.setValue(this.constant.loanThresholdType);
    this.fval.threshold.setValue(this.constant.loanThresholdTime);
    this.fval.tenure.setValue(this.constant.loanThresholdMaxTenure);
    this.numberValue = this.constant.loanThresholdMaxAmount ? parseInt(this.constant.loanThresholdMaxAmount, 10) : 0;
    // tslint:disable-next-line:no-unused-expression
    this.values = this.numberValue === 0 ? '' : this.numberValue.toLocaleString('en-US');
    this.fval.maximum_amount.setValue(this.values);
    this.fval.loan_product.setValue(this.constant.loanThresholdProduct);
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

  returnHome(): any {
    this.spinner.hide();
    this.revert();
  }
  onKey(event: any): any {
    // without type info
    this.values = event.target.value.replace(/[\D\s\._\-]+/g, '');

    this.numberValue = this.values ? parseInt(this.values, 10) : 0;

    // tslint:disable-next-line:no-unused-expression
    this.values = this.numberValue === 0 ? '' : this.numberValue.toLocaleString('en-US');
    this.fval.maximum_amount.setValue(this.values);
  }
  save(): any{
    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return this.invalid = true;
    } else {
      const data =  {
          loanThresholdId: this.constant.loanThresholdId,
          userId: this.User.userId,
          loanThresholdType: this.fval.loan_type.value.toUpperCase(),
          loanThresholdProduct: this.fval.loan_product.value.toUpperCase(),
          loanThresholdMaxAmount: parseInt(this.fval.maximum_amount.value.replace(/[\D\s\._\-]+/g, ''), 10 ),
          loanThresholdMaxTenure: this.fval.tenure.value,
          loanThresholdTime: this.fval.threshold.value
        };
      this.loan.putUpdateLoanThresholds(data).subscribe(
        res => {
          this.spinner.hide();
          this.posted = true;
          this.alertService.success({
            html: '<b> Threshold was edited successfully<b>'
          });
          setTimeout(() => {
            this.loan.deleteEditConstant();
            this.router.navigate(['admin/constantstable']);
          }, 3000);
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
}
