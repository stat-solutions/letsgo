import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { LandingService } from 'src/app/shared/services/landing.service';
@Component({
  selector: 'app-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loanTable = []

  age = moment(new Date()).format('MM/DD/YYYY, h:mm:ss')
  
  constructor(private landingPage:LandingService) { }

  ngOnInit() {
    setTimeout(() => {
      this.landingPage.getUserData().subscribe(userData => {
       this.loanTable = userData.map(eachUser => {
          const oldDate = eachUser.CreatedAt
          const diffInDates = moment(this.age).diff(moment(oldDate))
          const timeInMonths = moment(diffInDates).format('MM [months] DD [days]')
          return { ...eachUser, TotalAge:timeInMonths }
        })

      })
    },3000)
  }
  checkTable(array:Array<any>){
    return array.length?true:false
  }

  checkLoanStatus(array: Array<any>, loanStatus: string) {
    return array.filter(userData=>userData.LoanStatus === loanStatus).length
    
  }
  
}
