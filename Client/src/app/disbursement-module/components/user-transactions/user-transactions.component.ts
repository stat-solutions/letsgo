import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LandingService } from './../../../shared/services/landing.service';
import { Component, OnInit , OnChanges, TemplateRef} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss']
})
export class UserTransactionsComponent implements OnInit{
  receivedLoans = [];
  forwardedLoansFrom = [];
  makeLoansReceived = [];
  forwardedLoansTo = [];
  age = moment(new Date()).format('MM/DD/YYYY, h:mm:ss')
  usersText: string = "RecievedUsers";
  checkAll: boolean = true;
  receiveGroupLoans: FormGroup;
  createError:boolean = false;
  enableReceive:boolean = false;
  enableForwardedFrom: boolean = true;
  constructor(private userTransactions:LandingService, 
    private fb:FormBuilder) { }

  ngOnInit() {
    setTimeout(() => {
      this.userTransactions.getSpecificCustomers('Application').subscribe(userData => {
       this.forwardedLoansFrom = userData.map(eachUser => {
          const oldDate = eachUser.CreatedAt
          const diffInDates = moment(this.age).diff(moment(oldDate))
          const timeInMonths = moment(diffInDates).format('MM [months] DD [days]')
          return { ...eachUser, TotalAge:timeInMonths }
        })
        this.receiveGroupLoans = this.createGroupLoans();
       // this.receivedLoans.push(this.forwardedLoansFrom[0])

      })
    }, 0)
    
  }
    createGroupLoans() {
    return this.fb.group({
      selected: this.enableForwardedFrom?
      this.createFormControls(this.forwardedLoansFrom):
      this.createFormControls(this.receivedLoans),
      selectedAll:this.enableForwardedFrom?[false]:[false]
    })
  }
  createFormControls(arrayLoans:Array<any>) {
    console.log(arrayLoans.length)
    let arrOfControls = arrayLoans.map(element => {
      return this.fb.control(false)
    })
    return this.fb.array(arrOfControls)
  }
  get FormArrayControls(){
    return <FormArray>this.receiveGroupLoans.get('selected')
  }  
   getSelectedLoansWithNoComments(){
     this.makeLoansReceived = [];
     this.FormArrayControls.controls.forEach((control, i)=>{
       if (control.value) {
         
       }

     })
     

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
//this.forwardedLoans = []

    }
    else{
      this.FormArrayControls.controls.forEach((control, i)=>{
        control.setValue(false)
        return control.enable()
      })
     this.makeLoansReceived = []

    }

  }
  branchApprovalReceivedLoans() {
    console.log('received')
    this.receivedLoans.push(this.forwardedLoansFrom[0])
    this.enableReceive = true;
    this.enableForwardedFrom = false;
    this.usersText = "Received Loans";
    this.receiveGroupLoans = this.createGroupLoans();
  
  }

  onSubmit(){
    if(this.enableForwardedFrom){
      console.log('receive')
    }
    else{
      console.log('not received')
    }
         if(this.receivedLoans.length){
       this.createError = false
     }
     else return this.createError = true;
     console.log(this.receivedLoans)

  }
   branchApprovalForwardedLoans(){
     this.enableReceive = false;
     this.enableForwardedFrom = true;
     this.receiveGroupLoans = this.createGroupLoans();
   }
   
}
