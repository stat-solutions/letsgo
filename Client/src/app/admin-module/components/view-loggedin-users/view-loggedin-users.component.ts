import { UsersService } from './../../../shared/services/users.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-loggedin-users',
  templateUrl: './view-loggedin-users.component.html',
  styleUrls: ['./view-loggedin-users.component.scss'],
})
export class ViewLoggedinUsersComponent implements OnInit {
  loggedInUsers = [];
  filteredUsers = [];
  fileName = 'users.xlsx';
  search_user: string;
  id: string;
  totalItems: number;
  currentPage: number = 1;
  pageSize = 9;
  age: number;
  key: any = 'userId';
  @ViewChild('exportTable') element: ElementRef;

  constructor(private loggedInUser: UsersService, private router: Router) {}

  ngOnInit() {
    this.loggedInUser.viewLoggedIn().subscribe((loggedIn) => {
      this.loggedInUsers = loggedIn;
      this.filteredUsers = this.loggedInUsers;
      this.totalItems = this.loggedInUsers.length;
    });
  }
  goToUsers(): any{
    this.router.navigate(['admin/users']);
  }
  checkLoggedInUsers(array: Array<any>) {
    return array.length ? true : false;
  }
  getValue(event) {
    console.log(event.target.value);
    this.search_user = event.target.value;
    if (event.target.value === '') {
      this.filteredUsers = this.loggedInUsers;
      this.totalItems = this.filteredUsers.length;
    } else {
      this.filteredUsers = this.filterCustomer(this.search_user);
      this.totalItems = this.filteredUsers.length;
    }
  }

  filterCustomer(searchTerm: string) {
    if (searchTerm)
      return this.filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.status.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.branch.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.email.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
  }

  pageChanged(event) {
    this.currentPage = event;
  }
  reverse: boolean = false;

  sort(item: string) {
    this.key = item;
    this.reverse = !this.reverse;
  }
  exportToExcel(){
    //pass the table to worksheet
    //const element =  document.getElementById('export-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.element);

    //create a workbook and add work sheet
    const wb:XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    //save fileName
    XLSX.writeFile(wb, this.fileName)
  }
  // exportAsCSV(){
  //    var options = {
  //   fieldSeparator: ',',
  //   headers: ['userId', 'userName', 'LoanType', 'LoanProduct', 'Tenure', 'Amount', 'Stage',
  //   'Status','LoanMovedBy', 'StageAt', 'Age', 'CreatedAt', 'TotalAge']
  // };
  //   //new ngxCsv(this.filteredCustomerData, ‘CustomerData’)
  //   new ngxCsv(this.filteredUsers ,'userData', options)

  // }
  logOut(id:number, email:string, i:number){
    this.loggedInUser.logOutUser(id,email,i)
    //get the user details send them to service
  }

  approveUsers() {
    this.router.navigate(['admin/approveusers']);
  }

  // exportAsCSV(){
  //    var options = {
  //   fieldSeparator: ',',
  //   headers: ['userId', 'userName', 'LoanType', 'LoanProduct', 'Tenure', 'Amount', 'Stage',
  //   'Status','LoanMovedBy', 'StageAt', 'Age', 'CreatedAt', 'TotalAge']
  // };
  //   //new ngxCsv(this.filteredCustomerData, ‘CustomerData’)
  //   new ngxCsv(this.filteredUsers ,'userData', options)

  // }
}
