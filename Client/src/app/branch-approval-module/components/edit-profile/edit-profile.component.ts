import { UsersService } from 'src/app/shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userData: { id: number, name: string, photo: string, password: string, status: string, branch: string, email: string, contact:string }
  registered = false;
  submitted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  myDateValue: Date;
  positionValue: string;
  branch = ["branch 1", "branch 2", "branch 3"]

  constructor(private EditUser:UsersService, private fb:FormBuilder,

    private router: Router, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.userData = this.EditUser.getSpecificUser('katznicho@gmail.com')
    this.myDateValue = new Date();
    this.userForm = this.createFormGroup();
    this.disableForm();
    console.log(this.userData)
  }

  //here
  createFormGroup() {
    return this.fb.group({
      full_name: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      branches: new FormControl('',Validators.required),

      email2: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),

      user_contact_number1: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          )
        ])
      ),
      currentPassword: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required

          Validators.required,

          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9]))$/,
            {
              hasNumber: true,
            }
          ),
          // 3. check whether the entered password has upper case letter
          // CustomValidatorInitialCompanySetup.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          // CustomValidatorInitialCompanySetup.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          // CustomValidatorInitialCompanySetup.
          //   patternValidator(/[!@#$%^&*_+-=;':"|,.<>/?/<mailto:!@#$%^&*_+-=;':"|,.<>/?]/, { hasSpecialCharacters: true }),

          // 6. Has a length of exactly 4 digits
          Validators.minLength(4),
          Validators.maxLength(4),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required

          Validators.required,

          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9]))$/,
            {
              hasNumber: true,
            }
          ),
          // 3. check whether the entered password has upper case letter
          // CustomValidatorInitialCompanySetup.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          // CustomValidatorInitialCompanySetup.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          // CustomValidatorInitialCompanySetup.
          //   patternValidator(/[!@#$%^&*_+-=;':"|,.<>/?/<mailto:!@#$%^&*_+-=;':"|,.<>/?]/, { hasSpecialCharacters: true }),

          // 6. Has a length of exactly 4 digits
          Validators.minLength(4),
          Validators.maxLength(4),
        ])
      ),
      confirmPassword: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required

          Validators.required,

          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9]))$/,
            {
              hasNumber: true,
            }
          ),
          // 6. Has a length of exactly 4 digits
          Validators.minLength(4),
          Validators.maxLength(4),
        ])
      ),
    },
    { validator: CustomValidator.passwordMatchValidator }
    );
  }

  revert() {
    this.userForm.reset();
  }

  get fval() {
    return this.userForm.controls;
  }
  disableForm () {
    return this.userForm.disable()
  }
  getBranch(event) {

  }

  enableEdit() {
    this.fval.full_name.setValue(this.userData.name)
    this.fval.email2.setValue(this.userData.email)
    this.fval.user_contact_number1.setValue(this.userData.contact)
    this.fval.branches.setValue(this.userData.branch)
    return this.userForm.enable()
  }

  //toggle visibility of password field
    toggleFieldType() {
      this.fieldType = !this.fieldType;
    }
  returnHome() {
    this.spinner.hide();
    this.revert();

    // setTimeout(() => {
    //   this.router.navigate(['authpage/loginpage']);
    // }, 2000);
  }

  setProfileValues () {

  }
  save () {

  }




  //here


}
