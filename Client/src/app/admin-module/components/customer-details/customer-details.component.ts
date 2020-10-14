import { Component, OnInit } from '@angular/core';
import  {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../../../app/shared/services/customer.service'


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
	customerDetails = []

  constructor(private ActivatedRoute:ActivatedRoute, private cusomerService:CustomerService) { }

  ngOnInit() {
  	this.ActivatedRoute.paramMap.subscribe(paramater=>{
  		const id = +paramater.get('customerid')
  		 this.cusomerService.getCustomer(id).subscribe(customerid=>{
  			const customerInfo  = Object.assign({}, customerid);
  			console.log(customerInfo)
  			this.customerDetails.push(customerInfo)
  		})
  	})
  }
  checkCustomerTable(array:Array<any>){
  	return array.length?true:false
  }

}
