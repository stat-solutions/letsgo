import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import {CustomerModel} from 'src/app/shared/models/customer-model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public modalRef: BsModalRef;
  customerTable: CustomerModel[] = [];
  filterCustomers = [];
  fileName = 'customer.xlsx';
  searchCustomer: string;
  totalItems: number;
  id: string;
  currentPage = 1;
  pageSize = 13;
  key = 'customerId';
  reverse = false;
  imageUrl: string;
  @ViewChild('exportTable') element: ElementRef;
  constructor(
    private customer: CustomerService,
    private modalService: BsModalService,
    private router: Router
  ) {}
  ngOnInit(): any {
    setTimeout(() => {
      this.customer.getAllCustomers().subscribe((data) => {
        this.customerTable = data;
        this.filterCustomers = this.customerTable;
        this.totalItems = this.customerTable.length;
      });
    }, 0);
  }
  checkTable(array: Array<any>): any {
    return array.length ? true : false;
  }

  getValue(event): any {
    console.log(event.target.value);
    if (event.target.value === '') {
      this.filterCustomers = this.customerTable;
      this.totalItems = this.filterCustomers.length;
    } else {
      this.searchCustomer = event.target.value;
      this.filterCustomers = this.filterCustomer(this.searchCustomer);
      this.totalItems = this.filterCustomers.length;
    }
  }
  filterCustomer(searchTerm: string): any {
    if (searchTerm) {
      return this.filterCustomers.filter(
        (customer) =>
          customer.customerName
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) !== -1
        // || customer.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1 ||
        // customer.documentType.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    }
  }
  pageChanged(event): any {
    this.currentPage = event;
  }

  // modal method
  public openModal(template: TemplateRef<any>, imageUrl: string): any {
    this.imageUrl = imageUrl;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-center' })
    );
  }

  // export to excel
  exportToExcel(): any {
    // pass the table to worksheet
    // const element =  document.getElementById('export-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.element.nativeElement
    );

    // create a workbook and add work sheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // save fileName
    XLSX.writeFile(wb, this.fileName);
  }
  // exportAsCSV(){
  //    var options = {
  //   fieldSeparator: ',',
  //   headers: ['UserId', 'UserName', 'Branch', 'Email', 'Status', 'Logout']
  // };
  //   //new ngxCsv(this.filteredCustomerData, ‘CustomerData’)
  //   new ngxCsv(this.filterCustomers ,'CustomerData', options)

  // }

  sort(item: string): any {
    this.key = item;
    this.reverse = !this.reverse;
  }
}
