import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {CustomerModel} from '../models/customer-model';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpParams, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}
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
  ];
  addCustomer(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/customer/postCreateCustomer`, postData);
  }
  getAllCustomers(): any {
    return this.http.get<any>(`${this.API_URL}/api/customer/getAllCustomers`);
  }
  getAllCustomersByBranch(branchId: number): any {
    return this.http.get<any>(`${this.API_URL}/api/customer/getAllCustomersByBranch?branchId=554`);
  }

  getCustomers(): any {
    return of(this.customerTable);
  }
  getCustomer(customerId: number): any {
    //
  }
}
