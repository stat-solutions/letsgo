import { LandingService } from './../../../shared/services/landing.service';
<<<<<<< Updated upstream
import { Component, OnInit, TemplateRef } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

=======
import { Component, OnInit, TemplateRef,  ElementRef , ViewChild} from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
>>>>>>> Stashed changes
@Component({
  selector: 'app-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public modalRef: BsModalRef;
  loanTable = [];
  filteredLoans = [];
<<<<<<< Updated upstream
  search_customer: string;
  formGroup: FormGroup;
  totalItems: number;
  id: string;
  currentPage: number = 1;
  pageSize = 5;
  age = moment(new Date()).format('MM/DD/YYYY, h:mm:ss');
=======
  specificLoanTable = []
  search_customer:string;
  totalItems:number;
  id:string;
  currentPage:number = 1;
  pageSize = 8;
  age: number;
  key:any = "Id"
  csvTable = [];
   @ViewChild('exportTable')exportExcel:ElementRef
//excel sheet name
fileName = "loanInfo.xlsx";
>>>>>>> Stashed changes

  constructor(
    private modalService: BsModalService,
    private landingPage: LandingService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
<<<<<<< Updated upstream
    private router: Router
=======
    private router: Router,
    private activatedRouter:ActivatedRoute
>>>>>>> Stashed changes
  ) {}

  ngOnInit() {
    setTimeout(() => {
<<<<<<< Updated upstream
      this.landingPage.getUserData().subscribe((userData) => {
        this.loanTable = userData.map((eachUser) => {
          const oldDate = eachUser.CreatedAt;
          const diffInDates = moment(this.age).diff(moment(oldDate));
          const timeInMonths = moment(diffInDates).format(
            'MM [months] DD [days]'
          );
          return { ...eachUser, TotalAge: timeInMonths };
        });
        this.filteredLoans = this.loanTable;
        this.totalItems = this.filteredLoans.length;
      });
    }, 0);

    this.formGroup = this.fb.group({
      search_term: [''],
    });
  }
  get fval() {
    return this.formGroup.controls;
  }
=======
      this.landingPage.getloanData().subscribe(userData => {
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
  }


>>>>>>> Stashed changes
  checkTable(array: Array<any>) {
    return array.length ? true : false;
  }

  checkLoanStatus(array: Array<any>, loanStatus: string) {
    return array.filter((userData) => userData.LoanStatus === loanStatus)
      .length;
  }

  getValue(event) {
    console.log(event.target.value);
    this.search_customer = event.target.value;
    if (event.target.value === '') {
      this.filteredLoans = this.loanTable;
      this.totalItems = this.filteredLoans.length;
    } else {
      this.filteredLoans = this.filterCustomer(this.search_customer);
      this.totalItems = this.filteredLoans.length;
    }
<<<<<<< Updated upstream
  }
  filterCustomer(searchTerm: string) {
    if (searchTerm)
      return this.filteredLoans.filter(
        (loan) =>
          loan.Customer.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1 ||
          loan.Stage.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          loan.Status.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          loan.LoanProduct.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1 ||
          loan.LoanType.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
  }
  getFormValue() {
    this.totalItems = this.filteredLoans.length;
    this.filteredLoans = this.filterCustomer(this.fval.search_term.value);
  }

  clickOnCustomer(id: number) {
    this.router.navigate(['headofficeentry/customerdetails', id]);
  }
  pageChanged(event) {
    this.currentPage = event;
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
=======
  }
  filterCustomer(searchTerm: string) {
    if (searchTerm)
      return this.filteredLoans.filter(
        (loan) =>
          loan.Customer.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1 ||
          loan.Stage.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          loan.Status.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          loan.LoanProduct.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1 ||
          loan.LoanType.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
  }


  clickOnCustomer(id:number){
        this.router.navigate(['admin/customerdetails', id], )
  }
   pageChanged(event){
     this.currentPage = event
     console.log(this.filteredLoans.length)
     //get
     //if(currentPage )

   }

  public openModal(template: TemplateRef<any>, id:number, index:number) {
    console.log(id, index)
  this.landingPage.getLoanDetails(id).subscribe(details=>{
    console.log(details)
    this.specificLoanTable.push(details)
  })
  console.log(this.specificLoanTable)
  if(this.checkTable(this.specificLoanTable)){
       this.modalRef = this.modalService.show(
>>>>>>> Stashed changes
      template,
      Object.assign({}, { class: 'white modal-lg modal-dialog-center' })
    );
  }
<<<<<<< Updated upstream
=======

  }
  //exportto excel
  exportToExcel(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.exportExcel.nativeElement);

    //create a workbook and add work sheet
    const wb:XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    //save fileName
    XLSX.writeFile(wb, this.fileName)
  }



   reverse:boolean = false;
  sort(item:string){
    this.key = item;
    this.reverse = !this.reverse
  }
>>>>>>> Stashed changes
}
