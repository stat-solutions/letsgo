import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerModel } from 'src/app/shared/models/customer-model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  public modalRef: BsModalRef;
  registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  imageUrl: string;
  fieldType: boolean;
  mySubscription: any;
  myDateValue: Date;
  positionValue: string;
  reportTypes = [
    { id: 1, reportType: 'Comprehensive report' },
    { id: 2, reportType: 'Running Loans' },
    { id: 3, reportType: 'Disbursed Loans' },
    { id: 4, reportType: 'Rejected Loans' },
    { id: 5, reportType: 'Approved Loans' },
    { id: 6, reportType: 'Forwarded Loans' },
    { id: 7, reportType: 'Deferred Loans' },
    { id: 8, reportType: 'Received Loans' },
    { id: 9, reportType: 'Running By Branch' },
    { id: 10, reportType: 'Running By Movement stage' },
    { id: 11, reportType: 'Running By User' },
  ];

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.myDateValue = new Date();
    this.userForm = this.createFormGroup();
  }
  returnHome() {
    this.spinner.hide();
    this.revert();

    setTimeout(() => {
      this.router.navigate(['authpage/login']);
    }, 2000);
  }
  createFormGroup() {
    return new FormGroup({
      range_date: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),

      report_type: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  revert() {
    this.userForm.reset();
  }

  get fval() {
    return this.userForm.controls;
  }

  // modal method
  public openModal(template: TemplateRef<any>, imageUrl: string): any {
    this.imageUrl = imageUrl;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-center' })
    );
  }

  fetchReport(val: any): any {}

  getReport(branch) {
    this.fval.report_type.setValue(branch.target.value);
  }
  report() {
    if (this.userForm.invalid) {
      return;
    } else {
      //get userForm
      this.userForm.reset();
    }
  }
  register() {}
}
