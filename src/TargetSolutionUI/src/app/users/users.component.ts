import { Component, OnInit } from '@angular/core';
import { UsersService } from './Users.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private data:UsersService) { }

  ngOnInit() {
/*     this.CreateNewData();
 */  }

  CreateNewData()
  {
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
