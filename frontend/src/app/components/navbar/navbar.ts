import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  public userService = inject(UserService);
  private _router = inject(Router);

  logOutUser() {
    this.userService.logoutUser().subscribe({
      next: (response: any) => {
        this._router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Error logging out:', error);
      }
    });
  }
}
