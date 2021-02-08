import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { LoaningService } from 'src/app/shared/services/loaning.service';

@Component({
  selector: 'app-createsecurity',
  templateUrl: './createsecurity.component.html',
  styleUrls: ['./createsecurity.component.scss']
})
export class CreatesecurityComponent implements OnInit {

   registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  mySubscription: any;
  positionValue: string;
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
      security: this.fb.control(
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

  onCreate(): any {
    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return;
    } else {
      const data =  {
          userId: this.User.userId,
          loanSecurityType: this.fval.security.value.toUpperCase(),
        };
      this.loan.postCreateLoanSecurityType(data).subscribe(
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
}
