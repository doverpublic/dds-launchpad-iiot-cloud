import { Component } from '@angular/core';
import * as $ from 'jquery';
import * as _ from "lodash";
import { MSALService} from './shared/services/msal.service';
import { Router } from '@angular/router';
import { setTheme } from 'ngx-bootstrap/utils';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router, public service: MSALService,private spinner: NgxSpinnerService){
        setTheme('bs4'); // or 'bs4'
      
  }
  /** spinner starts on init */
ngOnInit() {
  /** spinner starts on init */
this.spinner.show();
setTimeout(() => {
  this.spinner.hide(); // To hide the spinner
}, 1000);
}
/*   ngOnInit()
  {
    if(this.service.isOnline()) {
      this.router.navigate(['']);
  }else {
    console.log("login");
      this.service.login();
  }
   
    
  } */

}
