import { LandingService } from './../../../shared/services/landing.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss']
})
export class UserTransactionsComponent implements OnInit {
  transactionsTable = []
  age = moment(new Date()).format('MM/DD/YYYY, h:mm:ss')
  enableReceive: boolean = false;
  loanText: string;

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
  receivedLoans() {
    this.enableReceive = true;
    this.loanText = "ReceivedLoans"
  }
  backToLoans(){
    this.enableReceive = false;
  }


}
