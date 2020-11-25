import { UserToProveService } from './../../../shared/services/user-to-prove.service';
import { Component, OnInit, TemplateRef, ElementRef,ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {Registration} from 'src/app/shared/models/registration-interface'
@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.component.html',
  styleUrls: ['./approve-users.component.scss'],
})
export class ApproveUsersComponent implements OnInit {
  users:Registration[] = [];
  filteredUsers = []
  approvedUsers:Registration[] = []
  roles:Array<string> = ['Role 1', 'Role2', 'Role3']
  bsModalRef:BsModalRef;
  userName:string;
  userRole:FormGroup;
  userId:number;
  userIndex:number;
  makeUserApproved = [];
  disableButton:boolean =true;
  key:any = "userId";
  @ViewChild('exportTable')element:ElementRef
  search_user:string
  constructor(private UserToProveService:UserToProveService,
   private spinner:NgxSpinnerService, private fb:FormBuilder, private bsModalService:BsModalService) { }
  ngOnInit() {

      this.UserToProveService.approveUsers().subscribe(allusers => {
        this.users = allusers
      })
      this.filteredUsers = this.users
      this.userRole = this.fb.group({
        role:['', Validators.required]
      })
  }
  checkIfUserExists(array:Array<any>):boolean {
    return array.length?true:false
  }
  //closemodal popup
  closeModal(){
    this.bsModalRef.hide()
  }

  //getrole FormControl
  get fval(){
    return this.userRole.controls;
  }
  getValue(event) {
    this.search_user = event.target.value
    if(event.target.value === ''){
      this.filteredUsers = this.users
      //this.totalItems = this.users.length;


    }
    else{
          this.filteredUsers =  this.filterUser(this.search_user)
          //this.totalItems = this.users.length;

    }
  }
  filterUser(searchTerm:string){
    if(searchTerm)

    return this.filteredUsers.filter(
      user=>
      user.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ||user.userEmail.toLowerCase().indexOf(searchTerm.toLowerCase())!==   -1
      )

  }



   cancel(){

     this.closeModal()

   }
    assignRole(event){
      this.fval.role.setValue(event.target.value)
      this.disableButton = false



    }

    approveUser(template:TemplateRef<any>, id:number, index:number){
      this.bsModalRef =  this.bsModalService.show(template);
      this.makeUserApproved.push(this.users[index])
      if(this.checkIfUserExists(this.makeUserApproved)){
        this.userId = id;
        this.userIndex = index;
      }
    }
   onApprove(array:Array<any> , id, index){
     if(this.checkIfUserExists(array)){
       console.log(this.fval.role.value)
       this.disableButton = !this.disableButton
       this.fval.role.reset()
       this.closeModal()


     }

   }
   reverse:boolean = false;
  sort(item:string){
    this.key = item;
    this.reverse = !this.reverse
  }


}
