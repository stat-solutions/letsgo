import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LandingService } from './../../../shared/services/landing.service';
import { Component, OnInit , OnChanges, TemplateRef} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import {AlertService} from 'ngx-alerts';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss']
})
export class UserTransactionsComponent implements OnInit{
  receivedLoans = [];
  forwardLoansTo = [];
  filteredReceivedLoans = [];
  age = moment(new Date()).format('MM/DD/YYYY, h:mm:ss')
  bsModalRef:BsModalRef;
  comment:FormGroup;
  editLoanForm:FormGroup

  constructor(private userTransactions:LandingService, 
    private fb:FormBuilder, 
    private alertService:AlertService,
    private bsModalService:BsModalService) { }

  ngOnInit() {
    setTimeout(() => {
      this.userTransactions.getSpecificCustomers('Application').subscribe(userData => {
       this.receivedLoans = userData.map(eachUser => {
          const oldDate = eachUser.CreatedAt
          const diffInDates = moment(this.age).diff(moment(oldDate))
          const timeInMonths = moment(diffInDates).format('MM [months] DD [days]')
          return { ...eachUser, TotalAge:timeInMonths }
        })
        this.comment = this.fb.group({
          comments:['', Validators.required]
        })
       // this.receivedLoans.push(this.forwardedLoansFrom[0])
       this.filteredReceivedLoans = this.receivedLoans

      })
    }, 0)
    this.editLoanForm = this.createLoanForm()
    
  }
  //getcoment controls
  get commentControls(){
    return this.comment.controls
  }
  createLoanForm(){
    return this.fb.group({
      customerName:['', Validators.required],
      loanType:['', Validators.required],
      loanProduct:['',Validators.required],
      tenure:[null, Validators.required],
      amount:['', Validators.required]
    })
  }
  editFormDetails(){

  }

  get editControls(){
    return this.editLoanForm.controls
  }
    setClassInvalid(contact) {
    return {
      'is-invalid': (contact.touched || contact.dirty) && contact.errors,
    }
  }
    
  
  //forwared selected loan
  forwardSelected(template:TemplateRef<any>, id){
    this.bsModalRef =  this.bsModalService.show(template)
    console.log(id)

  }
  //edit loan
  editLoan(edit:TemplateRef<any>,id:number, index:number){
    const getLoan = this.receivedLoans[index];
    const {Customer,LoanType, LoanProduct,Tenure, Amount} = getLoan
    this.editControls.customerName.setValue(Customer)
    this.editControls.customerName.disable()
    this.editControls.loanType.setValue(LoanType)
    this.editControls.loanProduct.setValue(LoanProduct)
    this.editControls.tenure.setValue(Tenure)
    this.editControls.amount.setValue(Amount)
    this.bsModalRef =  this.bsModalService.show(edit)

  }
  saveEdit(){
    if(this.editLoanForm.invalid){
      this.alertService.danger('Something went wromge')
    }
    else{
      this.alertService.success({
        html:"<h3>Editted sucessfully</h3>"
      })
    }
    this.closeModal()
  }
  
  closeModal(){
    this.bsModalRef.hide()
  }  
  checkTransactionsTable(array: Array<any>) {
    return array.length?true:false
  }
  
  onSubmit(){
    if(! this.checkTransactionsTable(this.forwardLoansTo)) return ;
    else{
      //get loan type
      let typeOfLoan = this.forwardLoansTo[0]
      console.log(typeOfLoan)
      const {LoanType, Amount} = typeOfLoan
      if(LoanType.toLowerCase() === 'group'){
        console.log('group')
        //push them 
        this.alertService.success('forwarded sucessfully')

      }
      else{
           console.log('sme')
           //push them
           if(Amount >1000000000){
             console.log('greater')
           }
           else if(Amount <3000000 && Amount<=10000000){
             //do something
           }
           else{
             //do something
           }
      }

    }
    this.closeModal()

  }
   
   
}
