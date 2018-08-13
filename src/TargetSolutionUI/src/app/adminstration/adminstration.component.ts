import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MSALService} from '../shared/services/msal.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-adminstration',
  templateUrl: './adminstration.component.html',
  styleUrls: ['./adminstration.component.scss']
})
export class AdminstrationComponent implements OnInit {
  ngOnInit()
  {
   this.spinner.hide();
    
  }
  constructor(private router: Router, public service: MSALService,private spinner:NgxSpinnerService){    
  }
}
