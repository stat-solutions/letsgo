import { CustomerService } from './../../../shared/services/customer.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { LoaningService } from 'src/app/shared/services/loaning.service';
import { AlertService } from 'ngx-alerts';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
@Component({
  selector: 'app-create-loans',
  templateUrl: './create-loans.component.html',
  styleUrls: ['./create-loans.component.scss'],
})
export class CreateLoansComponent implements OnInit {
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  securityForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  positionValue: string;
  invalid = false;
  error = false;
  loanTypes = [];
  securities = [];
  securityNames = [];
  checkAllSecurities = true;
  bsModal: BsModalRef;
  searchTerm: string;
  currentPage = 1;
  totalItems: number;
  pageSize = 12;
  key = 'documentId';
  customerData = [];
  filteredCustomers = [];
  searchCustomer: string;
  reverse = false;
  currentCustomer: any;
  maxTenure: number;
  maxAmount: number;
  loanThresholdId: number;
  securityDetails = [];
  securityPhotoUrl: string;
  User: any;
  values: any;
  numberValue: any;

  constructor(
    private customer: CustomerService,
    private loaning: LoaningService,
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private storage: AngularFireStorage,
    private alertService: AlertService,
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): any {
    this.userForm = this.createFormGroup();
    this.securityForm = this.createSecurityFormGroup();
    this.fval.full_name.setValue('');
    this.customer.getAllCustomers().subscribe((customers) => {
      this.customerData = customers;
      this.filteredCustomers = this.customerData;
      this.totalItems = this.customerData.length;
    });
    this.loaning.getAllLoanThresholds().subscribe((thresholds) => {
      this.loanTypes = thresholds;
    });
    this.loaning.getLoanSecurityType().subscribe((res) => {
      for (const i of res) {
        // console.log(i);
        // this.securityNames.push(i.securityTypeName.toUpperCase());
        this.securities.push(i);
      }
    });
    this.User = this.authService.loggedInUserInfo();
  }
  createFormGroup(): any {
    return new FormGroup({
      full_name: this.fb.control(
        { value: '' },
        Validators.compose([Validators.required])
      ),
      loan_type: this.fb.control('', Validators.compose([Validators.required])),
      comment: this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.maxLength(30)])
      ),
      amount: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
        ])
      ),
      tenure: this.fb.control('', Validators.compose([Validators.required])),
    });
  }
  createSecurityFormGroup(): any {
    return new FormGroup({
      securityType: this.fb.control('', Validators.compose([Validators.required])),
      securityName: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      securityLocation: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      securityPhotoUrl: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }
  onFileSelected(event): any {
    let folder: string;
    switch (event.target.id) {
      case 'securityPhotoUrl':
        folder = 'loans/securities';
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
          downloadURL.subscribe((url) => {
            if (url) {
              switch (inputType) {
                case 'securityPhotoUrl':
                  this.securityPhotoUrl = url;
                  break;
              }
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          // console.log(url);
        }
      });
  }
  onKey(event: any): any {
    // without type info
    this.values = event.target.value.replace(/[\D\s\._\-]+/g, '');

    this.numberValue = this.values ? parseInt(this.values, 10) : 0;

    // tslint:disable-next-line:no-unused-expression
    this.values =
      this.numberValue === 0 ? '' : this.numberValue.toLocaleString('en-US');
    this.fval.amount.setValue(this.values);
  }
  addSecurity(): any {
    this.spinner.show();
    setTimeout(() => {
      const security = {
        securityTypeCode: this.securityForm.controls.securityType.value,
        loanSecurityName: this.securityForm.controls.securityName.value.toUpperCase(),
        loanSecurityLocation: this.securityForm.controls.securityLocation.value.toUpperCase(),
        loanSecurityPhotoUrl: this.securityPhotoUrl,
      };

      if (security.securityTypeCode != null) {
        this.securityDetails.push(security);
        this.securityForm.reset();
        this.posted = true;
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Security added successfully<b>',
        });
      } else {
        this.errored = true;
        this.spinner.hide();
        this.spinner.hide();
        this.alertService.danger({
          html: '<b>Security Type selected is not correct<b>',
        });
      }
    }, 3000);
  }
  checkSecurityType(val: string): any {
    if (val === 'Select Loan Type') {
      // this.securityForm.controls.securityType.invalid = true;
    }
  }
  finishSecurity(): any {
    this.spinner.show();
    setTimeout(() => {
      const security = {
        securityTypeCode: this.securityForm.controls.securityType.value,
        loanSecurityName: this.securityForm.controls.securityName.value.toUpperCase(),
        loanSecurityLocation: this.securityForm.controls.securityLocation.value.toUpperCase(),
        loanSecurityPhotoUrl: this.securityPhotoUrl,
      };
      if (security.securityTypeCode != null) {
        this.securityDetails.push(security);
        this.securityForm.reset();
        this.closeModal();
        this.posted = true;
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Security added successfully<b>',
        });
      } else {
        this.errored = true;
        this.spinner.hide();
        this.spinner.hide();
        this.alertService.danger({
          html: '<b>Security Type selected is not correct<b>',
        });
      }
    }, 3000);
  }
  setMaxtenureAndAmount(val: any): any {
    // console.log(val);
    this.loanTypes.forEach((type) => {
      if (type.loanThresholdType === val) {
        // console.log(type);
        this.maxTenure = type.loanThresholdMaxTenure;
        this.maxAmount = type.loanThresholdMaxAmount;
        this.loanThresholdId = type.loanThresholdId;
        this.fval.tenure.setValue('');
        this.fval.amount.setValue('');
      }
    });
  }
  checkTenureAndAmount(event: any): any {
    // tslint:disable-next-line: radix
    // console.log(parseInt(event.target.value.replace(/[\D\s\._\-]+/g, '')));
    if (event.target.id === 'tenure' && event.target.value > this.maxTenure) {
      this.errored = true;
      this.spinner.hide();
      this.alertService.danger({
        html: '<b>Tenure should not be greater than ' + this.maxTenure + '<b>',
      });
      this.fval.tenure.setValue('');
    } else if (event.target.id === 'amount') {
      const amount = parseInt(
        event.target.value.replace(/[\D\s\._\-]+/g, ''),
        10
      );
      if (amount > this.maxAmount) {
        this.errored = true;
        this.spinner.hide();
        this.alertService.danger({
          html:
            '<b>Amount should not be greater than ' + this.maxAmount + '<b>',
        });
        this.fval.amount.setValue('');
      } else {
        return;
      }
    }
  }
  revert(): any {
    this.userForm.reset();
  }

  get fval(): any {
    return this.userForm.controls;
  }
  checkCustomer(customer: any): any {
    this.currentCustomer = customer;
    this.fval.full_name.setValue(this.currentCustomer.customerName);
    this.fval.full_name.disable();
    this.searchTerm = '';
    this.closeModal();
  }
  closeModal(): any {
    this.bsModal.hide();
  }

  returnHome(): any {
    this.spinner.hide();
    this.revert();
  }
  register(): any {
    this.spinner.show();
    const data = [];
    data.push({
      customerId: this.currentCustomer.customerId,
      loanThresholdId: this.loanThresholdId,
      loanAmount: parseInt(
        this.fval.amount.value.replace(/[\D\s\._\-]+/g, ''),
        10
      ),
      loanTenure: this.fval.tenure.value,
      comment: this.fval.comment.value.toUpperCase(),
      userId: this.User.userId,
      branchId: this.User.branchId,
    });
    if (this.securityDetails.length > 0) {
      data.push(this.securityDetails);
    }
    // console.log(data);
    this.loaning.postCreateLoan(data).subscribe(
      (res) => {
        if (res) {
          this.posted = true;
          this.userForm.reset();
          this.spinner.hide();
          this.alertService.success({
            html: '<b>Loan was created successfully<b>',
          });
        }
      },
      (err) => {
        this.spinner.hide();
        this.alertService.success({
          html: '<b>There was a problem<b>',
        });
      }
    );
  }
  // sort in ascending order

  sort(item: string): any {
    this.key = item;
    this.reverse = !this.reverse;
  }

  openModal(template: TemplateRef<any>): any {
    this.bsModal = this.bsModalService.show(
      template,
      Object.assign({}, { class: 'modal-xl modal-dialog-center' })
    );
  }
  openModal2(template: TemplateRef<any>): any {
    this.bsModal = this.bsModalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-center' })
    );
  }

  checkTable(array: Array<any>): any {
    return array.length ? true : false;
  }

  // searching
  getValue(event): any {
    console.log(event.target.value);
    this.searchCustomer = event.target.value;
    if (event.target.value === '') {
      this.filteredCustomers = this.customerData;
      this.totalItems = this.filteredCustomers.length;
    } else {
      this.filteredCustomers = this.filterCustomer(this.searchCustomer);
      this.totalItems = this.filteredCustomers.length;
    }
  }
  filterCustomer(searchTerm: string): any {
    if (searchTerm) {
      return this.filteredCustomers.filter(
        (customer) =>
          customer.customerName
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) !== -1
      );
    }
  }
  // searching
  getCustomerName(id: number): any {
    const customerNames = this.customerData.find(
      (customer) => customer.customerId === id
    );
    const { customerName } = customerNames;
    this.fval.full_name.setValue(customerName);
    this.searchTerm = '';
    this.filteredCustomers = this.customerData;
    this.totalItems = this.filteredCustomers.length;
    this.closeModal();
  }
  pageChanged(event): any {
    this.currentPage = event;
  }
}
