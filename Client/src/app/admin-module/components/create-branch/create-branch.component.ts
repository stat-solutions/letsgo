import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.scss']
})
export class CreateBranchComponent implements OnInit {

  
    registered = false;
  submitted = false;
  errored = false;
  posted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  positionValue: string;
  invalid: boolean = false;
  entity_name = ["Letshego Uganda Limited"]

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
      branch_name:this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      entityName: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      district: this.fb.control(
        '',
        Validators.compose([Validators.required])
      ),
      town: this.fb.control(
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
    
getEntityName(event){
  const entity = event.target.value.split(":")[1]
 this.fval.entityName.setValue(entity)
}
  

  returnHome() {
    this.spinner.hide();
    this.revert()
  }
  

  createBranch() {
    console.log(this.userForm)
    
    this.submitted = true;
    this.spinner.show();
    if (this.userForm.invalid === true) {
      return this.invalid = true
      //return;
    } else {
      
      // this.authService.registerUser(this.userForm).subscribe(
      //   () => {
      //     this.posted = true;
      //     this.spinner.hide();
      //     setTimeout(() => {
      //       this.router.navigate(['authpage/login']);
      //     }, 3000);
      //   },
      //   (error: string) => {
      //     this.spinner.hide();
      //     this.errored = true;
      //     this.serviceErrors = error;
      //     setTimeout(() => {
      //       location.reload();
      //     }, 3000);
      //     console.log(error);
      //   }
      // );

        this.registered = true;
    }
  }

}
