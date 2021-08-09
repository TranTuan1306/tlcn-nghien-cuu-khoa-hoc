import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHuyDeTaiComponent } from './form-huy-de-tai.component';

describe('FormHuyDeTaiComponent', () => {
  let component: FormHuyDeTaiComponent;
  let fixture: ComponentFixture<FormHuyDeTaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHuyDeTaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHuyDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
