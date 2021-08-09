import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHuyDeTaiShareComponent } from './form-huy-de-tai-share.component';

describe('FormHuyDeTaiShareComponent', () => {
  let component: FormHuyDeTaiShareComponent;
  let fixture: ComponentFixture<FormHuyDeTaiShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHuyDeTaiShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHuyDeTaiShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
