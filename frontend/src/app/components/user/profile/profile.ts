import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { CatalogService } from '../../../services/catalog-service';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, FormsModule, MatTableModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})




 

export class Profile {
  public userService = inject(UserService);
  public catalogService = inject(CatalogService);
  public router = inject(Router);

  catalogData: Catalog[] = [];

  ngnInit(){
    console.log(this.userService.getToken());
  }

  createCatalog() {
    this.router.navigate(['/catalog/create']);
  }

  
  getCatalogs() {
    this.catalogService.getCatalogs().subscribe({
      next: (response: any) => {
        console.log('Catalogs fetched successfully:', response.catalogs);
        this.catalogData = response.catalogs;
      },
      error: (error) => {
        console.error('Error fetching catalogs:', error);
      }
    });
  }



  // Display catalogs information 
 columnsToDisplay = ['name', 'Logo', 'visibility'];
 columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
 expandedElement: Catalog | null = null;

 isExpanded(element: Catalog){
    return this.expandedElement === element;
 }

  toggleExpand(element: Catalog) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }

}


export interface Catalog {
    name: string;
    image: string;
    likes: number;
    visibility: string;
}