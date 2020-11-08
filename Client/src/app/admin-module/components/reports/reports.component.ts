import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';

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
    { id: 1, reportType: "Running  reports" },
    { id: 2, reportType: "Disbursed reports" },
    { id: 3, reportType: "Rejected reports" },
    { id: 4, reportType: "Approved reports" },
    { id: 2, reportType: "Forwarded reports" },
    { id: 2, reportType: "Received reports" },
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
  createFormGroup() {
    return new FormGroup({
      range_date: new FormControl(
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
    this.fval.report_type.setValue(branch.target.value)
  }
  report() {
    if(this.userForm.invalid){
      return ;
    }
    else{
      //get userForm
      this.userForm.reset()
    }
    
  }
  
  



}
