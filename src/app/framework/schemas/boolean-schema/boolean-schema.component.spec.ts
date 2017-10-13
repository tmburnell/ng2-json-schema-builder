import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanSchemaComponent } from './boolean-schema.component';

describe('BooleanSchemaComponent', () => {
  let component: BooleanSchemaComponent;
  let fixture: ComponentFixture<BooleanSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
