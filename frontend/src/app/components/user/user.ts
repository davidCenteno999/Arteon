import { Component } from '@angular/core';
import { CreateCatalog } from '../catalog/create-catalog/create-catalog';

@Component({
  selector: 'app-user',
  imports: [CreateCatalog],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  isLoggedIn = true;
  username = 'Guest';
  create_catalog = ''

  setCatalog(catalogName: string) {
    // Set the catalog name when a catalog is created
    this.create_catalog = catalogName;
  }
}
