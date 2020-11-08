import { Component, OnInit } from '@angular/core';
import  {ActivatedRoute} from '@angular/router';
import {LandingService} from '../../../../app/shared//services/landing.service'


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
	customerDetails = []

  constructor(private ActivatedRoute:ActivatedRoute, private customerService:LandingService) { }

  ngOnInit() {}
  
 

}

