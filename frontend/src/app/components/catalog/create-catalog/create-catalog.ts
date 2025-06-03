import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-create-catalog',
  imports: [],
  templateUrl: './create-catalog.html',
  styleUrl: './create-catalog.css'
})
export class CreateCatalog {
  @Input() username = '';
  catalogs = [
    { name: 'Catalog 1', description: 'Description for Catalog 1' },
    { name: 'Catalog 2', description: 'Description for Catalog 2' },
    { name: 'Catalog 3', description: 'Description for Catalog 3' }
  ];

  @Output() catalogCreated = new EventEmitter<string>();

  createCatalog(catalogName: string) {
    // Emit the catalog name when a catalog is created
    this.catalogCreated.emit(catalogName);

  }

}
