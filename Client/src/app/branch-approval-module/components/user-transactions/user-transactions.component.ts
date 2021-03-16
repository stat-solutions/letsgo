import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { LoaningService } from '../../../shared/services/loaning.service';
import { Component, OnInit , OnChanges, TemplateRef} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { AlertService } from 'ngx-alerts';
import {Router} from '@angular/router';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireStorage } from '@angular/fire/storage';
import { CustomValidator } from 'src/app/validators/custom-validator';

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
    this.comment = this.commentForm();
  }
  pageChanged(event): any{
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

  getForwadedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.spinner.show();
    this.userTransactions.getBranchApprovalForwardedLoans(this.User.branchId).subscribe((userData) => {
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
      this.spinner.hide();
    });
  }
  getReceivedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.spinner.show();
    this.userTransactions.getReceivedBranchApprovalLoans(this.User.branchId).subscribe((userData) => {
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
      this.spinner.hide();
    });
  }
  getApprovedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.spinner.show();
    this.userTransactions.getApprovedBranchApprovalLoans(this.User.branchId).subscribe((userData) => {
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
      this.spinner.hide();
    });
  }
  getDefferedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.spinner.show();
    this.userTransactions.getBranchApprovalDefferredLoans(this.User.branchId).subscribe((userData) => {
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
      this.spinner.hide();
    });
  }
  getReceivedDefferedLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.spinner.show();
    this.userTransactions.getReceivedBranchApprovalDefferredLoans(this.User.branchId).subscribe((userData) => {
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
      this.spinner.hide();
    });
  }
  getRectifiedDefferredLoans(): any {
    this.filteredLoans = [];
    this.loanTable = [];
    this.spinner.show();
    this.userTransactions.getRectifiedBranchApprovalDefferredLoans(this.User.branchId).subscribe((userData) => {
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
      this.spinner.hide();
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

  openComment(loan: any, template: TemplateRef<any>, type: string): any {
    this.actionType = type;
    this.actionLoan = loan;
    this.bsModalService.show(template);
  }

  closeModal(): any {
    this.forwardLoansTo = [];
    this.bsModalService.hide();
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
    if (type === 'Forwarded') {
      this.receiveForwaded(data);
    } else {
      this.receiveDefered(data);
    }
  }
  finalizeAction(comment: string): any {
    const data = {
      loanId: this.actionLoan.loanId,
      userId: this.User.userId,
      loanComment: comment.replace(/\n/g, '').toUpperCase()
    };
    this.closeModal();
    switch (this.actionType) {
      case 'Approve':
        this.approveLoan(data);
        break;
      case 'Defer':
        this.deferLoan(data);
        break;
      case 'Reject':
        this.rejectLoan(data);
        break;
      case 'Forward Approved':
        this.forwadApprovedLoan(data);
        break;
      case 'Rectified':
        this.forwadRectified(data);
        break;
      case 'Rectify':
        this.rectifyLoan(data);
        break;
    }
    this.comment.controls.comments.setValue('Missing comment');
  }
  receiveForwaded(data: any): any {
    this.spinner.show();
    this.userTransactions.receiveBranchApprovalForwardedLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getForwadedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Received successfully</b>',
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
    this.userTransactions.receiveBranchApprovalDefferedLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getDefferedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Received successfully</b>',
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
  approveLoan(data: any): any {
    this.spinner.show();
    this.userTransactions.approveBranchApprovalLoans(data).subscribe(
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
    this.userTransactions.deferBranchApprovalLoans(data).subscribe(
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
  rejectLoan(data: any): any {
    this.spinner.show();
    this.userTransactions.rejectBranchApprovalLoans(data).subscribe(
      res => {
        this.posted = true;
        this.getReceivedLoans();
        this.spinner.hide();
        this.alertService.success({
          html: '<b>Loan was rejected successfully</b>',
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
    this.userTransactions.forwardBranchApprovalLoans(data).subscribe(
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
  rectifyLoan(rectifyData: any): any {
    this.spinner.show();
    this.userTransactions.rectifyBranchApprovalDefferedLoans(rectifyData).subscribe(
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
  forwadRectified(data: any): any {
    this.spinner.show();
    this.userTransactions.forwardRectifiedBranchApprovalDefferedLoans(data).subscribe(
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
}
