import { Injectable } from '@angular/core';
import {Constants} from '../models/loanconstant';
import {of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }
  private constants:Constants[] = [
  {
  	 id:1,
    loanType:'Group',
    loanproduct:'SME',
    timeThreshold:1,
    tenure:8,
    maximumAmount:200000
  },
  {
  	 id:2,
    loanType:'Group',
    loanproduct:'SME',
    timeThreshold:1,
    tenure:8,
    maximumAmount:200000
  },
  {
  	 id:3,
    loanType:'Group',
    loanproduct:'SME',
    timeThreshold:1,
    tenure:8,
    maximumAmount:200000
  },
  {
  	 id:4,
    loanType:'Group',
    loanproduct:'SME',
    timeThreshold:1,
    tenure:8,
    maximumAmount:200000
  },
  
  ]

  getAllConstants(){
  	return of(this.constants)
  }
}
