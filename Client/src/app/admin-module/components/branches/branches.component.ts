import { FormControl } from '@angular/forms';
import { BranchesService } from './../../../shared/services/branches.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ExportService } from 'src/app/shared/services/export.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit {
  AllBranches = [];
  filteredBranches = [];
  searchText: string;
  fileName = 'branch.xlsx';
  totalItems: number;
  id: string;
  currentPage = 1;
  pageSize = 9;
  age: number;
  key: any = 'branchNumber';
  reverse = false;
  @ViewChild('exportTable') element: ElementRef;
    constructor(private spinner: NgxSpinnerService, private branchService: BranchesService, private router: Router, private exportService: ExportService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.branchService.getAllBranches().subscribe((branches) => {
      this.AllBranches = branches;
      this.totalItems = this.AllBranches.length;
      this.filteredBranches = this.AllBranches;
      this.spinner.hide();
      // console.log(this.filteredBranches);
      // console.log(this.searchText);
    });
  }
  checkTable(array: Array<any>): any {
    return array.length ? true : false;
  }

  getValue(event): any {
    if (event.target.value === '') {
      this.filteredBranches = this.AllBranches;
      this.totalItems = this.filteredBranches.length;
    } else {
      this.searchText = event.target.value;
      this.filteredBranches = this.filterBranches(this.searchText);
      this.totalItems = this.filteredBranches.length;
    }
  }
  filterBranches(searchTerm: string): any {
    if (searchTerm) {
      return this.filteredBranches.filter(
        (branch) =>
          branch.branchName.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1 ||
          branch.branchTypeName
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) !== -1
      );
    }
  }

// branch methods
  createBranch(): any {
    this.router.navigate(['admin/createbranch']);
  }
  editBranch(branch: any): any {
    this.branchService.setEditBranch(branch);
    this.router.navigate(['admin/editbranch']);
  }

  pageChanged(event): any {
    this.currentPage = event;
  }

  exportToExcel(): any{
    this.exportService.exportExcel(this.filteredBranches, 'Branches');
  }
  sort(item: string): any {
    this.key = item;
    this.reverse = !this.reverse;
  }
}
