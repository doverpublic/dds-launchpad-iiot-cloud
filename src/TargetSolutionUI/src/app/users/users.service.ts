import { HttpService } from '../shared/services/http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {AppConstants } from '../config/app.constants';
import {map} from 'rxjs/operators';
import { HttpClient,HttpResponse,HttpHeaders,HttpRequest,HttpHeaderResponse } from '@angular/common/http';

@Injectable()
export class UsersService {
    public BackendUrl: string;
    public token: string;
    constructor(private httpService: HttpService, private appConstants: AppConstants,private http: HttpClient) { }
    setUrl() {
        this.BackendUrl = this.appConstants.getConstants().BackendUrl;
        this.token = this.appConstants.getConstants().token;
      }
     
      getData = () => {
        this.setUrl();
        var self = this, header = { 'Content-Type': 'application/json; charset=utf-8' };
        return self.httpService.send(this.BackendUrl+"/entity/User/all" , 'get', null, header);
    }
    getNewSample = () => {
      this.setUrl();
      var self = this, header = { 'Content-Type': 'application/json; charset=utf-8' };
      return self.httpService.send(this.BackendUrl+"/entity/User/new" , 'get', null, header);
  }
      createUserData=(formdata)=>{
        this.setUrl();
        var self = this, header = { 'Content-Type': 'application/json' };
        return self.httpService.send(this.BackendUrl+"/entity/User" , 'post', formdata, header);

      }
      getUserById = (id:any) => {
        this.setUrl();
        var self = this, header = { 'Content-Type': 'application/json; charset=utf-8' };
        return self.httpService.send(this.BackendUrl+"/entity/User/id/"+id , 'get', null, header);
    }
     deleteUser=(id:any)=> {
      this.setUrl();
      var self = this, header = { 'Content-Type': 'application/json; charset=utf-8' };
      return self.httpService.send(this.BackendUrl+"/entity/User/"+id , 'delete', null, header);
  }
  EditUser=(formdata)=>{
    this.setUrl();
    var self = this, header = { 'Content-Type': 'application/json' };
    return self.httpService.send(this.BackendUrl+"/entity/User" , 'put', formdata, header);

  }
}