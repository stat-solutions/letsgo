import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customerTable = []

  constructor(private customer:CustomerService, private router:Router) { }
  ngOnInit() {
    setTimeout(()=>{
      this.customer.getCustomers().subscribe(data => {
        this.customerTable = data
      })
    }, 3000)

  }
  checkTable(array:Array<any>){
    return array.length?true:false
  }

  createCustomer(){
    this.router.navigate(['application/createcustomer'])

  }

}
