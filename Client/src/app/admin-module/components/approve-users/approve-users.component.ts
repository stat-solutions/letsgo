import { UserToProveService } from './../../../shared/services/user-to-prove.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.component.html',
  styleUrls: ['./approve-users.component.scss']
})
export class ApproveUsersComponent implements OnInit {
  users = [];
  approvedUsers = []
  roles:Array<string> = ['Role 1', 'Role2', 'Role3']
  selecteRoles: FormGroup;
  form: FormGroup;
  enableApprove: boolean = false;
  NotEnabled:boolean =  true
  constructor(private UserToProveService:UserToProveService, private spinner:NgxSpinnerService, private fb:FormBuilder) { }
  ngOnInit() {

    setTimeout(() => {
      this.UserToProveService.approveUsers().subscribe(allusers => {
        //console.log(allusers)
        this.users = allusers
        //this.spinner.hide()
        this.form = this.createFormGroup();
        this.initialiseForm();
      })
    }, 3000)
    setTimeout(() => {
      this.UserToProveService.approvedUsers().subscribe(approvedUser => {
        this.approvedUsers = approvedUser
        //this.spinner.hide()
      })
    }, 3000)
    // this.selecteRoles = new FormGroup({
    //   selectRole: new FormControl()
    // })


  }
  createFormGroup() {
    return this.fb.group({
      approveUsers:this.fb.array([this.user])
    })
  }
  get user(): any {
    return this.fb.group({
      role: this.fb.control({ value: '', },Validators.compose([Validators.required])),
      name:this.fb.control({value:""}),
      id: this.fb.control({value:""}),
      // approveBtn: this.fb.control({disabled: true}),
    });
  }
  get fval(){
    return this.form.controls
  }

  initialiseForm(): any {
    let n: number;
    this.users.forEach((item, i) => {
          console.log(item.name);
          console.log(i);
      this.fval.approveUsers['controls'][i].controls.id.setValue(item.id);
      this.fval.approveUsers['controls'][i].controls.name.setValue(item.name);
          this.addItem();
          n = i + 1;
        });
    this.removeItem(n);
      // }
    // )
  }

  enableToApprove(i: number) {
    if (this.fval.approveUsers['controls'][i].controls.role.value !== '') {
      // this.fval.approveUsers['controls'][i].controls.approveBtn.disabled = false;
    }
  }

  addItem(): any {
    (this.fval.approveUsers as FormArray).push(this.user);
  }

  removeItem(index: number): any {
    (this.fval.approveUsers as FormArray).removeAt(index);
  }

  checkIfUserExists(array:Array<any>) {
    const length = array.length
    if (length >=1) {
      //this.spinner.hide()
      return true
    }
    else {
     // this.spinner.show()
      return false
    }
    
    
  }
  
  approve(id: number) {
    // if (this.selecteRoles.controls.selecteRole.value === '') {
    //   alert('Assign a role to a user')
    // }
    // else {
    //   //console.log(this.selectedRole.value)
    //   this.UserToProveService.approveUser(id, this.selecteRoles.controls.selecteRole.value)
      
    // }
    if (this.fval.approveUsers['controls'][id]['controls'].role.value === '') {
      return;
    }
    else {
      console.log(this.fval.approveUsers['controls'][id].controls.id.value);
      console.log(this.fval.approveUsers['controls'][id].controls.name.value);
      console.log(this.fval.approveUsers['controls'][id]['controls'].role.value);
    }
  }

}
