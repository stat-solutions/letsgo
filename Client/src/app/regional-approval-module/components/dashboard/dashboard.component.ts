import { LoaningService } from '../../../shared/services/loaning.service';
import {
  Component,
  OnInit,
  TemplateRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
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
  key = "Id";
  csvTable = [];
   @ViewChild('exportTable')exportExcel: ElementRef;
// excel sheet name
  fileName = "loanInfo.xlsx";
  reverse = false;

  constructor(
    private modalService: BsModalService,
    private landingPage: LoaningService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.landingPage.getAllLoanDetails().subscribe((userData) => {
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
          loan.customerIdNumber.indexOf(searchTerm.toLowerCase()) !==
            -1 ||
          loan.customerIdType.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          loan.customerName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          loan.loanThresholdType.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1 ||
          loan.loanThresholdProduct.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
          || loan.loanOriginatingBranch.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
          || loan.movementStage.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    }
  }


  clickOnCustomer(id: number): any{
        this.router.navigate(['admin/customerdetails', id], );
  }
   pageChanged(event): any{
     this.currentPage = event;
     console.log(this.filteredLoans.length);
     // get
     // if(currentPage )

   }

  public openModal(template: TemplateRef<any>, id: number, index: number): any {
    console.log(id, index);
    this.landingPage.getLoanDetails(id).subscribe(details => {
    console.log(details);
    this.specificLoanTable.push(details);
  });
    console.log(this.specificLoanTable);
    if (this.checkTable(this.specificLoanTable)){
       this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-dialog-center' })
    );
  }
  }
  // exportto excel
  exportToExcel(): any{
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.exportExcel.nativeElement);

    // create a workbook and add work sheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // save fileName
    XLSX.writeFile(wb, this.fileName);
  }

  sort(item: string): any{
    this.key = item;
    this.reverse = !this.reverse;
  }
  Number(val: string): any{
    return Number(val);
  }
}
