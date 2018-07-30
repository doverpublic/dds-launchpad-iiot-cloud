import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { MSALService } from '../services/msal.service';
import { AppConfig } from '../../config/app.config';
import { CanActivate } from '@angular/router';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private msalService: MSALService) { }
    canActivate(): Observable<boolean> {
        let isLogin = new Observable(observer => {
            observer.next(42);
        });
      /*   const urlParams = new URLSearchParams(window.location.hash);

        if (urlParams.get('id_token') !== null || urlParams.get('id_token') !== undefined) {
            window.sessionStorage.setItem('msal.idtoken', urlParams.get('id_token'));
          } */
          
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
