import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-login',
  
  imports: [ MatCardModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatIconModule, FormsModule, RouterModule ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private _snackBar = inject(MatSnackBar);
  private userService = inject(UserService); // ✅ inyectado aquí
  private _router = inject(Router);          // ✅ inyectado aquí

  user = {
    email: '',
    password: ''
  };

  login() {
    this.userService.loginUser(this.user).subscribe({
      next: (response: any) => {
        document.cookie = `token=${response.token}; path=/;`;
        console.log('User logged in successfully:', response);
          this.userService.verifyUser().subscribe({
            
            next: (response: any) => {
              if (response && response.user) {
                this.userService.user = response.user;
                console.log('User verified:', this.userService.user);
                this._router.navigate(['/']);
              } else {
                console.error('User verification failed or no user data returned');
              }
            },
            error: (error: any ) => {
              if (this.userService.user === null)  {
                console.error('Error verifying user:');
                // Manejo adicional del error
                if (error.status === 401) {
                  console.error('Unauthorized access. Redirecting to login...hola');
                  // Redirigir al usuario al login si es necesario
                }
              }
            }
          });
        
      },
      error: (error) => {
        this.openSnackBar('Error al iniciar sesión', 'Cerrar');
        console.error('Error logging in user:', error);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }
} 