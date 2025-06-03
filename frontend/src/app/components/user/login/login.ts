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


@Component({
  selector: 'app-login',
  imports: [ MatCardModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatIconModule, FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private _snackBar = inject(MatSnackBar);
  user = {
    email: '',
    password: ''
  };

  constructor(public userService: UserService, private _router: Router) {}

  login() {
    this.userService.loginUser(this.user).subscribe({
      next: (response) => {

        console.log('User logged in successfully:', response);
        this.openSnackBar('¡Inicio de sesión exitoso!', 'Cerrar');
        this._router.navigate(['/profile']);
      },
      error: (error) => {
        this.openSnackBar('Error al iniciar sesión', 'Cerrar');
        console.error('Error logging in user:', error);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
