import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { LoaningService } from 'src/app/shared/services/loaning.service';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customerDetails = [];

  constructor(
    // private ActivatedRoute: ActivatedRoute,
    private customerService: LoaningService
    ) { }

  ngOnInit(): void {}

}
