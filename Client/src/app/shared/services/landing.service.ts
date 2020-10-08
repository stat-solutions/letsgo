import { of } from 'rxjs';
import { LoadingModel } from './../models/loadingModel';
import { Injectable } from '@angular/core';
import * as momemt from 'moment'

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  private createdAt = momemt(1577826000000).format('MM/DD/YYYY, h:mm:ss ')
  private myCreatedAt = momemt(1588280400000).format('MM/DD/YYYY, h:mm:ss ')
  private userData  = [
    {
      Id: 1,
      Customer: "Nicolas",
      LoanType: "Group",
      LoanProduct: "product 1",
      Tenure: 9,
      Amount: 500000,
      Stage: "Application",
      Status: "Notforwaded",
      LoanMovedBy: "Branch office",
      StageAt: this.createdAt,
      HowLong:4,
      CreatedAt: this.createdAt,
      LoanStatus:"running"
    },
    {
      Id: 2,
      Customer: "Chiller",
      LoanType: "Group",
      LoanProduct: "product 2",
      Tenure: 12 ,
      Amount: 500000,
      Stage: "Branch",
      Status: "forwaded",
      LoanMovedBy: "Branch office",
      StageAt: this.myCreatedAt,
      HowLong: 2,
      LoanStatus:"rejected",
      CreatedAt:this.myCreatedAt
    },
    {
      Id: 3,
      Customer: "Katende",
      LoanType: "SME",
      LoanProduct: "product 3",
      Tenure: 5,
      Amount: 500000,
      Stage: "Branch",
      Status: "forwaded",
      LoanMovedBy: "Branch office",
      HowLong: 3,
      LoanStatus:"disbursed",
      StageAt:this.createdAt,
      CreatedAt:this.createdAt
    },
    {
      Id: 4,
      Customer: "Henry",
      LoanType: "Group",
      LoanProduct: "product 1",
      Tenure: 3,
      Amount: 500000,
      Stage: "Application",
      Status: "Notforwaded",
      LoanMovedBy: "Branch office",
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus:"approved",
      CreatedAt:this.myCreatedAt
    },
    {
      Id: 5,
      Customer: "Henry",
      LoanType: "Group",
      LoanProduct: "product 1",
      Tenure: 3,
      Amount: 500000,
      Stage: "Branch",
      Status: "forwaded",
      LoanMovedBy: "Branch office",
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus:"deferred",
      CreatedAt:this.myCreatedAt
    },
    {
      Id: 5,
      Customer: "Henry",
      LoanType: "Group",
      LoanProduct: "product 1",
      Tenure: 3,
      Amount: 500000,
      Stage: "Branch",
      Status: "forwaded",
      LoanMovedBy: "Branch office",
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus:"rejected",
      CreatedAt:this.myCreatedAt
    },
    {
      Id: 6,
      Customer: "Henry",
      LoanType: "Group",
      LoanProduct: "product 1",
      Tenure: 3,
      Amount: 500000,
      Stage: "Branch",
      Status: "forwaded",
      LoanMovedBy: "Branch office",
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus:"approved",
      CreatedAt:this.myCreatedAt
    },
  ]

  constructor() { }
  getUserData() {
    return of(this.userData)
  }
  getSpecificCustomers(stage: string) {
    return of(this.userData.filter(users=>users.Stage === stage))
    
  }
}
