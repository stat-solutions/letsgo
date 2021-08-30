import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { BranchesService } from 'src/app/shared/services/branches.service';

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.scss']
})
export class CreateBranchComponent implements OnInit {

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
  entityName = ["Letshego Uganda Limited"];
  branchTypes = [
    { name: 'BRANCH', id: 1200 },
    { name: 'HEAD OFFICE', id: 1100 }
  ];

  constructor(
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private branchService: BranchesService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
  }
  createFormGroup(): any {
    return new FormGroup({
      branchName: this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      branchType: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
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

  createBranch(): any {
    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return this.invalid = true;
    } else {
      const data = {
        branchName: this.fval.branchName.value.toUpperCase(),
        branchTypeCode: this.fval.branchType.value === 'BRANCH' ? 1200 : 1100,
      };
      this.branchService.createBranch(data).subscribe(
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
          this.spinner.hide();
          this.alertService.danger({
            html: error
          });
        }
      );
    }
  }

}
