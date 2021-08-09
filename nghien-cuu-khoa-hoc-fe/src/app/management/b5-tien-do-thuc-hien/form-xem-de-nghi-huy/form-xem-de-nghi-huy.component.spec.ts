import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormXemDeNghiHuyComponent } from './form-xem-de-nghi-huy.component';

describe('FormXemDeNghiHuyComponent', () => {
  let component: FormXemDeNghiHuyComponent;
  let fixture: ComponentFixture<FormXemDeNghiHuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormXemDeNghiHuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormXemDeNghiHuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
