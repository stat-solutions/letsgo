import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoaningService } from 'src/app/shared/services/loaning.service';
import { AlertService } from 'ngx-alerts';
import { ExportService } from 'src/app/shared/services/export.service';

@Component({
  selector: 'app-constants-table',
  templateUrl: './constants-table.component.html',
  styleUrls: ['./constants-table.component.scss'],
})
export class ConstantsTableComponent implements OnInit {
  constantsTable = [];
  filteredConstants = [];
  searchConstant: string;
  fileName = "constants.xlsx";
  @ViewChild('exportTable') element: ElementRef;
  key = "id";
  reverse = false;

  constructor(
    private authService: AuthServiceService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private exportService: ExportService,
    private loan: LoaningService
  ) { }

  ngOnInit(): void {
    this.loan.getAllLoanThresholds().subscribe( constants => {
      this.constantsTable = constants;
      this.filteredConstants = this.constantsTable;
    });
  }
  checkTable(array: Array<any>): any{
    return array.length ? true : false;
  }

  getValue(event): any {
    if  (event.target.value === ''){
      this.filteredConstants = this.constantsTable;
    }
    else{
      this.searchConstant = event.target.value;
      this.filteredConstants =  this.filterConstants(this.searchConstant);
    }

  }
  editConstant(constant: any): any {
    this.loan.setEditConstant(constant);
    this.router.navigate(['admin/editconstant']);
  }
  filterConstants(searchTerm: string): any{
    if (searchTerm){
        return this.filteredConstants.filter(
        constant => constant.loanThresholdProduct.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        || constant.loanThresholdType.toLowerCase().indexOf(searchTerm.toLowerCase()) !==  -1
      );
    }
  }
  // exportto excel
  exportToExcel(): any{
    this.exportService.exportExcel(this.filteredConstants, 'constants');
  }

  // sort
  sort(item: string): any{
    this.key = item;
    this.reverse = !this.reverse;
  }
}
