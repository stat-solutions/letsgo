import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-view-loggedin-users',
  templateUrl: './view-loggedin-users.component.html',
  styleUrls: ['./view-loggedin-users.component.scss'],
})
export class ViewLoggedinUsersComponent implements OnInit {
  public modalRef: BsModalRef;
  loggedInUsers = [];
  filteredUsers = [];
  fileName = 'users.xlsx';
  searchUser: string;
  id: string;
  totalItems: number;
  currentPage = 1;
  pageSize = 9;
  age: number;
  key = 'userId';
  reverse = false;
  imageUrl: string;
  @ViewChild('exportTable') element: ElementRef;

  constructor(
    private userService: UsersService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): any {
    this.userService.getLoggedInUsers().subscribe((loggedIn) => {
      this.loggedInUsers = loggedIn;
      this.filteredUsers = this.loggedInUsers;
      this.totalItems = this.loggedInUsers.length;
    });
  }
  goToUsers(): any {
    this.router.navigate(['admin/users']);
  }
  checkLoggedInUsers(array: Array<any>): any {
    return array.length ? true : false;
  }
  getValue(event): any {
    console.log(event.target.value);
    this.searchUser = event.target.value;
    if (event.target.value === '') {
      this.filteredUsers = this.loggedInUsers;
      this.totalItems = this.filteredUsers.length;
    } else {
      this.filteredUsers = this.filterCustomer(this.searchUser);
      this.totalItems = this.filteredUsers.length;
    }
  }

  filterCustomer(searchTerm: string): any {
    if (searchTerm) {
      return this.filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.status.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.branch.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.email.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    }
  }

  pageChanged(event): any {
    this.currentPage = event;
  }

  sort(item: string): any {
    this.key = item;
    this.reverse = !this.reverse;
  }

  // modal method
  public openModal(template: TemplateRef<any>, imageUrl: string): any {
      this.imageUrl = imageUrl;
      this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-center' })
    );
  }
  exportToExcel(): any {
    // pass the table to worksheet
    // const element =  document.getElementById('export-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.element);

    // create a workbook and add work sheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // save fileName
    XLSX.writeFile(wb, this.fileName);
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
  logOut(id: number): any {
    // this.loggedInUser.logOutUser(id, email, i);
    // get the user details send them to service
    this.userService.userLogOut(id).subscribe((loggedIn) => {
      this.loggedInUsers = loggedIn;
      this.filteredUsers = this.loggedInUsers;
      this.totalItems = this.loggedInUsers.length;
    });
  }

  approveUsers(): any {
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
