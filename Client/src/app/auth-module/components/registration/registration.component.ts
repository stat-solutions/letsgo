import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AlertService } from 'ngx-alerts';
import {UserToProveService} from 'src/app/shared/services/user-to-prove.service'
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
  
  branch: Array<string> = [
    "Branch One",
    "Branch Two"
  ];

  
  constructor(
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService,
    private fb:FormBuilder,
    private registerUser:UserToProveService
  ) {}

  ngOnInit() {
    this.userForm = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      userName:this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      userEmail:this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.email],)
      ),
      userPassword: this.fb.control(
        '',
        Validators.compose([Validators.required, CustomValidator.patternValidator(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/, { hasNumber: true })])
      ),
      confirm:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),

      branches: this.fb.control(
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

  returnHome() {

    this.revert();
      this.router.navigate(['authpage/login']);
 
  }

  register() {
    this.submitted = true;
   // this.spinner.show();
    if (this.userForm.invalid === true) {
      return;
    } else {
      this.spinner.show()
      this.authService.registerUser(this.userForm).subscribe(()=>{
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
      }),
      (error: string) => {
          this.spinner.hide();
          this.alertService.danger({
            html: '<b>' + error +'</b>'
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
          console.log(error);
        }
     

         }
      
      

      //   this.registered = true;
    }
}

