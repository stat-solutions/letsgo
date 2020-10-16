import { CustomerService } from './../../../shared/services/customer.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms'
import { CustomValidator } from 'src/app/validators/custom-validator';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-loans',
  templateUrl: './create-loans.component.html',
  styleUrls: ['./create-loans.component.scss']
})
export class CreateLoansComponent implements OnInit {
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  positionValue: string;
  invalid: boolean = false;
  authService: any;
  error:boolean = false
  loan_types = ['Group', 'SME']
  securities = ['security one', 'security two', 'security 3', 'security 4', 'security 5'];
  getSecurities = [];
  checkAllSecurities:boolean = true;


  constructor(private customer:CustomerService, private fb:FormBuilder,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.userForm = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      full_name:this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      loan_type:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      loan_product:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      amount:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),  
      tenure:this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),      
      
      security:this.createSecuritiesControl() 
    });
  }

  revert() {
    this.userForm.reset();
  }

  get fval() {
    return this.userForm.controls;
  }
  checkCustomer(customer:string):boolean{
    if (customer !== '' || customer !== null) return false
    else {
      this.customer.getCustomers().subscribe(allcustomer => {
      
        const found = allcustomer.find(customers => customers.name.toLowerCase === customer.toLowerCase)
        if (found) return false
        else return true
      })
    }
  }

  createSecuritiesControl(){
    const controls = this.securities.map(security=>{
      return this.fb.control(false, Validators.required)
    })
    return this.fb.array(controls)
  }
  getAllSecurities(val:boolean){
    this.checkAllSecurities = !val
    if(val){
      this.FormArrayControls.controls.forEach((control, i)=>{
         control.setValue(true)
         this.getSecurities.push(this.securities[i])
         return control.disable()
      })
     
     console.log(this.getSecurities)
    }
    else{
      this.FormArrayControls.controls.forEach((control,i)=>{
        control.setValue(false)

        return control.enable()
      })
      this.getSecurities = []

     console.log(this.getSecurities)
    }

  }
  getSecuritiesChecked(){
    this.getSecurities = []
    this.FormArrayControls.controls.forEach((control, i)=>{
      if(control.value){
        this.getSecurities.push(this.securities[i])
      }

    })
    if(this.getSecurities.length === 0){
      this.error = true
    }
    else{
      this.error = false
    }
          console.log(this.getSecurities)
  }


   get FormArrayControls(){
    return <FormArray>this.userForm.get('security')
  } 
   
  getLoanType(loan) {
    this.fval.loan_type.setValue(loan.target.value)
  }
  

  returnHome() {
    this.spinner.hide();
    this.revert();
  }

   

  register() {
    console.log(this.userForm)
    
    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return this.invalid = true
      //return;
    } else {
      
     
    }
  }


}
