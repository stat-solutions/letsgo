import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customerTable = []

  constructor(private customer:CustomerService) { }
  ngOnInit() {
    setTimeout(()=>{
      this.customer.getCustomers().subscribe(data => {
        this.customerTable = data
      })
    }, 0)

  }
  checkTable(array:Array<any>){
    return array.length?true:false
  }

}

