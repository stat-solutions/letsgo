import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { of } from 'rxjs';
import {Branch} from '../models/branch-model'
@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  private createdTime = moment(1577826000000).format('MM/DD/YYYY, h:mm:ss ');
  private branchesInfo: Branch[] = [
    {
      branchNumber: 1,
      branchName: 'HeadOffice',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 2,
      branchName: 'Kabala',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 3,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 4,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 5,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 3,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 4,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 5,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },

    {
      branchNumber: 6,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 7,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 3,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 4,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 5,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 3,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 4,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
    {
      branchNumber: 5,
      branchName: 'Gulu',
      entityName: 'Letshego Uganda Limited',
      district: 'Kampala',
      town: 'kawempe',
      createdAt: this.createdTime,
    },
  ];

  constructor() {}
  getAllBranches() {
    return of(this.branchesInfo);
  }
  createBranch() {}
}
