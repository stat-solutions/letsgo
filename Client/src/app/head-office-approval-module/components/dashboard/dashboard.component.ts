import { LandingService } from './../../../shared/services/landing.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loanTable = []
  filteredLoans = [];
  search_customer:string;
  formGroup:FormGroup;


  age = moment(new Date()).format('MM/DD/YYYY, h:mm:ss')
  
  constructor(private landingPage:LandingService, private fb:FormBuilder, private router:Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.landingPage.getUserData().subscribe(userData => {
       this.loanTable = userData.map(eachUser => {
          const oldDate = eachUser.CreatedAt
          const diffInDates = moment(this.age).diff(moment(oldDate))
          const timeInMonths = moment(diffInDates).format('MM [months] DD [days]')
          return { ...eachUser, TotalAge:timeInMonths }
        })
           this.filteredLoans = this.loanTable;
       

      })
    },0)

       this.formGroup = this.fb.group({
         search_term:['']
       })
  }
  get fval(){
    return this.formGroup.controls;
  }
  checkTable(array:Array<any>){
    return array.length?true:false
  }

  checkLoanStatus(array: Array<any>, loanStatus: string) {
    return array.filter(userData=>userData.LoanStatus === loanStatus).length
    
  }


  getValue(event) {
    console.log(event.target.value)
    this.search_customer = event.target.value
    if(event.target.value === ''){
      return this.filteredLoans = this.loanTable
    }
    else{
          this.filteredLoans =  this.filterCustomer(this.search_customer)
  
    }

  }
  filterCustomer(searchTerm:string){
    if(searchTerm)
    return this.filteredLoans.filter(
      loan=>loan.Customer.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      )

  }
  getFormValue(){
     this.filteredLoans =  this.filterCustomer(this.fval.search_term.value);
    
  }

  clickOnCustomer(id:number){
    this.router.navigate(['admin/customerdetails', id])

  }

}
