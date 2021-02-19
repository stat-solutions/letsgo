import { Component, OnInit, TemplateRef,  ElementRef , ViewChild} from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { LoaningService } from 'src/app/shared/services/loaning.service';
@Component({
  selector: 'app-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public modalRef: BsModalRef;
  loanTable = [];
  filteredLoans = [];
  specificLoanTable = [];
  searchCustomer: string;
  totalItems: number;
  id: string;
  currentPage = 1;
  pageSize = 10;
  age: number;
  key = 'Id';
  imageUrl: string;
  csvTable = [];
  @ViewChild('exportTable') exportExcel: ElementRef;
  // excel sheet name
  fileName = 'loanInfo.xlsx';

  constructor(
    private modalService: BsModalService,
    private loaning: LoaningService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loaning.getAllLoanDetails().subscribe((userData) => {
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
  }

  checkTable(array: Array<any>): any {
    return array.length ? true : false;
  }

  checkLoanStatus(array: Array<any>, loanStatus: string): any {
    return array.filter((userData) => userData.LoanStatus === loanStatus)
      .length;
  }

  getValue(event): any {
    console.log(event.target.value);
    this.searchCustomer = event.target.value;
    if (event.target.value === '') {
      this.filteredLoans = this.loanTable;
      this.totalItems = this.filteredLoans.length;
    } else {
      this.filteredLoans = this.filterCustomer(this.searchCustomer);
      this.totalItems = this.filteredLoans.length;
    }
  }
  filterCustomer(searchTerm: string): any {
    if (searchTerm) {
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
  }
  pageChanged(event): any {
    this.currentPage = event;
    console.log(this.filteredLoans.length);
    // get
    // if(currentPage )
  }

  public openModal(template: TemplateRef<any>, photoUrl: string): any {
    this.imageUrl = photoUrl;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-dialog-center' })
    );
  }

  // export to excel
  exportToExcel(): any {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.exportExcel.nativeElement
    );

    // create a workbook and add work sheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // save fileName
    XLSX.writeFile(wb, this.fileName);
  }

  reverse: boolean = false;
  sort(item: string) {
    this.key = item;
    this.reverse = !this.reverse;
  }
}
