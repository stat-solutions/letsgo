import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {ConstantsService} from 'src/app/shared/services/constants.service';
import {Constants} from 'src/app/shared/models/loanconstant';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-constants-table',
  templateUrl: './constants-table.component.html',
  styleUrls: ['./constants-table.component.scss']
})
export class ConstantsTableComponent implements OnInit {
	constantsTable:Constants[] = []
	filteredConstants = [];
	searh_constant:string;
	fileName = "constants.xlsx"
	@ViewChild('exportTable')element:ElementRef;
	key:any ="id"

  constructor(private constantService:ConstantsService) { }

  ngOnInit() {
  	this.constantService.getAllConstants().subscribe(constants=>{
  		this.constantsTable = constants;
  		console.log(constants)
  	})
  	this.filteredConstants = this.constantsTable
  }
  checkTable(array:Array<any>){
    return array.length?true:false
  }

  getValue(event) {
    if(event.target.value === ''){
       this.filteredConstants = this.constantsTable
      //this.totalItems = this.filteredConstants.length;
    }
    else{
    	 this.searh_constant = event.target.value
          this.filteredConstants =  this.filterConstants(this.searh_constant)
          //this.totalItems = this.filteredConstants.length;
  
    }

  }
  filterConstants(searchTerm:string){
    if(searchTerm)
    return this.filteredConstants.filter(
      constant=>constant.loanType.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ||constant.loanproduct.toLowerCase().indexOf(searchTerm.toLowerCase())!==  -1
      )

  }
  //exportto excel
  exportToExcel(){
    //pass the table to worksheet

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.element.nativeElement);

    //create a workbook and add work sheet
    const wb:XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    //save fileName 
    XLSX.writeFile(wb, this.fileName)
  }

  //sort
  reverse:boolean = false;
  sort(item:string){
    this.key = item;
    this.reverse = !this.reverse
  }




}
