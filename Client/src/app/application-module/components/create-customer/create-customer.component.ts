import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
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
  key = "documentId";
  documents: Array<any> = [
    {
      id: 1, document_type: "NATIONAL ID"
    },
    {
      id: 2, document_type: "PASSPORT"
    },
    {
      id: 3, document_type: "DRIVING PERMIT"
    },
    {
      id: 4,
      document_type: "VILLAGE ID"
    }
  ];
  defaultLabel = "ID Number";
  customerIdPhotoUrl: string;
  customerPhotoUrl: string;
  User = this.authService.loggedInUserInfo();

  constructor(
    private authService: AuthServiceService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private customer: CustomerService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.userForm = this.createFormGroup();

  }
  createFormGroup(): any {
    return new FormGroup({
      full_name: this.fb.control(
        "",
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      document_type: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      clientPhotoUrl: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      clientIdPhotoUrl: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      document_id_number: this.fb.control(
        '',
        Validators.compose([
          Validators.required
          // CustomValidator.patternValidator(
          //    /^(([0-9])([0-9])([0-9])([0-0])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
          //   { nationalIdCheck: true }
          // )
        ])
      ),
      user_contact_two: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            { hasNumber: true }
          )
        ])
      ),
      user_contact_number: this.fb.control(
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

  revert(): any {
    this.userForm.reset();
  }

  get fval(): any {
    return this.userForm.controls;
  }

  checkPhoneNumberMatch(): boolean {
    const phoneOne = this.fval.user_contact_number.value;
    const phoneTwo = this.fval.user_contact_two.value;
    if (phoneOne === '' && phoneTwo === '') { return false; }
    else {
      if (phoneOne === phoneTwo) { return true; }
    }

  }

  returnHome(): any {
    this.spinner.hide();
    this.revert();
  }
  setClassInvalid(contact): any {
    return {
      'is-invalid': (contact.touched || contact.dirty) && contact.errors,
      'add-border': (contact.touched || contact.dirty) && this.checkPhoneNumberMatch()
    };
  }
  onFileSelected(event): any {
    // console.log(event.target.id);
    let folder: string;
    switch (event.target.id) {
      case 'clientPhotoUrl':
        folder = 'customerImages/photos-and-ids';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
      case 'clientIdPhotoUrl':
        folder = 'customerImages/photos-and-ids';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
    }
  }
  upload(inputType: string, getfile: any, path: any): any {
    const n = Date.now();
    const file = getfile;
    const filePath = `${path}/${n}`;
    // file ? console.log('true') : console.log('false');
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    const result = task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              switch (inputType) {
                case 'clientPhotoUrl':
                  this.customerPhotoUrl = url;
                  // console.log(this.clientPhotoUrl);
                  break;
                case 'clientIdPhotoUrl':
                  this.customerIdPhotoUrl = url;
                  // console.log(this.clientIdUrl);
                  break;
              }
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          // console.log(url);
        }
      });
  }
  setSelectedChanges(selectedChange: any): any {
    switch (selectedChange) {
      case 'NATIONAL ID':
        this.fval.document_id_number.setValue('');
        this.fval.document_id_number.setValidators([
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]);
        break;
      case 'VILLAGE ID':
        this.fval.document_id_number.setValue('');
        this.fval.document_id_number.setValidators([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(9)
        ]);
        break;
      case 'PASSPORT':
        this.fval.document_id_number.setValue('');
        this.fval.document_id_number.setValidators([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(12)
        ]);
        break;
      case 'DRIVING PERMIT':
        this.fval.document_id_number.setValue('');
        this.fval.document_id_number.setValidators([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]);
        break;
    }
  }

  register(): any {
    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return;
    } else {
      const data = {
        customerName: this.fval.full_name.value.toUpperCase(),
        customerPhone1: this.fval.user_contact_number.value,
        customerPhone2: this.fval.user_contact_two.value === '' ?
          this.fval.user_contact_number.value : this.fval.user_contact_two.value,
        customerIdType: this.fval.document_type.value.toUpperCase(),
        customerIdNumber: this.fval.document_id_number.value.toUpperCase(),
        customerIdPhotoUrl: this.customerIdPhotoUrl,
        customerPhotoUrl: this.customerPhotoUrl,
        customerComment: "I am a new customer",
        branchId: this.User.branchId,
        userId: this.User.userId
      };
      this.customer.addCustomer(data).subscribe(
        res => {
          this.spinner.hide();
          this.posted = true;
          this.alertService.success({
            html: '<b> Customer was created successfully<b>'
          });
          setTimeout(() => {
            this.router.navigate(['application/customers']);
          }, 3000);
          this.revert();
        },
        error => {
          this.spinner.hide();
          this.errored = true;
          this.spinner.hide();
          this.alertService.danger({
            html: error,
          });
        }
      );
    }
  }
}
