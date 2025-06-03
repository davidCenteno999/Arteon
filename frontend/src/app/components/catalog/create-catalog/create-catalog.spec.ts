import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCatalog } from './create-catalog';

describe('CreateCatalog', () => {
  let component: CreateCatalog;
  let fixture: ComponentFixture<CreateCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCatalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
