import { FormControl } from '@angular/forms';
import { BranchesService } from './../../../shared/services/branches.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
import { ngxCsv } from 'ngx-csv/ngx-csv';
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  AllBranches = [];
  filteredBranches = [];
  searchText:string;
  fileName = "branch.xlsx";
  totalItems:number;
  id:string;
  currentPage:number = 1;
  pageSize = 6;
  age: number;
  key:any = 'branchNumber'
  @ViewChild('exportTable')element:ElementRef
  constructor(private branchService:BranchesService, private router:Router) {
  }
  
  ngOnInit() {
    this.branchService.getAllBranches().subscribe((branches) => {
      this.AllBranches = branches;
      this.totalItems = this.AllBranches.length
    })
    this.filteredBranches = this.AllBranches
    console.log(this.filteredBranches)
    console.log(this.searchText)
  }
  checkTable(array:Array<any>){
    return array.length?true:false
  }

  getValue(event) {
    if(event.target.value === ''){
       this.filteredBranches = this.AllBranches
      this.totalItems = this.filteredBranches.length;
    }
    else{
          this.searchText = event.target.value
          this.filteredBranches =  this.filterBranches(this.searchText)
          this.totalItems = this.filteredBranches.length;
  
    }

  }
  filterBranches(searchTerm:string){
    if(searchTerm)
    return this.filteredBranches.filter(
      branch=>branch.branchName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ||branch.town.toLowerCase().indexOf(searchTerm.toLowerCase())!==  -1
      ||branch.district.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1
      )

  }


  createBranch(){
    this.router.navigate(['admin/createbranch'])

  }
  pageChanged(event){
     this.currentPage = event

   }

   //exportto excel
  exportToExcel(){
    //pass the table to wor
    console.log(this.element)
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
  //   headers: ['BranchId', 'BranchName', 'EntityName', 'District','Town', 'CreatedAt']
  // };
  //   //new ngxCsv(this.filteredCustomerData, ‘CustomerData’)
  //   new ngxCsv(this.filteredBranches,'BranchData', options)

  // }
   reverse:boolean = false;
  sort(item:string){
    this.key = item;
    this.reverse = !this.reverse
  }


}
