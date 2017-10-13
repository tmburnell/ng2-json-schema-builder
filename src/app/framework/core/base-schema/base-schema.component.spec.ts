import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSchemaComponent } from './base-schema.component';

describe('BaseSchemaComponent', () => {
  let component: BaseSchemaComponent;
  let fixture: ComponentFixture<BaseSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
