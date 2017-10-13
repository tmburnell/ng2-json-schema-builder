import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringSchemaComponent } from './string-schema.component';

describe('StringSchemaComponent', () => {
  let component: StringSchemaComponent;
  let fixture: ComponentFixture<StringSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
