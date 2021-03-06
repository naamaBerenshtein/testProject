import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";



@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  ]
})
export class AppComponent {
  Management(value: string) {
    if (value == "clients") {
      this._router.navigate(['/Clients'])
    }
    else if (value == "products") {
      this._router.navigate(['/Products'])
    }
    else if (value == "logins") {
      this._router.navigate(['/LoginManagemant'])
    }
    else if (value == "pastrys") {
      this._router.navigate(['/Pastrys'])
    }
    else if (value == "agents") {
      this._router.navigate(['/Agents'])
    }
  }
  SpecialOperations(value: string) {
    if (value == "תעודות משלוח לקומקס") {
      this._router.navigate(['/Comax'])
    }
    if (value == "העברה") {
      this._router.navigate(['/RemoveOrder'])
    }
  }
  constructor(private _route: ActivatedRoute, private _router: Router) { }

}

