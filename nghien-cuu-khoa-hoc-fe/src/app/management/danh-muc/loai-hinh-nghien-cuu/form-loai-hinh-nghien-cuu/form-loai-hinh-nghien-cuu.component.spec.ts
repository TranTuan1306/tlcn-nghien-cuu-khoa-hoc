import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoaiHinhNghienCuuComponent } from './form-loai-hinh-nghien-cuu.component';

describe('FormLoaiHinhNghienCuuComponent', () => {
  let component: FormLoaiHinhNghienCuuComponent;
  let fixture: ComponentFixture<FormLoaiHinhNghienCuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLoaiHinhNghienCuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoaiHinhNghienCuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
