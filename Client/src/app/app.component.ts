import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){ }
  title = 'LoanLead';
  updateME(): any{
    this.title = "Code 11 class";
  }
}
