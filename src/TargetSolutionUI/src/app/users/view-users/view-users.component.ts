import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUsersService } from '../create-and-update-users/createUsers.service';
import { ToastrService } from 'ngx-toastr';
import { TabsetComponent } from 'ngx-bootstrap';

import { UsersService } from '../Users.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import  * as _  from  "lodash";

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  gridUsersData: any;
  public createEditUusers;
  public indexvalue;
  public currentIndex:number=0;
  functionalitychecklist = [{ "name": "Users", "associate": true, "edit": true, "delete": true }];
  tabs: any[] = [
    {
      title: 'User Info',
      content: 'User Info',
      customClass: 'customClass'
    },
    {
      title: 'Address & Contact Info',
      content: 'Address & Contact Info',
      customClass: 'customClass'
    }
  ];
  previous(i)
{

  console.log(this.staticTabs.tabs[i].active);
  this.staticTabs.tabs[i-1].active = true;

}
next(i)
{
  this.staticTabs.tabs[i+1].active = true;

}

  constructor(private spinner:NgxSpinnerService,private data:UsersService,private usersServiceData: CreateUsersService, private router: Router, private toastr: ToastrService) {
    this.gridUsersData = [];
   /*  [
      {
        id: "0",
        file: '',
        firstname: 'Harry',
        lastname: 'Potter',
        RoleType:'System Admin',
        ToggleActive:'Active',
        username: 'John',
        email:'johnAd1234@gmail.com',
        address: "First phase bangalore",
        country: {
          "id": "3",
          "sortname": "DZ",
          "name": "Algeria"
        },
        state: {
          "id": "119",
          "name": "Blidah",
          "country_id": "3"
        },
        city: {
          "id": "6148",
          "name": "Shiffa",
          "state_id": "119"
        },
        zipcode: "101",
        lattitude: "",
        logitude: "",
        selected: false
      },
      {
        id: "1",
        file: '',
        firstname: 'Harry',
        lastname: 'Potter',
        RoleType:'System Admin',
        ToggleActive:'InActive',
        username: 'John',
        email:'johnAd1234@gmail.com',
        address: "",
        country: {
          "id": "3",
          "sortname": "DZ",
          "name": "Algeria"
        },
        state: {
          "id": "119",
          "name": "Blidah",
          "country_id": "3"
        },
        city: {
          "id": "6148",
          "name": "Shiffa",
          "state_id": "119"
        },
        zipcode: "101",
        lattitude: "",
        logitude: "",
        selected: false
      },
      {
        id: "2",
        file: '',
        firstname: 'Harry',
        lastname: 'Potter',
        RoleType:'Terminal Manager',
        ToggleActive:'InActive',
        username: 'John',
        email:'johnAd1234@gmail.com',
        address: "",
        country: {
          "id": "3",
          "sortname": "DZ",
          "name": "Algeria"
        },
        state: {
          "id": "119",
          "name": "Blidah",
          "country_id": "3"
        },
        city: {
          "id": "6148",
          "name": "Shiffa",
          "state_id": "119"
        },
        zipcode: "101",
        lattitude: "",
        logitude: "",
        selected: false
      },
      {
        id: "3",
        file: '',
        firstname: 'Harry',
        lastname: 'Potter',
        RoleType:'Dispatcher',
        ToggleActive:'InActive',
        username: 'John',
        email:'johnAd1234@gmail.com',
        address: "",
        country: {
          "id": "3",
          "sortname": "DZ",
          "name": "Algeria"
        },
        state: {
          "id": "119",
          "name": "Blidah",
          "country_id": "3"
        },
        city: {
          "id": "6148",
          "name": "Shiffa",
          "state_id": "119"
        },
        zipcode: "101",
        lattitude: "",
        logitude: "",
        selected: false
      },
      {
        id: "4",
        file: '',
        firstname: 'Harry',
        lastname: 'Potter',
        RoleType:'System Admin',
        ToggleActive:'InActive',
        username: 'John',
        email:'johnAd1234@gmail.com',
        address: "",
        country: {
          "id": "3",
          "sortname": "DZ",
          "name": "Algeria"
        },
        state: {
          "id": "119",
          "name": "Blidah",
          "country_id": "3"
        },
        city: {
          "id": "6148",
          "name": "Shiffa",
          "state_id": "119"
        },
        zipcode: "101",
        lattitude: "",
        logitude: "",
        selected: false
      },
      {
        id: "5",
        file: '',
        firstname: 'Harry',
        lastname: 'Potter',
        RoleType:'Maintenance Technician',
        ToggleActive:'InActive',
        username: 'John',
        email:'johnAd1234@gmail.com',
        address: "",
        country: {
          "id": "3",
          "sortname": "DZ",
          "name": "Algeria"
        },
        state: {
          "id": "119",
          "name": "Blidah",
          "country_id": "3"
        },
        city: {
          "id": "6148",
          "name": "Shiffa",
          "state_id": "119"
        },
        zipcode: "101",
        lattitude: "",
        logitude: "",
        selected: false
      },
      {
        id: "6",
        file: '',
        firstname: 'Harry',
        lastname: 'Potter',
        RoleType:'System Admin',
        ToggleActive:'InActive',
        username: 'John',
        email:'johnAd1234@gmail.com',
        address: "",
        country: {
          "id": "3",
          "sortname": "DZ",
          "name": "Algeria"
        },
        state: {
          "id": "119",
          "name": "Blidah",
          "country_id": "3"
        },
        city: {
          "id": "6148",
          "name": "Shiffa",
          "state_id": "119"
        },
        zipcode: "101",
        lattitude: "",
        logitude: "",
        selected: false
      },
      {
        id: "7",
        file: '',
        firstname: 'Harry',
        lastname: 'Potter',
        RoleType:'Dispatcher',
        ToggleActive:'InActive',
        username: 'John',
        email:'johnAd1234@gmail.com',
        address: "",
        country: {
          "id": "3",
          "sortname": "DZ",
          "name": "Algeria"
        },
        state: {
          "id": "119",
          "name": "Blidah",
          "country_id": "3"
        },
        city: {
          "id": "6148",
          "name": "Shiffa",
          "state_id": "119"
        },
        zipcode: "101",
        lattitude: "",
        logitude: "",
        selected: false
      },
      {
        id: "8",
        file: '',
        firstname: 'Harry',
        lastname: 'Potter',
        RoleType:'Terminal Manager',
        ToggleActive:'InActive',
        username: 'John',
        email:'johnAd1234@gmail.com',
        address: "",
        country: {
          "id": "3",
          "sortname": "DZ",
          "name": "Algeria"
        },
        state: {
          "id": "119",
          "name": "Blidah",
          "country_id": "3"
        },
        city: {
          "id": "6148",
          "name": "Shiffa",
          "state_id": "119"
        },
        zipcode: "101",
        lattitude: "",
        logitude: "",
        selected: false
      }
    ];
 */
  }
  ngOnInit() {
    this.getUserList();
 }
 getUserList()
 {
   this.data.getData().subscribe(data => {
     if(this.isEmpty(data[0]))
     {
       console.log("empty");
       this.gridUsersData.length=0;
     }
     else
     {
       console.log("not empty");

       this.gridUsersData=data;

     }
     console.log(JSON.stringify(data));
     this.spinner.hide();

       }, (err: HttpErrorResponse) => {
         if (err.error instanceof Error) {
           console.log("Client-side error occured.");
         } else {
           console.log("Server-side error occured.");
         }
       });
 }

 deleteUserFunction(id)
 {
   
   this.data.deleteUser(id).subscribe(data => {
     console.log(data);
     this.getUserList();
     this.toastr.info('User Deleted');

       }, (err: HttpErrorResponse) => {
         if (err.error instanceof Error) {
           console.log("Client-side error occured.");
         } else {
           console.log("Server-side error occured.");
           this.getUserList();
           this.toastr.info('User Deleted');
         }
       });
 }

 createNewUsersdeatil() {
   this.usersServiceData.UsersData = [];

   this.router.navigate(['admin/users/createUpdateUsers']);

 }
 EditUser(event) {
   this.usersServiceData.UsersData = event;
   this.router.navigate(['admin/users/createUpdateUsers']);
 }
 deleteUser(event) {
   var index = _.findIndex(this.gridUsersData, event)
   console.log(event);
  this.deleteUserFunction(event.id);

    
 }
 displayUserDetail(event)
 {
  this.usersServiceData.UserInfoDisplay=event;
  this.router.navigate(['admin/users/userInfo']);

 }
 createUsersData() {
   this.usersServiceData.UsersData = [];

   this.router.navigate(['admin/users/createUpdateUsers']);

 }
 isEmpty(obj) {
   for (var key in obj) {
     if (obj.hasOwnProperty(key))
       return false;
   }
   return true;
 }
}
