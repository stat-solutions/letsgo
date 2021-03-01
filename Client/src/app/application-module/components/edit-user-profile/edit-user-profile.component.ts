import { UsersService } from './../../../shared/services/users.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Registration } from 'src/app/shared/models/registration-interface';
import { AlertService } from 'ngx-alerts';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss'],
})
export class EditUserProfileComponent implements OnInit {
  userData: Registration;
  registered = false;
  submitted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  myDateValue: Date;
  positionValue: string;
  branch = ['branch 1', 'branch 2', 'branch 3'];
  bsModalRef: BsModalRef;
  fileInfo = { name: '', size: 0 };
  disableButton = true;
  constructor(
    private EditUser: UsersService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private bsModalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.myDateValue = new Date();
    this.userForm = this.createFormGroup();
    this.disableForm();
  }

  // here
  createFormGroup(): any {
    return this.fb.group(
      {
        full_name: new FormControl(''),
        branches: new FormControl(''),

        email2: new FormControl(''),

        user_contact_number1: new FormControl(
          '',
          Validators.compose([
            CustomValidator.patternValidator(
              /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
              { hasNumber: true }
            ),
          ])
        ),
        user_contact_number2: new FormControl(
          '',
          Validators.compose([
            CustomValidator.patternValidator(
              /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
              { hasNumber: true }
            ),
          ])
        ),
        currentPassword: new FormControl(
          '',
          Validators.compose([
            // 1. Password Field is Required
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

  revert(): any {
    this.userForm.reset();
  }

  get fval(): any {
    return this.userForm.controls;
  }
  disableForm(): any {
    return this.userForm.disable();
  }
  getBranch(event): any {}

  enableEdit(): any {
    return this.userForm.enable();
  }

  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
  }
  returnHome(): any {
    this.spinner.hide();
    this.revert();
  }
  cancel(): any {
    this.userForm.reset();
    return this.userForm.disable();
  }

  setProfileValues(): any {}
  update(template: TemplateRef<any>) {
    this.bsModalRef = this.bsModalService.show(template);
  }
  closeModal() {
    this.bsModalRef.hide();
  }
  //update photo
  onFileChange(event) {
    const file = event.target.files[0];
    console.log(typeof file);
    const { name, size } = file;
    this.fileInfo = { name: name, size: size };
    this.disableButton = false;
    //console.log(this.fileInfo)
  }

  updateProfile() {
    console.log(this.fileInfo);
    let extsAllowed = ['jpg', 'jpeg', 'png'];
    const { name, size } = this.fileInfo;
    let exts = name.split('.')[1];
    console.log(exts);
    let findExt = extsAllowed.find(
      (ext) => ext.toLowerCase() === exts.toLowerCase()
    );
    if (findExt) {
      if (size < 10000000) {
        this.alertService.success('Photo updated successfully');
      } else {
        this.alertService.danger({
          html: '<h4>Invalid File size too big!</h4>',
        });
      }
    } else {
      this.alertService.danger({
        html: '<h4>Invalid File extension!</h4>',
      });
    }
    this.closeModal();
  }
  save() {}
}
