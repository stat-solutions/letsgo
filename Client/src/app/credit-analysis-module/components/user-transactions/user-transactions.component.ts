import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { LoaningService } from 'src/app/shared/services/loaning.service';
import { Component, OnInit , OnChanges, TemplateRef} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { AlertService } from 'ngx-alerts';
import {Router} from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
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
    this.getForwadedLoans();
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
  getForwadedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.userTransactions.getForwardedCreditAnlysisLoans(this.User.branchId).subscribe((userData) => {
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
  getReceivedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.userTransactions.getReceivedCreditAnlysisLoans(this.User.branchId).subscribe((userData) => {
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
  getApprovedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.userTransactions.getApprovedCreditAnlysisLoans(this.User.branchId).subscribe((userData) => {
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
  getDefferedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.userTransactions.getCreditAnlysisDefferredLoans(this.User.branchId).subscribe((userData) => {
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
    this.userTransactions.getReceivedCreditAnlysisDefferredLoans(this.User.branchId).subscribe((userData) => {
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
    this.userTransactions.getRectifiedCreditAnlysisDefferredLoans(this.User.branchId).subscribe((userData) => {
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

  setMaxtenureAndAmount(val: any): any{
    this.loanTypes.forEach(type => {
      if (type.loanThresholdType === val) {
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
  receive(loan: any, category: string, type: string): any{
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
    if (type === 'Forwaded') {
      this.receiveForwaded(data);
    } else {
      this.receiveDefered(data);
    }
  }

  finalizeAction(comment: string): any {
    this.closeModal();
    this.spinner.show();
    const data = {
      loanId: this.actionLoan.loanId,
      userId: this.User.userId,
      loanComment: comment.toUpperCase()
    };
    const deferData = {
      loanId: this.actionLoan.loanId,
      userId: this.User.userId,
      loanComment: comment.toUpperCase(),
      movementStageId: null
    };
    switch (this.actionType) {
      case 'Rectified':
        this.forwadRectified(data);
        break;
      case 'Rectify':
        this.rectifyData.loanComment = comment.toUpperCase();
        this.rectifyLoan(this.rectifyData);
        break;
      case 'Reject':
        this.rejectLoan(data);
        break;
      case 'Approve':
        this.approveLoan(data);
        break;
      case 'Application':
        deferData.movementStageId = 100;
        this.deferLoan(deferData);
        break;
      case 'Branch':
        deferData.movementStageId = 200;
        this.deferLoan(deferData);
        break;
      case 'Forwad Approved':
        this.forwadApprovedLoan(data);
        break;
    }
    this.comment.reset();
    this.spinner.hide();
  }

  receiveForwaded(data: any): any {
    this.spinner.show();
    this.userTransactions.receiveForwardedCreditAnlysisLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getForwadedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Operation was successful</b>',
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
  receiveDefered(data: any): any {
    this.spinner.show();
    this.userTransactions.receiveCreditAnlysisDefferedLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getDefferedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Operation was successful</b>',
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
  forwadRectified(data: any): any {
    this.spinner.show();
    this.userTransactions.forwardRectifiedCreditAnlysisDefferedLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getRectifiedDefferredLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Operation was successful</b>',
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
  forwadApprovedLoan(data: any): any {
    this.spinner.show();
    this.userTransactions.forwardCreditAnlysisLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getApprovedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Operation was successful</b>',
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
    this.userTransactions.rectifyCreditAnlysisDefferedLoans(rectifyData).subscribe(
      res => {
        this.posted = true;
        this.getReceivedDefferedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Operation was successful</b>',
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
  approveLoan(data: any): any {
    this.spinner.show();
    this.userTransactions.approveCreditAnlysisLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getReceivedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Operation was successful</b>',
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
  deferLoan(data: any): any {
    this.spinner.show();
    this.userTransactions.deferCreditAnlysisLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getReceivedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Operation was successful</b>',
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
  rejectLoan(data: any): any {
    this.spinner.show();
    this.userTransactions.rejectCreditAnlysisLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getReceivedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Operation was successful</b>',
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
