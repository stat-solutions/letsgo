import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { LoaningService } from '../../../shared/services/loaning.service';
import { Component, OnInit, OnChanges, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { AlertService } from 'ngx-alerts';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
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
  searchCustomer: any;

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
    this.userTransactions.getForwardedLoanAdministrationVerificationLoans(this.User.branchId).subscribe((userData) => {
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
    this.userTransactions.getReceivedLoanAdministrationVerificationLoans(this.User.branchId).subscribe((userData) => {
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
    this.userTransactions.getApprovedLoanAdministrationVerificationLoans(this.User.branchId).subscribe((userData) => {
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
          loan.customerIdNumber.indexOf(searchTerm.toLowerCase()) !==
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

  openComment(loan: any, template: TemplateRef<any>, type: string): any {
    this.actionType = type;
    this.actionLoan = loan;
    switch (this.actionType) {
      case 'Defer':
        this.commentControls.comments.setValue('Please rectify this loan');
        break;
      case 'Forward Approved':
        this.commentControls.comments.setValue('Please receive this loan');
        break;
    }
    this.bsModalService.show(template);
  }

  closeModal(): any {
    this.forwardLoansTo = [];
    this.bsModalService.hide();
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
    this.userTransactions.receiveForwardedLoanAdministrationVerificationLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getForwadedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b> received successfully</b>',
        });
      },
      err => {
        this.errored = true;
        this.alertService.danger({
          html: '<b> There was a problem </b>',
        });
      }
    );
  }

  finalizeAction(comment: string): any {
    const data = {
      loanId: this.actionLoan.loanId,
      userId: this.User.userId,
      loanComment: comment.toUpperCase()
    };
    this.closeModal();
    switch (this.actionType) {
      case 'Approve':
        this.approveLoan(data);
        break;
      case 'Defer':
        this.deferLoan(data);
        break;
      case 'Forward Approved':
        this.forwadLoan(data);
        break;
    }
    this.comment.reset();
  }
  approveLoan(data: any): any {
    this.spinner.show();
    this.userTransactions.approveLoanAdministrationVerificationLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getReceivedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Loan was approved successfully</b>',
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
  deferLoan(data: any): any {
    this.spinner.show();
    this.userTransactions.deferLoanAdministrationVerificationLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getReceivedLoans();
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
  forwadLoan(data: any): any {
    this.spinner.show();
    this.userTransactions.forwardLoanAdministrationVerificationLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getApprovedLoans();
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
}

