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
  }

  


}
