import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBienBanKiemTraComponent } from './form-bien-ban-kiem-tra.component';

describe('FormBienBanKiemTraComponent', () => {
  let component: FormBienBanKiemTraComponent;
  let fixture: ComponentFixture<FormBienBanKiemTraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBienBanKiemTraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBienBanKiemTraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
