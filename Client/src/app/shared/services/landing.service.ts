import { of } from 'rxjs';
import { LoadingModel } from './../models/loadingModel';
import { Injectable } from '@angular/core';
import * as momemt from 'moment'

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  private createdAt = momemt(1577826000000).format('MM/DD/YYYY, h:mm:ss ')
  private myCreatedAt = momemt(1588280400000).format('MM/DD/YYYY, h:mm:ss ')
  private loanData  = [
    {
      Id: 1,
      Customer: 'Nicolas',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 9,
      Amount: 500000,
      Stage: 'Application',
      Status: 'Notforwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.createdAt,
      HowLong: 4,
      CreatedAt: this.createdAt,
      LoanStatus:"running",
      comment:"loan created",
      Branch:"Application",
      userName:"Katende Nicholas"
    },
    {
      Id: 2,
      Customer: 'Chiller',
      LoanType: 'Group',
      LoanProduct: 'product 2',
      Tenure: 12,
      Amount: 500000,
      userName:"Katende Nicholas"
    },
    {
      Id: 3,
      Customer: 'Katende',
      LoanType: 'SME',
      LoanProduct: 'product 3',
      Tenure: 5,
      Amount: 500000,
      Stage: 'BranchExit',
      LoanMovedBy: 'Branch office',
      HowLong: 3,
      LoanStatus:"disbursed",
      StageAt:this.createdAt,
       CreatedAt:this.myCreatedAt,
      comment:"loan forwarded",
      Branch:"BranchApproval",
      userName:"Katende Nicholas"

    },
    {
      Id: 4,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'Regional',
      Status: 'Notforwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus:"approved",
       CreatedAt:this.myCreatedAt,
      comment:"loan forwarded",
      Branch:"BranchApproval",
      userName:"Katende Nicholas"

    },
    {
      Id: 5,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'loanVerification',
      Status: 'forwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus:"deferred",
            CreatedAt:this.myCreatedAt,
      comment:"loan forwarded",
      Branch:"BranchApproval",
      userName:"Katende Nicholas"

    },
    {
      Id: 5,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'Branch',
      Status: 'forwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus:"rejected",
            CreatedAt:this.myCreatedAt,
      comment:"loan forwarded",
      Branch:"BranchApproval",
      userName:"Katende Nicholas"

    },
    {
      Id: 6,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'Branch',
      Status: 'forwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus:"approved",
            CreatedAt:this.myCreatedAt,
      comment:"loan forwarded",
      Branch:"BranchApproval",
      userName:"Katende Nicholas"

    },
    {
      Id: 7,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'Branch',
      Status: 'forwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus:"approved",
      CreatedAt:this.myCreatedAt,
      comment:"loan created",
      Branch:"Application",
      userName:"Katende Nicholas"
    },
    {
      Id: 8,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'Branch',
      Status: 'forwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus:"approved",
       CreatedAt:this.myCreatedAt,
      comment:"loan forwarded",
      Branch:"BranchApproval",
      userName:"Katende Nicholas"
    },
    {
      Id: 9,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'Branch',
      Status: 'forwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus:"approved",
            CreatedAt:this.myCreatedAt,
      comment:"loan forwarded",
      Branch:"BranchApproval",
      userName:"Katende Nicholas"
    },
    {
      Id: 10,
      Customer: 'Henry',
      LoanType: 'Group',
      LoanProduct: 'product 1',
      Tenure: 3,
      Amount: 500000,
      Stage: 'Branch',
      Status: 'forwaded',
      LoanMovedBy: 'Branch office',
      StageAt: this.myCreatedAt,
      HowLong: 1,
      LoanStatus:"approved",
      CreatedAt:this.myCreatedAt,
      comment:"loan forwarded",
      Branch:"BranchApproval",
      userName:"Katende Nicholas"

    },
  ];

  constructor() { }
  getloanData() {
    return of(this.loanData)
  }
  getSpecificCustomers(stage: string) {
    return of(this.loanData.filter(loans=>loans.Stage === stage))
  }
  getLoanDetails(id:number){
    return of(this.loanData.find(loans=>loans.Id === id))
  }
}
