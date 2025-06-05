import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { User } from '../models/user'; // Adjust the import path as necessary
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User | null = null;

  private apiUrl = environment.apiUrl;

  constructor(
    public http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadUserOnStartup();
  }

  loadUserOnStartup() {
    const token = this.getToken();
    if (token) {
      this.verifyUser().subscribe({
        next: (response: any) => {
          if (response && response.user) {
            this.user = response.user;
            console.log('User loaded on startup:', this.user);
          }
        },
        error: (error) => {
          console.error('Error loading user on startup:', error);
        }
      });
    }
  }

  verifyUser() {
    //const headers = { Authorization: `Bearer ${document.cookie.split('token=')[1]}` };
    // If you need to send the token in the headers, uncomment the line below
    return this.http.get(`${this.apiUrl}/api/users/verify`, { withCredentials: true });
   
  }

  registerUser(userData: any) {
    return this.http.post(`${this.apiUrl}/api/users/register`, userData);
  }

  loginUser(userData: any) {
    return this.http.post(`${this.apiUrl}/api/users/login`, userData);
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  logoutUser() {
    this.user = null; // Clear the user data on logout
    document.cookie = 'token=; path=/;'; // Clear the token cookie
    return this.http.post(`${this.apiUrl}/api/users/logout`, {}, { withCredentials: true });
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const matches = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
      return matches ? matches[2] : null;
    }
    return null;
  }

 
}
