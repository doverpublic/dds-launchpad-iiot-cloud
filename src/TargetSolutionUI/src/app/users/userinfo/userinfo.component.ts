import { Component, OnInit } from '@angular/core';
import { CreateUsersService } from "../create-and-update-users/createUsers.service";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { UsersService } from '../Users.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {
public UserInfo;
  constructor(private data: CreateUsersService,private router: Router,private apiserivice:UsersService) { }

  ngOnInit() {
    console.log(this.data.UserInfoDisplay);
/*     this.UserInfo=this.data.UserInfoDisplay;
 */    this.getUserInfo();
  }
  getUserInfo()
  {
    this.apiserivice.getUserById(this.data.UserInfoDisplay.id).subscribe(data => {
      console.log(JSON.stringify(data));

       this.UserInfo=data;
 
      
 
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
  }
  Cancel()
  {
    this.router.navigate(['/admin/users/viewUsers']);

  }

}
