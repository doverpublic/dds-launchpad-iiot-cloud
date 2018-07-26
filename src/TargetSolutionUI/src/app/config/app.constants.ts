import { Injectable } from '@angular/core';
@Injectable()
export class AppConstants {
    private constants = {
        mySpaceBackendUrl: "https://jsonplaceholder.typicode.com",
        themeCommonPath: 'comments',
        themeImagePath: 'http://192.168.101.212:8082/',
        token: "Bearer 0ce671ae-20e9-4df9-842d-fce84f873730",
    };

    private host = {
        "hostname": "192.168.101.212",
        "port": "8082",
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