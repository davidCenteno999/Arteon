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
  selector: 'app-register',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule,
     MatButtonModule , MatIconModule, FormsModule,
    MatIconModule ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  
private _snackBar = inject(MatSnackBar);
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(public userService: UserService, private _router: Router) {}

  register() {
    this.userService.registerUser(this.user).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.openSnackBar('¡Registro exitoso!', 'Cerrar');
        this._router.navigate(['/login']);
      },
      error: (error) => {
        this.openSnackBar('Error al registrar usuario', 'Cerrar');
        console.error('Error registering user:', error);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
