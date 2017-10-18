import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDefinitionsComponent } from './base-definitions.component';

describe('BaseDefinitionsComponent', () => {
  let component: BaseDefinitionsComponent;
  let fixture: ComponentFixture<BaseDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
