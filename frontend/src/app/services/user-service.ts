import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  verifyUser() {
    return this.http.get(`${this.apiUrl}/api/users/verify`);
  }

  registerUser(userData: any) {
    return this.http.post(`${this.apiUrl}/api/users/register`, userData);
  }

  loginUser(userData: any) {
    return this.http.post(`${this.apiUrl}/api/users/login`, userData);
  }

 
}
