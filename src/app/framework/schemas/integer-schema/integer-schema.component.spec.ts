import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegerSchemaComponent } from './integer-schema.component';

describe('IntegerSchemaComponent', () => {
  let component: IntegerSchemaComponent;
  let fixture: ComponentFixture<IntegerSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegerSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegerSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
