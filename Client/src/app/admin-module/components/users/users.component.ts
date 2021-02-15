import { Component, OnInit, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import {UsersService} from '../../../shared/services/users.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BranchesService } from 'src/app/shared/services/branches.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  modalRef: BsModalRef;
  userForm: FormGroup;
  posted = false;
  errored = false;
  user: any;
  filteredUsers = [];
  searchTerm: string;
  fileName = 'users.xlsx';
  totalItems: number;
  id: string;
  reverse = false;
  currentPage = 1;
  pageSize = 9;
  age: number;
  key: any = 'userId';
  roles: any;
  imageUrl: string;
  branches: any;
  @ViewChild('exportTable') element: ElementRef;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private modalService: BsModalService,
    private branchService: BranchesService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      this.user = res;
      this.filteredUsers = this.user;
      this.totalItems = this.user.length;
    });
    this.branchService.getAllBranches().subscribe((branches) => {
      this.branches = branches;
    });
    this.getRoles();
    this.userForm = this.createFormGroup();
  }
    createFormGroup(): any {
      return new FormGroup({
        userName: this.fb.control(
          '',
          Validators.compose([Validators.required])
        ),
        // branch: this.fb.control(
        //   '',
        //   Validators.compose([Validators.required, Validators.minLength(2)])
        // ),
        role: this.fb.control(
          '',
          Validators.compose([Validators.required])
        ),
      });
    }
    getRoles(): any {
      this.userService.getUserRoles().subscribe(
        res => {
          this.roles = res;
          // tslint:disable-next-line: only-arrow-functions
          this.roles = this.roles.map(function(role: any): any {
            return {
              roleId: role.roleId,
              roleName: role.roleName.replace(/_/g, ' ').toUpperCase()
            };
        });
          // console.log(this.roles);
        },
        err => console.log(err.error.error.message)
      );
    }
    getValue(event): any {
    // console.log(event.target.value);
    this.searchTerm = event.target.value;
    if (event.target.value === ''){
       this.filteredUsers = this.user;
       this.totalItems = this.filteredUsers.length;

    }
    else{
          this.filteredUsers =  this.filterCustomer(this.searchTerm);
          this.totalItems = this.filteredUsers.length;
    }
  }
  public openModal(template: TemplateRef<any>, user: any): any {
    this.user = user;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'white modal-lg modal-dialog-center' })
    );
  }

  public openModal2(template: TemplateRef<any>, user: any): any {
    this.user = user;
    this.userForm.controls.userName.setValue(this.user.userName);
    this.userForm.controls.userName.disable();
    // this.userForm.controls.branch.disable();
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'white' })
    );
  }

  filterCustomer(searchTerm: string): any{
    if (searchTerm) {
    return this.filteredUsers.filter(
      user => user.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
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
  updateUserRole(template: any): any {
    const data = {
      userId: this.user.userIid,
      roleId: null
    };
    this.roles.forEach(role => {
      if (this.userForm.controls.role.value === role.roleName) {
        data.roleId = role.roleId;
      }
    });
    console.log(data);
    this.modalService.hide(template);
  }
  sort(item: string): any{
    this.key = item;
    this.reverse = !this.reverse;
  }
  loggedInUsers(): any{
    this.router.navigate(['admin/loggedin']);
  }
}
