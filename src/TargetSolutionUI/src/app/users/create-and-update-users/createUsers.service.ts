import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class CreateUsersService {
  constructor() { }
  firstname:string;
  lastname:string;
  ToggleActive:string;
  file:string;
  username: string;
  email:string;
  emailAlternate:string;
  address:string;
  country:string;
  state:string;
  city:string;
  zipcode:string;
  phonenumber:number;
  alternateNumber:number;
  fax:number;
  search:string;
  userGroup:string;
  role:string;
  AdressLineTwo:string;
  public UsersData:any;
  public UserInfoDisplay:any;
  
}
