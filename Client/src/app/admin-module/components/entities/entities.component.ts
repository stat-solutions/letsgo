import { Component, OnInit } from '@angular/core';
import {EntitiesService} from '../../../shared/services/entities.service'
@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {
	entities = []

  constructor(private EntityService:EntitiesService) { }

  ngOnInit(){
  	this.EntityService.getEntities().subscribe(allentities=>{
  		console.log(allentities)
  		this.entities = allentities
  	})

  }

}
