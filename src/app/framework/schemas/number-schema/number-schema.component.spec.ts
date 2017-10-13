import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSchemaComponent } from './number-schema.component';

describe('NumberSchemaComponent', () => {
  let component: NumberSchemaComponent;
  let fixture: ComponentFixture<NumberSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
