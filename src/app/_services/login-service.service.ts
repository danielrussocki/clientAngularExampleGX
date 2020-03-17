import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../models/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  API_URI = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  logIn(user: UserLogin){
    return this.http.post(`${this.API_URI}api/auth/login`, user);
  }

  checkIn(_token: string){
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', _token)
    };
    return this.http.get(this.API_URI, header);
  }

}
