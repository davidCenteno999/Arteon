import { Component } from '@angular/core';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  constructor(private userService: UserService) {}
  
  
}
