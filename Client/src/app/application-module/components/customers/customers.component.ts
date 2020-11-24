import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import {CustomerModel} from 'src/app/shared/models/customer-model'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customerTable:CustomerModel[] = []
  filterCustomers = []
  fileName = "customer.xlsx"
  search_customer:string;
  totalItems:number;
  id:string;
  currentPage:number = 1;
  pageSize = 13;
  key:any = "customerId";
  @ViewChild('exportTable')element:ElementRef
  constructor(private customer:CustomerService, private router:Router) { }
  ngOnInit() {
    setTimeout(()=>{
      this.customer.getCustomers().subscribe(data => {
        console.log(data)
        this.customerTable = data
        this.filterCustomers = this.customerTable
        this.totalItems = this.customerTable.length
      })
    }, 0)

  }
  checkTable(array:Array<any>){
    return array.length?true:false
  }

  createCustomer(){
    this.router.navigate(['application/createcustomer'])

  }
   getValue(event) {
    console.log(event.target.value)

    if(event.target.value === ''){
      this.filterCustomers = this.customerTable
      this.totalItems = this.filterCustomers.length;


    }
    else{
          this.search_customer = event.target.value
          this.filterCustomers =  this.filterCustomer(this.search_customer)
          this.totalItems = this.filterCustomers.length;

    }
  }
  filterCustomer(searchTerm:string){
    if(searchTerm)

   return this.filterCustomers.filter(
      customer=>
      customer.customerName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ||customer.userName.toLowerCase().indexOf(searchTerm.toLowerCase())!==   -1
      ||customer.documentType.toLowerCase().indexOf(searchTerm.toLowerCase())!==  -1
      )

  }

   pageChanged(event){
     this.currentPage = event
   }

   //exportto excel
  exportToExcel(){
    //pass the table to worksheet
    //const element =  document.getElementById('export-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.element.nativeElement);

    //create a workbook and add work sheet
    const wb:XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    //save fileName
    XLSX.writeFile(wb, this.fileName)
  }
  // exportAsCSV(){
  //    var options = {
  //   fieldSeparator: ',',
  //   headers: ['UserId', 'UserName', 'Branch', 'Email', 'Status', 'Logout']
  // };
  //   //new ngxCsv(this.filteredCustomerData, ‘CustomerData’)
  //   new ngxCsv(this.filterCustomers ,'CustomerData', options)

  // }
  reverse:boolean = false;
  sort(item:string){
    this.key = item;
    this.reverse = !this.reverse
  }

}
