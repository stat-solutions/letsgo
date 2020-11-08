import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { AlertService } from 'ngx-alerts';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { Observable } from 'rxjs';
import {UsersService} from 'src/app/shared/services/users.service';
// import { BootstrapAlertService, BootstrapAlert } from 'ngx-bootstrap-alert';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registered: boolean;
  submitted:boolean
  errored: boolean;
  userForm: FormGroup;
  loginStatus: string;
  fieldType: boolean;
  value: string;
  stationBalanceExits: boolean;
  mySubscription: any;

  serviceErrors: any = {};
  rolesArray = ['admin', 'application','branchapproval',
   'branchexit','disbusement',
  'loanverification', 'loanentry','loanexit', 'regional', 'legalreview','creditanalysisi', 'headofficeapproval', 'headofficeentry']


  constructor(
    private authService: AuthServiceService,

    private router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private layoutService: LayoutService,
    private userService:UsersService
  ) {}

  ngOnInit() {
    this.userForm = this.createFormGroup();
  }




  createFormGroup() {
    return new FormGroup({

      userEmail: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      userPassword: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          Validators.maxLength(4),
          Validators.minLength(4),
          Validators.required
        ])
      )
    });
  }

  get fval() {
    return this.userForm.controls;
  }

//toggle visibility of password field
    toggleFieldType() {
      this.fieldType = !this.fieldType;
    }

    login() {
    this.submitted = true;
    this.spinner.show()
    if (this.userForm.invalid === true) {
      return;
    } else {
      
      this.authService.loginNormalUser(this.userForm).subscribe((sucess:boolean)=>{
        if(sucess){
          let loginUserRole = jwt_decode(this.authService.getJwtToken()).role
          let findRole = this.rolesArray.find(role=>role.toLowerCase() === loginUserRole.toLowerCase())
          if(findRole){
            this.spinner.hide()
            this.alertService.success({
                html: '<strong>Logged In Successfully</strong>'
            })
            this.router.navigate([findRole+'/dashboard'])
          }
          else{
            this.spinner.hide()
            this.alertService.danger({
              html:'<strong>You dont have any roles</strong>'
            })
          }

        }
        else{
          this.spinner.hide()
          this.alertService.danger({
            html:"<b>Cannot find any information about u</b>"
          })
          
        }
      }),
      (error:string)=>{
        this.spinner.hide()
        console.log(error)
      }

      
      

         }
      
      

   
  }



}


