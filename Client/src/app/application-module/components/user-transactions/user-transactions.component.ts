import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LandingService } from './../../../shared/services/landing.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss']
})
export class UserTransactionsComponent implements OnInit {
  receivedLoans = []
  forwardedLoans = [];

  age = moment(new Date()).format('MM/DD/YYYY, h:mm:ss')
  enableForwarded: boolean = false
  usersText: string = "RecievedUsers";
  checkAll: boolean = true;
  receiveGroupLoans: FormGroup;
  createError:boolean = false;
  enableReceive:boolean = false;

  constructor(private userTransactions:LandingService, private fb:FormBuilder) { }

  ngOnInit() {
    setTimeout(() => {
      this.userTransactions.getSpecificCustomers('Application').subscribe(userData => {
       this.forwardedLoans = userData.map(eachUser => {
          const oldDate = eachUser.CreatedAt
          const diffInDates = moment(this.age).diff(moment(oldDate))
          const timeInMonths = moment(diffInDates).format('MM [months] DD [days]')
          return { ...eachUser, TotalAge:timeInMonths }
        })
        this.receiveGroupLoans = this.createGroupLoans()
       console.log(this.receiveGroupLoans)
       console.log(this.receivedLoans)

      })
    }, 3000)
    console.log(this.forwardedLoans)

  }


  createGroupLoans() {
    return this.fb.group({
      selected: this.createFormControls(),
      selectedAll:[false]
    })
  }
  createFormControls() {
    let arrOfControls = this.forwardedLoans.map(element => {
      return this.fb.control(false)
    })
    return this.fb.array(arrOfControls)
  }
  get FormArrayControls(){
    return <FormArray>this.receiveGroupLoans.get('selected')
  }

   getSelectedLoans(){
     this.receivedLoans = []
     this.FormArrayControls.controls.forEach((control, i)=>{
       if(control.value){
         console.log(control.value)
         this.receivedLoans.push(this.forwardedLoans[i])
       }
     })
     console.log(this.receivedLoans)

   }
   
  
  checkTransactionsTable(array: Array<any>) {
    return array.length?true:false
  }
  receiveAllLoans(val:boolean){
    this.checkAll = !val
    console.log(val)
    if(val){
      this.FormArrayControls.controls.forEach((control, i)=>{
        control.setValue(true)
        return control.disable()
      })
      this.receivedLoans = this.forwardedLoans

    }
    else{
      this.FormArrayControls.controls.forEach((control, i)=>{
        control.setValue(false)
        return control.enable()
      })
      this.receivedLoans = []

    }

  }

  forward() {
    alert('forwarded')
  }

  applicationReceivedLoans() {
    this.enableReceive = false
    this.usersText = "Received Loans"
  }

  onSubmit(){
         if(this.receivedLoans.length){
       this.createError = false
     }
     else return this.createError = true;
     console.log(this.receivedLoans)

  }





}
