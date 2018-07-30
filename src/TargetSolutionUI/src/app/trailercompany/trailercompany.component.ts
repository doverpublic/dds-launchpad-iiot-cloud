import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CreateTrailerService } from './create-and-edit-trailer-data/createTrailer.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MSALService} from '../shared/services/msal.service';
import { TrailercompanyService } from './trailercompany.service';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import * as _ from "lodash";

@Component({
  selector: 'app-trailercompany',
  templateUrl: './trailercompany.component.html',
  styleUrls: ['./trailercompany.component.scss']
})
export class TrailercompanyComponent implements OnInit {
  public id: any;

constructor(private service:MSALService,private data:TrailercompanyService )
{

}
  ngOnInit() {
  

/*     this.GetTrailerList();
 */  }


GetTrailerList(){
  this.data.getData().subscribe(data => {
console.log(JSON.stringify(data));
  }, (err: HttpErrorResponse) => {
    if (err.error instanceof Error) {
      console.log("Client-side error occured.");
    } else {
      console.log("Server-side error occured.");
    }
  });

}

}

