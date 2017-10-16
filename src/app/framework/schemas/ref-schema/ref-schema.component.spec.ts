import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefSchemaComponent } from './ref-schema.component';

describe('RefSchemaComponent', () => {
  let component: RefSchemaComponent;
  let fixture: ComponentFixture<RefSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
