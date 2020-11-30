import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {UsersService} from '../../../shared/services/users.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user = [];
  filteredUsers = [];
  // tslint:disable-next-line: variable-name
  search_term: string;
  reverse = false;
  fileName = 'users.xlsx';
  totalItems: number;
  id: string;
  currentPage = 1;
  pageSize = 9;
  age: number;
  key: any = 'userId';
  @ViewChild('exportTable')element: ElementRef;

  constructor(private userService: UsersService,
              private fb: FormBuilder, private spinner: NgxSpinnerService,
              private router: Router
   ) { }

  ngOnInit(): void{
    this.userService.getUsers().subscribe(res => {
      this.user = res;
      this.filteredUsers = this.user;
      this.totalItems = this.user.length;
    });
  }


    getValue(event): any {
    console.log(event.target.value);
    this.search_term = event.target.value;
    if (event.target.value === ''){
       this.filteredUsers = this.user;
       this.totalItems = this.filteredUsers.length;

    }
    else{
          this.filteredUsers =  this.filterCustomer(this.search_term);
          this.totalItems = this.filteredUsers.length;
    }

  }
  filterCustomer(searchTerm: string): any{
    if (searchTerm) {
    return this.filteredUsers.filter(
      user => user.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      || user.fkRoleIdUser.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      || user.userEmail.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    }

  }
  checkArrayLength(array: Array<any>): any{
    return array.length ? true : false;
  }
  deleteUser(id, name): any{
    const bool = confirm(`Are you sure you want to delete ${name}?`);
    if (bool){
      this.userService.deleteUser(id);
      alert(`${name} deleted successfully`);
    }
    else{
      return;
    }
  }

  approveUsers(): any{
    this.router.navigate(['admin/approveusers']);

  }
  pageChanged(event): any{
     this.currentPage = event;

   }
  // exportto excel
  exportToExcel(): any{
    // pass the table to worksheet
    //  const element =  document.getElementById('export-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.element.nativeElement);

    //  create a workbook and add work sheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    //  save fileName
    XLSX.writeFile(wb, this.fileName);
  }
  // exportAsCSV(){
  //    var options = {
  //   fieldSeparator: ',',
  //   headers: ['BranchId', 'BranchName', 'EntityName', 'District','Town', 'CreatedAt']
  // };
  //   //new ngxCsv(this.filteredCustomerData, ‘CustomerData’)
  //   new ngxCsv(this.filteredUsers,'BranchData', options)

  // }
  sort(item: string): any{
    this.key = item;
    this.reverse = !this.reverse;
  }
  loggedInUsers(): any{
    this.router.navigate(['admin/loggedin']);
  }
}
