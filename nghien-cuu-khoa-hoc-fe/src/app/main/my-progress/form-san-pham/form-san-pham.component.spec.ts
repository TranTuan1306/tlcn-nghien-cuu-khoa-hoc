import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSanPhamComponent } from './form-san-pham.component';

describe('FormSanPhamComponent', () => {
  let component: FormSanPhamComponent;
  let fixture: ComponentFixture<FormSanPhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSanPhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
