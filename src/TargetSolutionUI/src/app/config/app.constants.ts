import { Injectable } from '@angular/core';
@Injectable()
export class AppConstants {
    private constants = {
        BackendUrl: "https://jsonplaceholder.typicode.com",
      // BackendUrl: "https://localhost:20300/api",
       token: "Bearer 0ce671ae-20e9-4df9-842d-fce84f873730",
    };

    private host = {
        "hostname": "",
        "port": "",
        "baseUrl": "localhost:8080"
    };
    getConstants() {
        return this.constants;
    }
    getHost() {
        return this.host;
    }
	    setToken(token){
        this.constants.token = token;
    }

}