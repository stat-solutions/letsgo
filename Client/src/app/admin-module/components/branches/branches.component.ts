import { FormControl } from '@angular/forms';
import { BranchesService } from './../../../shared/services/branches.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  AllBranches = [];
  filteredBranches = [];
  searchText: FormControl;
  // get search_term(): string{
    
  // }
  constructor(private branchService:BranchesService, private router:Router) {
  }
  
  ngOnInit() {
    this.branchService.getAllBranches().subscribe((branches) => {
      this.AllBranches = branches
    })
    this.filteredBranches = this.AllBranches
    console.log(this.filteredBranches)
    this.searchText = new FormControl('')
    console.log(this.searchText)
  }
  checkTable(array:Array<any>){
    return array.length?true:false
  }

  getValue(event) {
    console.log(event.target.value)
    this.searchText.setValue(event.target.value)
    if(event.target.value === ''){
      return this.filteredBranches = this.AllBranches
    }
    else{
          this.filteredBranches =  this.filterBranches(this.searchText.value)
  
    }

  }
  filterBranches(searchTerm:string){
    if(searchTerm)
    return this.filteredBranches.filter(
      branch=>branch.branchName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      )

  }
  getFormValue(){
     this.filteredBranches =  this.filterBranches(this.searchText.value)
     this.searchText.reset()
  }

  createBranch(){
    this.router.navigate(['admin/createbranch'])

  }


}
