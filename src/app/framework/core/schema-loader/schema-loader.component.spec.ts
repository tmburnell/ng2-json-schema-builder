import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaLoaderComponent } from './schema-loader.component';

describe('SchemaLoaderComponent', () => {
  let component: SchemaLoaderComponent;
  let fixture: ComponentFixture<SchemaLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
