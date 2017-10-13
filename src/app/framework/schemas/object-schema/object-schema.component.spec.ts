import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSchemaComponent } from './object-schema.component';

describe('ObjectSchemaComponent', () => {
  let component: ObjectSchemaComponent;
  let fixture: ComponentFixture<ObjectSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
