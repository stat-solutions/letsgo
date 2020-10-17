import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../shared/services/users.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	user = [];
	filteredUsers = [];
	search_term:string;
	formGroup:FormGroup

  constructor(private userService:UsersService, private fb:FormBuilder, private spinner:NgxSpinnerService) { }

  ngOnInit(){
  	this.userService.getAllUsers().subscribe(users=>{
  		this.user = users;
  		this.filteredUsers = this.user
  	})
  	this.formGroup = this.fb.group({
  		search_text:['']
  	})
  }

  get fval(){
  	return this.formGroup.controls;
  }
    getValue(event) {
    console.log(event.target.value)
    this.search_term = event.target.value
    if(event.target.value === ''){
      return this.filteredUsers = this.user
    }
    else{
          this.filteredUsers =  this.filterCustomer(this.search_term)
  
    }

  }
  filterCustomer(searchTerm:string){
    if(searchTerm)
    return this.filteredUsers.filter(
      user=>user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      )

  }
  getFormValue(){
     this.filteredUsers =  this.filterCustomer(this.fval.search_text.value);
    
  }
  checkArrayLength(array:Array<any>){
  	return array.length?true:false
  }
  deleteUser(id, name){
  	const bool = confirm(`Are u sure u want to delete to delete ${name}`);
  	if(bool){
  		this.userService.deleteUser(id)
  		alert(`${name} deleted successfully`)
  	}
  	else{
  		return;
  	}


  }


}
