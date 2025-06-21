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
import { UploadService } from '../../../services/upload-service';

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
    image: {
      public_id: string,
      url: string},
    
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
    image: {
      public_id: '',
      url: ''
    },
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

  selectedFile!: File;
  uploadedImageUrl: string | null = null;
  public uploadService = inject(UploadService);

  addSocialMediaLink() {
    if (this.socialMedia.name.trim() !== '' || this.socialMedia.url.trim() !== '') {
      this.catalog.socialMedia.socialMediaLinks.push({ name: this.socialMedia.name, url: this.socialMedia.url });
      this.socialMedia = { name: '', url: '' };
    }
  }

  addCatalog() {
    try {
      // Validación básica antes de enviar el catálogo
      

      this.catalogService.createCatalog(this.catalog).subscribe({
        next: (response) => {
          console.log('Catalog created successfully:', response);
          this.resetCatalog(); // Reiniciar el formulario después de crear el catálogo
          alert('Catalog created successfully!');
        },
        error: (error) => {
          console.error('Error creating catalog:', error);
         
        } 
      });
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
      image: {
        public_id: '',
        url: ''
      },
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

   onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      this.selectedFile = target.files[0];
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      this.uploadService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully:', response);
          
          this.catalog.image.url = response.secure_url; // Assuming the response contains the secure URL
          this.catalog.image.public_id = response.public_id; // Assuming the response contains the public ID
          
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
        }
      });
    } else {
      alert('Please select a file to upload.');
    }
  }

 

}
