import { LandingService } from './../../../shared/services/landing.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router'
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
  totalItems:number;
  id:string;
  currentPage:number = 1;
  pageSize = 5;


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
           this.totalItems = this.filteredLoans.length;
       

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
      this.filteredLoans = this.loanTable
      this.totalItems = this.filteredLoans.length;
      

    }
    else{
          this.filteredLoans =  this.filterCustomer(this.search_customer)
          this.totalItems = this.filteredLoans.length;
  
    }

  }
  filterCustomer(searchTerm:string){
    if(searchTerm)

    return this.filteredLoans.filter(
      loan=>
      loan.Customer.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ||loan.Stage.toLowerCase().indexOf(searchTerm.toLowerCase())!==   -1
      ||loan.Status.toLowerCase().indexOf(searchTerm.toLowerCase())!==  -1
      ||loan.LoanProduct.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1
      ||loan.LoanType.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1
      )

  }
  getFormValue(){
    this.totalItems = this.filteredLoans.length;
     this.filteredLoans =  this.filterCustomer(this.fval.search_term.value);
    
  }

  clickOnCustomer(id:number){
        this.router.navigate(['branchapproval/customerdetails', id], )
  }
   pageChanged(event){
     this.currentPage = event

   }

}
