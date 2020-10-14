import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BranchesService {
	  private createdTime = moment(1577826000000).format('MM/DD/YYYY, h:mm:ss ')
	private branchesInfo = [
	{
		branchNo:1,
		branchName:"HeadOffice",
		entityName:"Letshego Uganda Limited",
		district:"Kampala",
		town:"kawempe",
		createdAt:this.createdTime
	},
	{
		branchNo:2,
		branchName:"Kabala",
		entityName:"Letshego Uganda Limited",
		district:"Kampala",
		town:"kawempe",
		createdAt:this.createdTime
	},
	{
		branchNo:3,
		branchName:"Gulu",
		entityName:"Letshego Uganda Limited",
		district:"Kampala",
		town:"kawempe",
		createdAt:this.createdTime
	},
	]

  constructor() { }
  getAllBranches(){
  	return of(this.branchesInfo)
  }
  createBranch(){

  }
}
