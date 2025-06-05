import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(req: any, next: any) {
    // Get the token from UserService
    const token = this.userService.getToken();

    // Clone the request and set the new header in one step
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    // If no token, proceed with the original request
    return next.handle(req);
  }

  
}
