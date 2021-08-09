import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoaiKinhPhiComponent } from './form-loai-kinh-phi.component';

describe('FormLoaiKinhPhiComponent', () => {
  let component: FormLoaiKinhPhiComponent;
  let fixture: ComponentFixture<FormLoaiKinhPhiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLoaiKinhPhiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoaiKinhPhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
