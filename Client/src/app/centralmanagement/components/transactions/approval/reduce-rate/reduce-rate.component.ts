import { Component, OnInit } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

export interface RedRateApprovals {
  station: string,
  client: string,
  rate: number,
  status: number
}

@Component({
  selector: 'app-reduce-rate',
  templateUrl: './reduce-rate.component.html',
  styleUrls: ['./reduce-rate.component.scss']
})
export class ReduceRateComponent implements OnInit {
  userForm: FormGroup;
  ratesApprovals: RedRateApprovals[] = [
    {station: "ndeeba", client: "Kasule Joseph", rate: 5, status: 0},
    {station: "najjanankumbi", client: "mukasa rony", rate: 8, status: 0},
    {station: "kyaliwajjala", client: "kasozi med", rate: 3, status: 0},
    {station: "katwe", client: "Kasule Joseph", rate: 4, status: 0},
    {station: "nsangi", client: "Kasule Jose", rate: 2, status: 0},
  ];
  posted = false;
  actionButton: string;
  errored: boolean;
  serviceErrors: string;
  status: boolean;
  checkedOk: boolean;
  station: string;
  theCompany: string;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.userForm = this.createFormGroup();
    this.fval.selectAll.setValue(false);
    this.initialiseForm();
  }
  createFormGroup() {
    return this.fb.group({
      approveReduceRates: this.fb.array([this.rateApproval]),
      selectAll: this.fb.control({})
    })
  }
  get rateApproval () {
    return this.fb.group({
      station: this.fb.control({value: ''}),
      client: this.fb.control({value: ''}),
      rate: this.fb.control({value: ''}),
      approved: this.fb.control({})
    })
  }
  addItem () {
    // this.unitForm.controls.bussinessUnits  as FormArray
    (this.fval.approveReduceRates as FormArray).push(this.rateApproval)
  }

  removeItem (index: number) {
    (this.fval.approveReduceRates as FormArray).removeAt(index);
  }
  initialiseForm () {
    let n: number;
    // this.others.getBussinessUnits().subscribe(
    //   units => {
    //     this.approvals = units;
        this.ratesApprovals.forEach((item, i) => {
          // console.log(item.name);
          // console.log(i);
          this.fval.approveReduceRates['controls'][i]['controls'].station.setValue(item.station);
          this.fval.approveReduceRates['controls'][i]['controls'].client.setValue(item.client);
          this.fval.approveReduceRates['controls'][i]['controls'].rate.setValue(item.rate);
          this.fval.approveReduceRates['controls'][i]['controls'].approved.setValue(false);
          this.addItem();
          n=i + 1;
        })
        this.removeItem(n);
      // }
    // )
  }
  checkAllItems(val: boolean) {
    if(val == true) {
      this.ratesApprovals.forEach((item, i) => {
        this.fval.approveReduceRates['controls'][i]['controls'].approved.setValue(val);
      })
    } else {
      this.ratesApprovals.forEach((item, i) => {
        this.fval.approveReduceRates['controls'][i]['controls'].approved.setValue(false);
      })
    }
  }
  deselectAll(val: boolean){
    // console.log(this.fval.approveAreas["controls"][val]["controls"].approved.value)
    if(this.fval.approveReduceRates["controls"][val]["controls"].approved.value == true) {
      this.fval.selectAll.setValue(false);
    }
  }
  revert() {
    this.userForm.reset();
  }

  refresh() {
    location.reload();
  }

  get fval() {
    return this.userForm.controls;
  }

  disableForm () {
    return this.userForm.disable()
  }

  enableEdit() {
    return this.userForm.enable()
  }

  approveItems () {
    const itemsApproved = [];
    this.ratesApprovals.forEach((item, i) => {
      if(
        this.fval.approveReduceRates['controls'][i]['controls'].approved.value == true
      ) {
        item.status = 2;
        itemsApproved.push(item)
      }
    })

    console.log(itemsApproved.length)
    if(itemsApproved.length > 0) {
      setTimeout(() => {
        this.router.navigate([
          'centralmanagement/dashboard'
        ]);
      }, 3000);
    } else {
      // alert("Please select something")
      return
    }
  }
  rejectItems () {
    const itemsRejected = [];
    this.ratesApprovals.forEach((item, i) => {
      if(
        this.fval.approveReduceRates['controls'][i]['controls'].approved.value == true
      ) {
        item.status = 1;
        itemsRejected.push(item)
      }
    })
    console.log(itemsRejected.length)
    if(itemsRejected.length > 0) {
      setTimeout(() => {
        this.router.navigate([
          'centralmanagement/dashboard'
        ]);
      }, 3000);
    } else {
      // alert("Please select something")
      return
    }
  }
}

