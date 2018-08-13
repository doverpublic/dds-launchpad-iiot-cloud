import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { MSALService } from '../services/msal.service';
import { AppConfig } from '../../config/app.config';
import { CanActivate } from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private msalService: MSALService) { }
    canActivate(): Observable<boolean> {
        let isLogin = new Observable(observer => {
            observer.next(42);
        });
        
       /*  return isLogin.map(() => {
            return true;
        }).take(1); */
          
        if (this.msalService.isOnline()) {
            return isLogin.map(() => {
                return true;
            }).take(1);
        }
        else {
            return isLogin.map(() => {
                this.msalService.login();
                return false;
            }).take(1);
        } 
    }
}
