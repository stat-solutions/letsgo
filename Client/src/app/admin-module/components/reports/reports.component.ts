import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  myDateValue: Date;
  positionValue: string;
  reportTypes = [
    { id: 1, reportType: "RunningLoans" },
    { id: 2, reportType: "DisbursedLoans" },
    { id: 3, reportType: "RejectedLoans" },
    { id: 4, reportType: "ApprovedLoans" },
    { id: 2, reportType: "ForwardedLoans" },
    { id: 2, reportType: "ReceivedLoans" },
    { id: 2, reportType: "Comprehensive report" },
  ]
  constructor(private fb :FormBuilder, private spinner:NgxSpinnerService, private router:Router) { }

  ngOnInit() {
    this.myDateValue = new Date();
    this.userForm = this.createFormGroup();
  }
  returnHome() {
    this.spinner.hide();
    this.revert();

    setTimeout(() => {
      this.router.navigate(['authpage/loginpage']);
    }, 2000);
  }

  // createFormGroup() {
  //   return new FormGroup({
  //     date_of_birth:this.fb.control('', Validators.required)
  //   })  
  // }
  // get fval() {
  //   return this.userForm.controls;
  // }
  // revert() {
  //   this.userForm.reset();
  // }
  // register() {
    
  // }
  createFormGroup() {
    return new FormGroup({
      user_contact_number: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          )
        ])
      ),
      start_date: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),

      end_date: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      report_type: this.fb.control(
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
  getReport(branch) {
    this.fval.branches.setValue(branch.target.value)
  }
  register() {
    
  }
  
  


}
