import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpHeaderResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router } from '@angular/router'
@Injectable()
export class HttpService {
  constructor(private router: Router, private http: HttpClient) {
  };


  send(url: string, method: string, payload?: any, headersObject?: Object, responseType?: string/*, searchParams? : Object*/) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    method = method.toUpperCase();
    if (method == 'GET') {
      console.log("within get and url is" + url);
      return this.http.get(url, httpOptions).catch((error: any) => {
        try {
          if (error.json()) {
            if (error.status === 500) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 400) {
              return Observable.throw(new Error(error.json().errorMessage));
            } else if (error.status === 401) {
              if (error.json().error == 'invalid_token') {
                this.router.navigate(['/auth/login']);
                return Observable.throw(new Error('Session is expired. Please logout and login again'));
              }
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 403) {
              if (error.json().error == 'access_denied') {
                return Observable.throw(new Error('Access is Denied'));
              }
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 409) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 406) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
          } else {
            return Observable.throw(new Error('Unknown Exception Occured'));
          }
        } catch (err) {
          return Observable.throw(new Error(err.message));
        }
      });
    } else if (method == 'POST') {

      console.log("within Post and url is" + url);
      return this.http.post(url, payload, httpOptions).catch((error: any) => {
        try {
          if (error.json()) {
            if (error.status === 500) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 400) {
              return Observable.throw(new Error(error.json().errorMessage));
            } else if (error.status === 401) {
              if (error.json().error == 'invalid_token') {
                this.router.navigate(['/auth/login']);
                return Observable.throw(new Error('Session is expired. Please logout and login again'));
              }
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 403) {
              if (error.json().error == 'access_denied') {
                return Observable.throw(new Error('Access is Denied'));
              }
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 409) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 406) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
          } else {
            return Observable.throw(new Error('Unknown Exception Occured'));
          }
        } catch (err) {
          return Observable.throw(new Error(err.message));
        }
      });
    } else if (method == 'PUT') {
      return this.http.put(url, payload, httpOptions).map(response => response).catch((error: any) => {
        try {
          if (error.json()) {
            if (error.status === 500) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 400) {
              return Observable.throw(new Error(error.json().errorMessage));
            } else if (error.status === 401) {
              if (error.json().error == 'invalid_token') {
                this.router.navigate(['/auth/login']);

                return Observable.throw(new Error('Session is expired. Please logout and login again'));
              }
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 409) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 406) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
          } else {
            return Observable.throw(new Error('Unknown Exception Occured'));
          }
        } catch (err) {
          return Observable.throw(new Error(err.message));
        }
      });
    }
    else if (method == 'DELETE') {
      return this.http.delete(url, httpOptions).map(response => response).catch((error: any) => {
        try {
          if (error.json()) {
            if (error.status === 500) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 400) {
              return Observable.throw(new Error(error.json().errorMessage));
            } else if (error.status === 401) {
              if (error.json().error == 'invalid_token') {
                this.router.navigate(['/auth/login']);

                return Observable.throw(new Error('Session is expired. Please logout and login again'));
              }
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 409) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 406) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
          } else {
            return Observable.throw(new Error('Unknown Exception Occured'));
          }
        } catch (err) {
          return Observable.throw(new Error(err.message));
        }
      });
    }
    else if (method == 'PATCH') {
      return this.http.patch(url, payload, httpOptions).map(response => response).catch((error: any) => {
        try {
          if (error.json()) {
            if (error.status === 500) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 400) {
              return Observable.throw(new Error(error.json().errorMessage));
            } else if (error.status === 401) {
              if (error.json().error == 'invalid_token') {
                this.router.navigate(['/auth/login']);

                return Observable.throw(new Error('Session is expired. Please logout and login again'));
              }
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 409) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
            else if (error.status === 406) {
              return Observable.throw(new Error(error.json().errorMessage));
            }
          } else {
            return Observable.throw(new Error('Unknown Exception Occured'));
          }
        } catch (err) {
          return Observable.throw(new Error(err.message));
        }
      });
    }
    else {
      console.log("else part");

    }

  }

}