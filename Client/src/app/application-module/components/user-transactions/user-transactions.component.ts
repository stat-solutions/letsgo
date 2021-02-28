import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LoaningService } from 'src/app/shared/services/loaning.service';
import { Component, OnInit , OnChanges, TemplateRef} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import {AlertService} from 'ngx-alerts';
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

  constructor(
    private userTransactions: LoaningService,
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private bsModalService: BsModalService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.User = this.authService.loggedInUserInfo();
    this.getCreatedLoans();
    this.userTransactions.getAllLoanThresholds().subscribe(thresholds => {
      this.loanTypes = thresholds;
    });
    this.editLoanForm = this.createLoanForm();
    this.comment = this.commentForm();
  }
  pageChanged(event): any{
    this.currentPage = event;
  }
  commentForm(): any {
    return new FormGroup({
        comments: this.fb.control(
          '',
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
    this.userTransactions.getCreatedLoans(this.User.branchId).subscribe((userData) => {
      this.loanTable = userData.map((eachUser) => {
        const oldDate = eachUser.CreatedAt;
        const diffInDates = moment(this.age).diff(moment(oldDate));
        const timeInMonths = moment(diffInDates).format(
          'MM [months] DD [days]'
        );
        return { ...eachUser, TotalAge: timeInMonths };
      });
      this.filteredLoans = this.loanTable;
      this.totalItems = this.filteredLoans.length;
    });
  }
  getdefferedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.userTransactions.getApplicationDefferredLoans(this.User.branchId).subscribe((userData) => {
      this.loanTable = userData.map((eachUser) => {
        const oldDate = eachUser.CreatedAt;
        const diffInDates = moment(this.age).diff(moment(oldDate));
        const timeInMonths = moment(diffInDates).format(
          'MM [months] DD [days]'
        );
        return { ...eachUser, TotalAge: timeInMonths };
      });
      this.filteredLoans = this.loanTable;
      this.totalItems = this.filteredLoans.length;
    });
  }
  getReceivedDefferedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.userTransactions.getApplicationReceivedDefferredLoans(this.User.branchId).subscribe((userData) => {
      this.loanTable = userData.map((eachUser) => {
        const oldDate = eachUser.CreatedAt;
        const diffInDates = moment(this.age).diff(moment(oldDate));
        const timeInMonths = moment(diffInDates).format(
          'MM [months] DD [days]'
        );
        return { ...eachUser, TotalAge: timeInMonths };
      });
      this.filteredLoans = this.loanTable;
      this.totalItems = this.filteredLoans.length;
    });
  }
  getRectifiedDefferredLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.userTransactions.getApplicationRectifiedDefferredLoans(this.User.branchId).subscribe((userData) => {
      this.loanTable = userData.map((eachUser) => {
        const oldDate = eachUser.CreatedAt;
        const diffInDates = moment(this.age).diff(moment(oldDate));
        const timeInMonths = moment(diffInDates).format(
          'MM [months] DD [days]'
        );
        return { ...eachUser, TotalAge: timeInMonths };
      });
      this.filteredLoans = this.loanTable;
      this.totalItems = this.filteredLoans.length;
    });
  }
  createLoanForm(): any {
    return new FormGroup({
      customerName: this.fb.control(
        {value: ''},
        Validators.compose([Validators.required])
      ),
      loanType: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      amount: this.fb.control(
        '',
        Validators.compose([Validators.required,  CustomValidator.patternValidator(/\d/, { hasNumber: true })])
      ),
      tenure: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }
  // search 0726099610 loan
  getValue(event): any {}

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
    switch (this.actionType) {
      case 'Rectified':
        this.commentControls.comments.setValue('Please receive this loan');
        break;
    }
    if (this.actionType !== 'Rectified'){
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
  forwardSelected(loan: any): any {
    const data = {
      loanId: loan.loanId,
      userId: this.User.userId,
      loanComment: "Please receive this customer"
    };
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

  setMaxtenureAndAmount(val: any): any{
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
  checkTenureAndAmount(event: any): any{
    if (event.target.id === 'tenure' && event.target.value > this.maxTenure) {
      this.errored = true;
      this.alertService.danger({
        html: '<b>Tenure should not be greater than ' + this.maxTenure + '<b>'
      });
      this.editControls.tenure.setValue('');
    } else if (event.target.id === 'amount') {
      const amount = parseInt(event.target.value.replace(/[\D\s\._\-]+/g, ''), 10 );
      if ( amount > this.maxAmount) {
        this.errored = true;
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
  receive(loan: any, category: string): any{
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
        this.alertService.danger({
          html: '<b> There was a problem </b>',
        });
      }
    );
  }

  finalizeAction(comment: string): any {
    this.closeModal();
    const data = {
      loanId: this.actionLoan.loanId,
      userId: this.User.userId,
      loanComment: comment.toUpperCase()
    };
    switch (this.actionType) {
      case 'Rectified':
        this.forwadRectified(data);
        break;
      case 'Rectify':
        this.rectifyData.loanComment = comment.toUpperCase();
        this.rectifyLoan(this.rectifyData);
        break;
    }
    this.comment.reset();
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
        this.alertService.danger({
          html: '<b> There was a problem </b>',
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
        this.alertService.danger({
          html: '<b> There was a problem </b>',
        });
      }
    );
  }
  editOrRectify(template: TemplateRef<any>): any{
    if (this.actionType === 'Edit') {
      //
    } else if (this.actionType === 'Rectify'){
      this.bsModalService.show(template);
      this.rectifyData = {
        loanId: this.actionLoan.loanId,
        userId: this.User.userId,
        loanComment: '',
        loanThresholdId: this.loanThresholdId,
        loanAmount: parseInt(this.editControls.amount.value.replace(/[\D\s\._\-]+/g, ''), 10 ),
        loanTenure: this.editControls.tenure.value
      };
    }
  }
}
