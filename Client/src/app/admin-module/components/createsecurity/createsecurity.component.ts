import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createsecurity',
  templateUrl: './createsecurity.component.html',
  styleUrls: ['./createsecurity.component.scss']
})
export class CreatesecurityComponent implements OnInit {

   registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  mySubscription: any;
  positionValue: string;
 

  constructor(
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb:FormBuilder
  ) {}

  ngOnInit() {
    this.userForm = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      security: this.fb.control(
        '',
        Validators.compose([Validators.required])
      )
    });
  }

  revert() {
    this.userForm.reset();
  }

  get fval() {
    return this.userForm.controls;
  }
  
  onCreate() {
    console.log(this.userForm)

    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return ;
      //return;
    } else {

       //pass the value to database

        this.registered = true;
    }
  }
  


}
