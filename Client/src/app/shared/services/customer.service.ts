import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {CustomerModel} from '../models/customer-model'

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor() {}
  private customerTable: CustomerModel[] = [
    {
      customerId: 1,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 2,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 3,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 4,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 5,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 3,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 4,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 5,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 3,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 4,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 5,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 6,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 7,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 3,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 4,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 5,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 3,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 4,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    },
    {
      customerId: 5,
      customerName: 'katende',
      documentType: 'National ID',
      documentId: '12345678',
      userName: 'Nicholas',
      phoneNumber1: '0759983853',
      phoneNumber2: '0734780335',
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    }
  ];
  getCustomers() {
    return of(this.customerTable);
  }
  addCustomer(data: any) {
    console.log(data);
    let lastId = this.customerTable.slice(-1);
    const newId = lastId[0].customerId + 1;
    //const newcustomerId = lastcustomerId++
    const newUserInfo = {
      customerId: newId,
      customerName: data.full_name,
      documentType: 'village',
      documentId: data.document_type,
      userName: 'katende',
      phoneNumber1: data.user_contact_number,
      phoneNumber2: data.user_contact_two,
      createdAt: moment(new Date()).format('MM/DD/YYYY'),
    };
    this.customerTable.push(newUserInfo);
  }
  getCustomer(customerId: number) {
    return of(
      this.customerTable.find(
        (allCustomers) => allCustomers.customerId === customerId
      )
    );
  }
}
