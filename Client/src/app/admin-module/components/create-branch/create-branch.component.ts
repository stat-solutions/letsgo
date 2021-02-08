import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

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
    {name: "BRANCH", id: 300},
    {name: "HEAD OFFICE", id: 300},
    {name: "R", id: 300},
    {name: "BRANCH", id: 300},
  ];

  constructor(
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder
  ) {}

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
        branchName: this.fval.branchName.value,
        branchType: this.fval.branchType.value
      };
      // this.authService.registerUser(this.userForm).subscribe(
      //   () => {
      //     this.posted = true;
      //     this.spinner.hide();
      //     setTimeout(() => {
      //       this.router.navigate(['authpage/login']);
      //     }, 3000);
      //   },
      //   (error: string) => {
      //     this.spinner.hide();
      //     this.errored = true;
      //     this.serviceErrors = error;
      //     setTimeout(() => {
      //       location.reload();
      //     }, 3000);
      //     console.log(error);
      //   }
      // );
      this.registered = true;
    }
  }

}
