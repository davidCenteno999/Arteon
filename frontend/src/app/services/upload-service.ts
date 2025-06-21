import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cloudName } from '../environment/environment'; // Adjust the path as necessary
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }
  private http = inject(HttpClient);
  private cloud = cloudName

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'images'); // Change this to your actual preset

    const url = `https://api.cloudinary.com/v1_1/${this.cloud}/image/upload`;

    return this.http.post(url, formData);
  }
}
