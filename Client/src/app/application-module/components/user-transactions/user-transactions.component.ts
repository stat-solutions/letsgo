import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LandingService } from './../../../shared/services/landing.service';
import { Component, OnInit , OnChanges, TemplateRef} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss']
})
export class UserTransactionsComponent implements OnInit{
  receivedLoans = [];
  forwardedLoansTo = [];
  age = moment(new Date()).format('MM/DD/YYYY, h:mm:ss')
  usersText: string = "RecievedUsers";
  checkAll: boolean = true;
  receiveGroupLoans: FormGroup;
  createError:boolean = false;
  bsModalRef:BsModalRef;


  constructor(private userTransactions:LandingService, 
    private fb:FormBuilder, private bsModalService:BsModalService) { }

  ngOnInit() {
    setTimeout(() => {
      this.userTransactions.getSpecificCustomers('Application').subscribe(userData => {
       this.receivedLoans = userData.map(eachUser => {
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
      selected: this.createFormControls(this.receivedLoans),
      selectedAll:[false]
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
  closeModal(){
    this.bsModalRef.hide()
  }

   getSelectedLoans(template:TemplateRef<any>){
     this.FormArrayControls.controls.forEach((control, i)=>{
       if (control.value) {
         console.log(control.value)
         this.bsModalRef =  this.bsModalService.show(template)
         this.closeModal()
       }
         
       
     })
   
   }
   
   
  
  checkTransactionsTable(array: Array<any>) {
    return array.length?true:false
  }
  
  

  onSubmit(){


  }
   
   
}
