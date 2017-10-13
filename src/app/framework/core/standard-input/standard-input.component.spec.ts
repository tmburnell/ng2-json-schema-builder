import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardInputComponent } from './standard-input.component';

describe('StandardInputComponent', () => {
  let component: StandardInputComponent;
  let fixture: ComponentFixture<StandardInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
