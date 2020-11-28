import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AlertService } from 'ngx-alerts';
import {UserToProveService} from 'src/app/shared/services/user-to-prove.service'
import { BranchesService } from 'src/app/shared/services/branches.service';
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
  branches: any;

  
  constructor(
    private authService: AuthServiceService,
    private branchService: BranchesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private fb:FormBuilder,
    private registerUser:UserToProveService
  ) {}

  ngOnInit() {
    this.userForm = this.createFormGroup();
    this.getBranches();
  }
  createFormGroup() {
    return new FormGroup({
      userName:this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      userEmail:this.fb.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        // Validators.compose([Validators.required, Validators.email],)
      ),
      userPassword: this.fb.control(
        '',
        Validators.compose([Validators.required, CustomValidator.patternValidator(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/, { hasNumber: true })])
      ),
      confirm:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),

      branch: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),


      userNumber: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          )
        ])
      ),
      userNumber2: this.fb.control(
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
    //toggle visibility of userPassword field
    toggleFieldType() {
      this.fieldType = !this.fieldType;
    }
  matchPasswords():boolean {
    const userPassword = this.fval.userPassword.value;
    const confirmed = this.fval.confirm.value
    if (userPassword !== confirmed) return true
    else return false
  }
  getBranch(branch) {
    this.fval.branches.setValue(branch.target.value)
  }
  getBranches() {
    this.branchService.getAllBranches().subscribe(
      res => {
        this.branches = res;
        // branchId: 500
        // branchName: "HEAD OFFICE"
        // branchType: "HEAD OFFICE"
        // fkCompanyIdBranch: 500
        // console.log(this.branches);
      },
      err => console.log(err)
    );
  }

  returnHome() {

    this.revert();
      this.router.navigate(['authpage/login']);
 
  }

  register() {
    this.submitted = true;
    if (this.userForm.invalid === true) {
      return;
    } else {
      this.spinner.show()
      let data = {
          userName: this.fval.userName.value.toUpperCase(),
          userEmail: this.fval.userEmail.value,
          userPhone1: this.fval.userNumber.value,
          userPhone2: this.fval.userNumber2.value,
          userPassword: this.fval.userPassword.value,
          branchId: null
      };
      this.branches.forEach(branch => {
        if (branch.branchName.toUpperCase() === this.fval.branch.value){
          data.branchId = branch.branchId;
        }
      })
      // console.log(data);
      this.authService.registerUser(data).subscribe(
        ()=> {
          this.spinner.hide();
            this.alertService.success({
              html:
                '<b>User Registration Was Successful</b>' +
                '</br>' +
                'Your Can Login'
            });
            setTimeout(() => {
              this.router.navigate(['authpage/login']);
            }, 2000)
          },
        (error: string) => {
          this.spinner.hide();
          this.alertService.danger({
            html: '<b>' + error +'</b>'
          });
          console.log(error);
        });
      }
    }
}

