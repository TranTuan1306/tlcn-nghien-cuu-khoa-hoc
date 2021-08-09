import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChuyenMucBaiVietComponent } from './form-chuyen-muc-bai-viet.component';

describe('FormChuyenMucBaiVietComponent', () => {
  let component: FormChuyenMucBaiVietComponent;
  let fixture: ComponentFixture<FormChuyenMucBaiVietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChuyenMucBaiVietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChuyenMucBaiVietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
