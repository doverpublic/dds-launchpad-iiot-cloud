import { HttpService } from '../shared/services/http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {AppConstants } from '../config/app.constants';
import {map} from 'rxjs/operators';
import { HttpClient,HttpResponse,HttpHeaders,HttpRequest,HttpHeaderResponse } from '@angular/common/http';

@Injectable()
export class TrailercompanyService {
    public mySpaceBackendUrl: string;
    public themeCommonPath: string;
    public token: string;
    constructor(private httpService: HttpService, private appConstants: AppConstants,private http: HttpClient) { }
    setUrl() {
        this.mySpaceBackendUrl = this.appConstants.getConstants().mySpaceBackendUrl;
        this.themeCommonPath = this.appConstants.getConstants().themeCommonPath;
        this.token = this.appConstants.getConstants().token;
      }
     
      getData = () => {
        this.setUrl();
        var self = this, header = { 'Content-Type': 'application/json; charset=utf-8' };
        return self.httpService.send(this.mySpaceBackendUrl+"/posts" , 'get', null, header);
    }
      createTrailerData=(formdata)=>{
        this.setUrl();
        var self = this, header = { 'Content-Type': 'application/json' };
        return self.httpService.send(this.mySpaceBackendUrl+"/posts" , 'post', formdata, header);

      }
      getCommentsData = (id:any) => {
        this.setUrl();
        var self = this, header = { 'Content-Type': 'application/json; charset=utf-8' };
        return self.httpService.send(this.mySpaceBackendUrl+"/comments?postId="+id , 'get', null, header);
    }

}