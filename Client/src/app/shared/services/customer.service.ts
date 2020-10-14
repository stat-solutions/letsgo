import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }
 private customerTable = [{
    id: 1,
    name: "katende",
    document_type: "National ID",
    document_id:"12345678",
    phone1: "0759983853",
    phone2:"0759461148",
    createdAt:moment(new Date()).format("MM/DD/YYYY")
  },
  {
    id: 2,
    name: "katende",
    status: "status 1",
    document_type:"Passport",
    document_id:"12345789",
    phone1: "0759983853",
    phone2:"0759461148",
    createdAt:moment(new Date()).format("MM/DD/YYYY")
  },
  ]
  getCustomers() {
    return of(this.customerTable)
  }
  addCustomer(data: any) {
    console.log(data)
    let lastId = this.customerTable.slice(-1)
    const newId = lastId[0].id+1
    //const newId = lastId++
    const newUserInfo = {
      id:newId,
      name: data.full_name,
      document_id:"12345678",
      document_type: data.document_type,
      phone1: data.user_contact_number,
      phone2: data.user_contact_two,
      createdAt:moment(new Date()).format("MM/DD/YYYY")
    }
    this.customerTable.push(newUserInfo)

  }
  getCustomer(id:number){
    return of(this.customerTable.find(allCustomers=>allCustomers.id === id))
  }
}
