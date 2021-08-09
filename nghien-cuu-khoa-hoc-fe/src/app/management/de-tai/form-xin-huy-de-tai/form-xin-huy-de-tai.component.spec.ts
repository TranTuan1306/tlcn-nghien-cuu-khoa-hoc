import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormXinHuyDeTaiComponent } from './form-xin-huy-de-tai.component';

describe('FormXinHuyDeTaiComponent', () => {
  let component: FormXinHuyDeTaiComponent;
  let fixture: ComponentFixture<FormXinHuyDeTaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormXinHuyDeTaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormXinHuyDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
