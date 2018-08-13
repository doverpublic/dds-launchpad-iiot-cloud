import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MSALService} from '../shared/services/msal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, public service: MSALService){
  }
  ngOnInit() {
/*     this.router.navigate(['/admin']);
 */    if(this.service.isOnline()) {
  this.router.navigate(['/admin']);
}else {
    console.log("login");
      this.service.login();
  }
   
  }

}
