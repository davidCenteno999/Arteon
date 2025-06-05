import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['../custom-theme.scss']
})
export class App {
  
}
