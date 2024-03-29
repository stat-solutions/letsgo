import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LoaningService } from 'src/app/shared/services/loaning.service';
import { Component, OnInit, OnChanges, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss'],
})
export class UserTransactionsComponent implements OnInit {
  receivedLoans = [];
  forwardLoansTo = [];
  errored = false;
  posted = false;
  filteredReceivedLoans = [];
  age = moment(new Date()).format('MM/DD/YYYY, h:mm:ss');
  bsModalRef: BsModalRef;
  comment: FormGroup;
  editLoanForm: FormGroup;
  User: any;
  filteredLoans: any;
  loanTable: any;
  totalItems: any;
  actionLoan: any;
  actionType: string;
  numberValue: number;
  values: any;
  maxAmount: number;
  maxTenure: number;
  loanThresholdId: number;
  loanTypes: any;
  currentPage = 1;
  pageSize = 10;
  rectifyData: any;
  searchCustomer: any;

  constructor(
    private userTransactions: LoaningService,
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private bsModalService: BsModalService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.User = this.authService.loggedInUserInfo();
    this.getCreatedLoans();
    this.userTransactions.getAllLoanThresholds().subscribe(thresholds => {
      this.loanTypes = thresholds;
    });
    this.editLoanForm = this.createLoanForm();
    this.comment = this.commentForm();
  }
  pageChanged(event): any {
    this.currentPage = event;
  }
  commentForm(): any {
    return new FormGroup({
      comments: this.fb.control(
        'Missing comment',
        Validators.compose([Validators.required])
      ),
    });
  }
  // getcoment controls
  get commentControls(): any {
    return this.comment.controls;
  }
  getCreatedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.spinner.show();
    this.userTransactions.getCreatedLoans(this.User.branchId).subscribe((userData) => {
      this.loanTable = userData;
      this.filteredLoans = userData;
      this.totalItems = this.filteredLoans.length;
      this.spinner.hide();
    });
  }
  getdefferedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.spinner.show();
    this.userTransactions.getApplicationDefferredLoans(this.User.branchId).subscribe((userData) => {
      this.loanTable = userData;
      this.filteredLoans = userData;
      this.totalItems = this.filteredLoans.length;
      this.spinner.hide();
    });
  }
  getReceivedDefferedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.spinner.show();
    this.userTransactions.getApplicationReceivedDefferredLoans(this.User.branchId).subscribe((userData) => {
      this.loanTable = userData;
      this.filteredLoans = userData;
      this.totalItems = this.filteredLoans.length;
      this.spinner.hide();
    });
  }
  getRectifiedDefferredLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.spinner.show();
    this.userTransactions.getApplicationRectifiedDefferredLoans(this.User.branchId).subscribe((userData) => {
      this.loanTable = userData;
      this.filteredLoans = userData;
      this.totalItems = this.filteredLoans.length;
      this.spinner.hide();
    });
  }
  createLoanForm(): any {
    return new FormGroup({
      customerName: this.fb.control(
        { value: '' },
        Validators.compose([Validators.required])
      ),
      loanType: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      amount: this.fb.control(
        '',
        Validators.compose([Validators.required, CustomValidator.patternValidator(/\d/, { hasNumber: true })])
      ),
      tenure: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }
  // search 0726099610 loan
  getValue(event): any {
    this.searchCustomer = event.target.value;
    if (event.target.value === '') {
      this.filteredLoans = this.loanTable;
      this.totalItems = this.filteredLoans.length;
    } else {
      this.filteredLoans = this.filterCustomer(this.searchCustomer);
      this.totalItems = this.filteredLoans.length;
    }
  }
  filterCustomer(searchTerm: string): any {
    if (searchTerm) {
      return this.filteredLoans.filter(
        (loan) =>
          loan.loanId.toString().indexOf(searchTerm) !==
          -1 ||
          loan.loanAmount.toString().indexOf(searchTerm) !==
          -1 ||
          loan.customerIdNumber.indexOf(searchTerm) !==
          -1 ||
          loan.customerIdType.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          loan.customerName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          loan.loanThresholdType.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
          -1 ||
          loan.loanThresholdProduct.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
          || loan.loanOriginatingBranch.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
          || loan.movementStage.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    }
  }


  get editControls(): any {
    return this.editLoanForm.controls;
  }

  setClassInvalid(contact): any {
    return {
      'is-invalid': (contact.touched || contact.dirty) && contact.errors,
    };
  }
  onKey(event: any): any {
    // without type info
    this.values = event.target.value.replace(/[\D\s\._\-]+/g, '');

    this.numberValue = this.values ? parseInt(this.values, 10) : 0;

    // tslint:disable-next-line:no-unused-expression
    this.values = this.numberValue === 0 ? '' : this.numberValue.toLocaleString('en-US');
    this.editControls.amount.setValue(this.values);
  }

  openComment(loan: any, template: TemplateRef<any>, type: string): any {
    this.actionType = type;
    this.actionLoan = loan;
    if (this.actionType !== 'Rectified') {
      const { customerName, loanThresholdType, loanTenure, loanAmount } = loan;
      this.setMaxtenureAndAmount(loanThresholdType);
      this.editControls.customerName.setValue(customerName);
      this.editControls.customerName.disable();
      this.editControls.loanType.setValue(loanThresholdType);
      this.editControls.tenure.setValue(loanTenure);
      this.numberValue = loanAmount ? parseInt(loanAmount, 10) : 0;
      // tslint:disable-next-line:no-unused-expression
      this.values = this.numberValue === 0 ? '' : this.numberValue.toLocaleString('en-US');
      this.editControls.amount.setValue(this.values);
      this.bsModalService.show(template);
    } else {
      this.bsModalService.show(template);
    }
  }

  closeModal(): any {
    this.bsModalService.hide();
  }


  // forwared selected loan
  forwardSelected(data: any): any {
    this.userTransactions.forwardApplicationLoans(data).subscribe(
      res => {
        this.posted = true;
        this.alertService.success({
          html: '<b>' + res[0].theResponseStage.toUpperCase() + '</b>',
        });
        this.getCreatedLoans();
      }
    );
  }

  setMaxtenureAndAmount(val: any): any {
    // console.log(val);
    this.loanTypes.forEach(type => {
      if (type.loanThresholdType === val) {
        // console.log(type);
        this.maxTenure = type.loanThresholdMaxTenure;
        this.maxAmount = type.loanThresholdMaxAmount;
        this.loanThresholdId = type.loanThresholdId;
        this.editControls.tenure.setValue('');
        this.editControls.amount.setValue('');
      }
    });
  }
  checkTenureAndAmount(event: any): any {
    if (event.target.id === 'tenure' && event.target.value > this.maxTenure) {
      this.errored = true;
      this.spinner.hide();
      this.alertService.danger({
        html: '<b>Tenure should not be greater than ' + this.maxTenure + '<b>'
      });
      this.editControls.tenure.setValue('');
    } else if (event.target.id === 'amount') {
      const amount = parseInt(event.target.value.replace(/[\D\s\._\-]+/g, ''), 10);
      if (amount > this.maxAmount) {
        this.errored = true;
        this.spinner.hide();
        this.alertService.danger({
          html: '<b>Amount should not be greater than ' + this.maxAmount + '<b>'
        });
        this.editControls.amount.setValue('');
      } else {
        return;
      }
    }
  }
  // receive defered
  receive(loan: any, category: string): any {
    const data = [];
    this.spinner.show();
    if (category === 'One') {
      data.push({
        loanId: loan.loanId,
        userId: this.User.userId,
        branchId: this.User.branchId
      });
    } else if (category === 'All') {
      this.filteredLoans.forEach(ln => {
        data.push({
          loanId: ln.loanId,
          userId: this.User.userId,
          branchId: this.User.branchId
        });
      });
    }
    this.userTransactions.receiveApplicationDefferedLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getdefferedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>received successfully</b>',
        });
      },
      err => {
        this.errored = true;
        this.spinner.hide();
        this.spinner.hide();
        this.alertService.danger({
          html: err,
        });
      }
    );
  }

  finalizeAction(comment: string): any {
    this.closeModal();
    const data = {
      loanId: this.actionLoan.loanId,
      userId: this.User.userId,
      loanComment: comment.replace(/\n/g, '').toUpperCase()
    };
    switch (this.actionType) {
      case 'Forward':
        this.forwardSelected(data);
        break;
      case 'Rectified':
        this.forwadRectified(data);
        break;
      case 'Rectify':
        this.rectifyData.loanComment = comment.toUpperCase();
        this.rectifyLoan(this.rectifyData);
        break;
    }
    this.comment.controls.comments.setValue('Missing comment');
  }

  forwadRectified(data: any): any {
    this.spinner.show();
    this.userTransactions.forwardApplicationRectifiedDefferedLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getRectifiedDefferredLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>' + res[0].theResponseStage.toUpperCase() + '</b>',
        });
      },
      err => {
        this.errored = true;
        this.spinner.hide();
        this.spinner.hide();
        this.alertService.danger({
          html: err,
        });
      }
    );
  }
  rectifyLoan(rectifyData: any): any {
    this.spinner.show();
    this.userTransactions.rectifyApplicationDefferedLoans(rectifyData).subscribe(
      res => {
        this.posted = true;
        this.getReceivedDefferedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Loan was rectified successfully</b>',
        });
      },
      er => {
        this.errored = true;
        this.spinner.hide();
        this.spinner.hide();
        this.alertService.danger({
          html: er,
        });
      }
    );
  }
  editOrRectify(template: TemplateRef<any>): any {
    if (this.actionType === 'Edit') {
      //
    } else if (this.actionType === 'Rectify') {
      this.bsModalService.show(template);
      this.rectifyData = {
        loanId: this.actionLoan.loanId,
        userId: this.User.userId,
        loanComment: '',
        loanThresholdId: this.loanThresholdId,
        loanAmount: parseInt(this.editControls.amount.value.replace(/[\D\s\._\-]+/g, ''), 10),
        loanTenure: this.editControls.tenure.value
      };
    }
  }
}
