import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NullSchemaComponent } from './null-schema.component';

describe('NullSchemaComponent', () => {
  let component: NullSchemaComponent;
  let fixture: ComponentFixture<NullSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NullSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NullSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
