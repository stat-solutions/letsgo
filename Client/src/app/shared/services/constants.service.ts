import { Injectable } from '@angular/core';
import {Constants} from '../models/loanconstant';
import {of} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}
  private constants: Constants[] = [
    {
      id: 1,
      loanType: 'Group',
      loanproduct: 'SME',
      timeThreshold: 1,
      tenure: 8,
      maximumAmount: 200000,
    },
    {
      id: 2,
      loanType: 'Group',
      loanproduct: 'SME',
      timeThreshold: 1,
      tenure: 8,
      maximumAmount: 200000,
    },
    {
      id: 3,
      loanType: 'Group',
      loanproduct: 'SME',
      timeThreshold: 1,
      tenure: 8,
      maximumAmount: 200000,
    },
    {
      id: 5,
      loanType: 'Group',
      loanproduct: 'SME',
      timeThreshold: 1,
      tenure: 8,
      maximumAmount: 200000,
    },
    {
      id: 6,
      loanType: 'Group',
      loanproduct: 'SME',
      timeThreshold: 1,
      tenure: 8,
      maximumAmount: 2000000,
    },
    {
      id: 7,
      loanType: 'Group',
      loanproduct: 'SME',
      timeThreshold: 1,
      tenure: 8,
      maximumAmount: 200000,
    },
    {
      id: 8,
      loanType: 'Group',
      loanproduct: 'SME',
      timeThreshold: 1,
      tenure: 8,
      maximumAmount: 10000000,
    }
  ];

  getAllConstants() {
    return of(this.constants);
  }
}
