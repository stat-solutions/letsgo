import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { LoaningService } from '../../../shared/services/loaning.service';
import { Component, OnInit , OnChanges, TemplateRef} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { AlertService } from 'ngx-alerts';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss'],
})
export class UserTransactionsComponent implements OnInit {
  //arrays to store data
  receivedLoans = [];
  forwardedLoansFrom = [];
  forwardedLoansTo = [];
  makeLoansReceived = [];
  //create comments
  comment: FormGroup;
  //create defferedloans
  defferTo: FormGroup;
  //array index, arrayid
  arrayId: number;
  arrayIndex: number;
  age = moment(new Date()).format('MM/DD/YYYY, h:mm:ss');
  checkAll: boolean = true;
  receiveGroupLoans: FormGroup;
  //booleans
  enableForwardedFrom: boolean = true;
  enableForwardedTo: boolean = false;
  bsModalRef: BsModalRef;
  //disable button
  disableButton: boolean = false;
  levels = ['Application'];

  constructor(
    private userTransactions: LoaningService,
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.userTransactions
      .getSpecificCustomers('Application')
      .subscribe((userData) => {
        this.forwardedLoansFrom = userData.map((eachUser) => {
          const oldDate = eachUser.CreatedAt;
          const diffInDates = moment(this.age).diff(moment(oldDate));
          const timeInMonths = moment(diffInDates).format(
            'MM [months] DD [days]'
          );
          return { ...eachUser, TotalAge: timeInMonths };
        });

        // this.receivedLoans.push(this.forwardedLoansFrom[0])
        this.comment = this.fb.group({
          user_comments: ['', Validators.required],
        });
      });
  }
  //receivedLoansre
  receiveLoans(id: number, index) {
    const removed = this.forwardedLoansFrom.splice(index, 1);
    this.receivedLoans.push(...removed);
    this.enableForwardedFrom = false;
    this.enableForwardedTo = true;
    //console.log(removed)
  }
  //get comment controls
  get commentControls() {
    return this.comment.controls;
  }

  //validate_comments
  validateComments() {
    return {
      'is-invalid':
        (this.commentControls.user_comments.touched ||
          this.commentControls.dirty) &&
        this.commentControls.user_comments.hasError('required'),
      error:
        (this.commentControls.user_comments.touched ||
          this.commentControls.dirty) &&
        this.commentControls.user_comments.hasError('required'),
    };
  }

  //search loan
  getValue(event) {}

  closeModal() {
    this.forwardedLoansTo = [];
    this.bsModalRef.hide();
  }

  checkTransactionsTable(array: Array<any>) {
    return array.length ? true : false;
  }
  //receive//approve all loans
  receiveAllLoans() {
    console.log('received all');
    this.makeLoansReceived.push(...this.forwardedLoansFrom);
    this.receivedLoans.push(...this.makeLoansReceived);
    this.forwardedLoansFrom = [];
    this.disableButton = true;
    this.enableForwardedFrom = false;
    this.enableForwardedTo = true;
  }
  branchApprovalReceivedLoans() {
    this.enableForwardedFrom = false;
    this.enableForwardedTo = true;
  }

  branchApprovalForwardedLoans() {
    this.enableForwardedFrom = true;
    this.enableForwardedTo = false;
  }

  cancel() {
    this.closeModal();
  }
  forwardLoan(template: TemplateRef<any>, id: number, index: number) {
    this.bsModalRef = this.bsModalService.show(template);
    this.forwardedLoansTo.push(this.receivedLoans[index]);
    if (this.checkTransactionsTable(this.forwardedLoansTo)) {
      this.arrayId = id;
      this.arrayIndex = index;
    }
  }

  onForward(array: Array<any>, id, index) {
    this.receivedLoans = this.receivedLoans.filter((loans) => loans.Id !== id);
    this.commentControls.user_comments.reset();
    this.closeModal();
    //forward loan
    if (!this.checkTransactionsTable(this.forwardedLoansTo)) return;
    else {
      //getloan type
      //get loan type
      let typeOfLoan = this.forwardedLoansTo[0];
      console.log(typeOfLoan);
      const { LoanType, Amount } = typeOfLoan;
      if (LoanType.toLowerCase() === 'group') {
        console.log('group');
        //forward to headoffice
        this.alertService.success('Forwarded successfully Head Office Entry');
      } else {
        console.log('sme');
        //push them
        if (Amount > 1000000000) {
          //console.log('greater')
          //forward to regional
          this.alertService.success(
            'Your loan has been forwarded successfully to Regional Approval'
          );
        } else if (Amount < 3000000 && Amount <= 10000000) {
          //do regional branchApprovalForwardedLoans
          this.alertService.success(
            'Your loan has been forwarded successfully to Regional Approval'
          );
        } else {
          //forward to headoffice entry
          this.alertService.success(
            'Your loan has been forwarded successfully to Head Office Entry'
          );
        }
      }
      this.forwardedLoansTo = [];
    }
  }
}
