import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
	private entityDetails = [
	{
		id:1,
		entityName:"Letshego Uganda Limited",
		shortName:"Letshego",
		branches:23,
		plot:"Located 5km away from bombo road",
		description:"This is a company dealing in loans"
	}]

  constructor() { }

  getEntities(){
  	return of(this.entityDetails)
  }

}
