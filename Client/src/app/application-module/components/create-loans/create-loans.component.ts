import { CustomerService } from './../../../shared/services/customer.service';
import { Component, OnInit , TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms'
import { CustomValidator } from 'src/app/validators/custom-validator';
import { NgxSpinnerService } from 'ngx-spinner';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
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
  loan_types = ['SourceLoans', 'SME']
  securities = ['Security 1', 'Security 2', 'Security 3', 'Security 4', 'Security 5'];
  getSecurities = [];
  checkAllSecurities:boolean = true;
   bsModal:BsModalRef;
  search_term:string;
  currentPage:number = 1;
  totalItems:number;
  pageSize = 12;
  key:any = "documentId";
  customerData = [];
  filteredCustomers = [];
  search_customer:string;


  constructor(private customer:CustomerService,
    private fb:FormBuilder,
    private bsModalService:BsModalService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.userForm = this.createFormGroup();
       this.customer.getCustomers().subscribe(customerNames=>{
      this.customerData = customerNames;
      this.filteredCustomers = this.customerData;
    })
    this.totalItems = this.customerData.length
  }
  createFormGroup() {
    return new FormGroup({
      full_name:this.fb.control(
        {value:'', disabled:true},
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

        const found = allcustomer.find(customers => customers.customerName.toLowerCase === customer.toLowerCase)
        if (found) return false
        else return true
      })
    }
  }
  closeModal(){
    this.bsModal.hide()
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


  //sort in ascending order
  reverse:boolean = false;
  sort(item:string){
    this.key = item;
    this.reverse = !this.reverse
  }


   getCustomer(template:TemplateRef<any>){
     this.bsModal = this.bsModalService.show(
       template,
       Object.assign({}, { class: 'white modal-lg modal-dialog-center' })
     );

   }

   checkTable(array:Array<any>){
     return array.length?true:false
   }

   //searching
    getValue(event) {
    console.log(event.target.value)
    this.search_customer = event.target.value
    if(event.target.value === ''){
      this.filteredCustomers = this.customerData
      this.totalItems = this.filteredCustomers.length;


    }
    else{
          this.filteredCustomers =  this.filterCustomer(this.search_customer)
          this.totalItems = this.filteredCustomers.length;

    }
  }
  filterCustomer(searchTerm:string){
    if(searchTerm)

    return this.filteredCustomers.filter(
      customer=>customer.customerName.toLowerCase().indexOf(searchTerm.toLowerCase())!==   -1
      ||customer.documentType.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1
      )

  }
   //searching

   getCustomerName(id:number){
     const customerNames = this.customerData.find(customer=>customer.customerId === id)
     const {customerName} = customerNames;
     this.fval.full_name.setValue(customerName)
     this.search_term = '';
     this.filteredCustomers = this.customerData;
     this.totalItems = this.filteredCustomers.length
     this.closeModal()
   }

   pageChanged(event){
     this.currentPage = event

   }


}
