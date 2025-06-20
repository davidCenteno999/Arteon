import { Injectable, inject } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service';
@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private apiUrl = environment.apiUrl;
  
  constructor() { }
  public userService = inject(UserService);
  public http = inject(HttpClient);

  createCatalog(catalogData: any) {
   const data = {
      userId: this.userService.user?._id,
      catalogData: catalogData
    };
    console.log('Creating catalog with data:', data);

   return this.http.post(`${this.apiUrl}/api/catalog`, data);
  }

}
