import { LandingService } from './../../../shared/services/landing.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { truncate } from 'fs';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss']
})
export class UserTransactionsComponent implements OnInit {
  transactionsTable = []
  forWardedUsers = []
  age = moment(new Date()).format('MM/DD/YYYY, h:mm:ss')
  enableApprove: boolean = false;
  enableDeffered: boolean = false
  usersText: string = "RecievedUsers";
  enableReceive: boolean = false;
  enableReject: boolean = false;
  enableForward:boolean = false;
  constructor(private userTransactions:LandingService) { }

  ngOnInit() {
    setTimeout(() => {
      this.userTransactions.getSpecificCustomers('Application').subscribe(userData => {
       this.transactionsTable = userData.map(eachUser => {
          const oldDate = eachUser.CreatedAt
          const diffInDates = moment(this.age).diff(moment(oldDate))
          const timeInMonths = moment(diffInDates).format('MM [months] DD [days]')
          return { ...eachUser, TotalAge:timeInMonths }
        })

      })
    }, 3000)
    console.log(this.transactionsTable)
  }
  checkTransactionsTable(array: Array<any>) {
    return array.length?true:false
  }
  forward() {
    alert('forwarded')
  }

  approvedLoans() {
    this.enableApprove = true;
    this.enableDeffered = false;
    this.enableForward = false;
    this.enableReject = false;
    this.enableReceive = false;
    this.usersText = "Approved Loans"
    
  }
  defferedLoans() {
    this.enableDeffered = true;
    this.enableApprove = false;
    this.enableForward = false;
    this.enableReject = false;
    this.enableReceive = false;
    this.usersText = "Deffered Loans"
    
  }
  receivedLoans() {
    this.enableApprove = false;
    this.enableDeffered = false;
    this.enableForward = false;
    this.enableReject = false;
    this.enableReceive = true;
    this.usersText = "ReceivedLoans"
  }
  receiveLoan() {
    // this.enableApprove = false;
    // this.enableDeffered = false;
    // this.enableForward = false;
    // this.enableReject = false;
    // this.enableReceive = true;
    
  }
  backLoans() {
    this.enableApprove = false;
    this.enableDeffered = false;
    this.enableForward = false;
    this.enableReject = false;
    this.enableReceive = false;

  }
  rejectedLoans() {
    this.enableApprove = false;
    this.enableDeffered = false;
    this.enableForward = false;
    this.enableReject = true;
    this.enableReceive = false;
    this.usersText = "RejectedLoans"    
  }
  forwardedLoans() {
    this.enableApprove = false;
    this.enableDeffered = false;
    this.enableForward = true;
    this.enableReject = false;
    this.enableReceive = false;
    this.usersText = "ForwardedLoans"    
  }


}

