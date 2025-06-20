import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { CatalogService } from '../../../services/catalog-service';

@Component({
  selector: 'app-create-catalog',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, FormsModule, MatButtonModule, MatTabsModule, MatSelectModule],
  templateUrl: './create-catalog.html',
  styleUrl: './create-catalog.css'
})
export class CreateCatalog {

  public catalogService = inject(CatalogService);

  catalog: {
    name: string,
    description: string,
    artDesigns: any[],
    members: any[],
    awards: any[],
    socialMedia: {
      website: string,
      socialMediaLinks: { name: string, url: string }[]
    },
    likes: number,
    visibility: string
  } = {
    name: '',
    description: '',
    artDesigns: [],
    members: [],
    awards: [],
    socialMedia: {
      website: '',
      socialMediaLinks: []
    },
    likes: 0,
    visibility: 'public'
  };

  socialMedia = {
    name: '',
    url: ''
  }

  addSocialMediaLink() {
    if (this.socialMedia.name.trim() !== '' || this.socialMedia.url.trim() !== '') {
      this.catalog.socialMedia.socialMediaLinks.push({ name: this.socialMedia.name, url: this.socialMedia.url });
      this.socialMedia = { name: '', url: '' };
    }
  }

  async addCatalog() {
    try {
      // Validación básica antes de enviar el catálogo
      

      // Llamada asincrónica al servicio para crear el catálogo
      const response = await this.catalogService.createCatalog(this.catalog);
      console.log('Catalog created successfully:', response);

      // Opcional: Reinicia el formulario después de crear el catálogo
      this.resetCatalog();
    } catch (error) {
      console.error('Error creating catalog:', error);
      // Opcional: Manejo adicional de errores
      alert('Failed to create catalog. Please try again.');
    }
  }

  // Función para reiniciar el formulario del catálogo
  resetCatalog() {
    this.catalog = {
      name: '',
      description: '',
      artDesigns: [],
      members: [],
      awards: [],
      socialMedia: {
        website: '',
        socialMediaLinks: []
      },
      likes: 0,
      visibility: 'public'
    };
    this.socialMedia = { name: '', url: '' };
  }

}
