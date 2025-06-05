import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user-service';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  public userService = inject(UserService);
  ngnInit(){
    console.log(this.userService.getToken());
  }
  
}
