import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCauHinhBieuMauComponent } from './form-cau-hinh-bieu-mau.component';

describe('FormCauHinhBieuMauComponent', () => {
  let component: FormCauHinhBieuMauComponent;
  let fixture: ComponentFixture<FormCauHinhBieuMauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCauHinhBieuMauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCauHinhBieuMauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
