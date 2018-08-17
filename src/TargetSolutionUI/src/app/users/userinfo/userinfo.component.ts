import { Component, OnInit } from '@angular/core';
import { CreateUsersService } from "../create-and-update-users/createUsers.service";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {
public UserInfo;
  constructor(private data: CreateUsersService,private router: Router) { }

  ngOnInit() {
    console.log(this.data.UserInfoDisplay);
    this.UserInfo=this.data.UserInfoDisplay;
  }

  Cancel()
  {
    this.router.navigate(['/admin/users/viewUsers']);

  }

}
