import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2JsonSchemaBuilderComponent } from './ng2-json-schema-builder.component';

describe('Ng2JsonSchemaBuilderComponent', () => {
  let component: Ng2JsonSchemaBuilderComponent;
  let fixture: ComponentFixture<Ng2JsonSchemaBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2JsonSchemaBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2JsonSchemaBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
