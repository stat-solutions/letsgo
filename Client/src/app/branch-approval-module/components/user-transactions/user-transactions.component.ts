import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { LandingService } from './../../../shared/services/landing.service';
import { Component, OnInit , OnChanges, TemplateRef} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { AlertService } from 'ngx-alerts';
import {Router} from '@angular/router'

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss'],
})
export class UserTransactionsComponent implements OnInit {
  //arrays to store data
  receivedLoans = [];
  forwardedLoansFrom = [];
  makeLoansReceived = [];
  makeLoansDeffered = [];
  makeLoansRejected = [];
  makeLoansApproved = [];
  forwardedLoansTo = [];
  approvedLoans = [];
  //create comments
  comment: FormGroup;
  //create defferedloans
  defferTo: FormGroup;
  //array index, arrayid
  arrayId: number;
  arrayIndex: number;
  age = moment(new Date()).format('MM/DD/YYYY, h:mm:ss');
  receiveGroupLoans: FormGroup;
  //booleans
  enableForwardedFrom: boolean = true;
  enableForwardedTo: boolean = false;
  bsModalRef: BsModalRef;
  //disable button
  disableButton: boolean = false;
  levels = ['Application'];

  constructor(
    private userTransactions: LandingService,
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private alertService: AlertService,
    private router: Router
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
        this.defferTo = this.fb.group({
          deffer_reason: ['', Validators.required],
          deffer_to: ['', Validators.required],
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
  //get deffer controls
  get deffer_controls() {
    return this.defferTo.controls;
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
    this.bsModalRef.hide();
  }

  getWhereToDeffer(event) {
    this.deffer_controls.deffer_to.setValue(event.target.value);
  }

  checkTransactionsTable(array: Array<any>) {
    return array.length ? true : false;
  }
  //receive//approve all loans
  receiveAllLoans() {
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

  rejectLoan(template: TemplateRef<any>, id: number, index: number) {
    this.bsModalRef = this.bsModalService.show(template);
    this.makeLoansRejected.push(this.receivedLoans[index]);
    if (this.checkTransactionsTable(this.makeLoansRejected)) {
      this.arrayId = id;
      this.arrayIndex = index;
    }
    // this.onSubmit()
  }
  defferLoan(template: TemplateRef<any>, id: number, index: number) {
    this.bsModalRef = this.bsModalService.show(template);
    this.makeLoansDeffered.push(this.receivedLoans[index]);
    if (this.checkTransactionsTable(this.makeLoansDeffered)) {
      this.arrayIndex = index;
      this.arrayId = id;
    }
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

  onReject(array: Array<any>, id: number, index: number) {
    this.receivedLoans = this.receivedLoans.filter((loans) => loans.Id !== id);
    this.commentControls.user_comments.reset();
    this.makeLoansRejected = [];
    this.closeModal();
    this.alertService.danger('Your loan has been rejected sucessfully');
  }
  onDeffer(array: Array<any>, id, index) {
    this.receivedLoans = this.receivedLoans.filter((loans) => loans.Id !== id);
    const level = this.deffer_controls.deffer_to.value;
    this.deffer_controls.deffer_to.reset();
    this.deffer_controls.deffer_reason.reset();
    this.makeLoansDeffered = [];
    this.closeModal();
    this.alertService.success(
      'Your loan has been deffered  successfully to ' + level
    );
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
      const { Amount } = typeOfLoan;
      //forward all loans to branch exit
      this.alertService.success(
        'Your loan has been forwarded successfully to branch exit'
      );
    }
    this.forwardedLoansTo = [];
  }
}
