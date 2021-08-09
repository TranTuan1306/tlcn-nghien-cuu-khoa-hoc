import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormThoiGianQuyTrinhComponent } from './form-thoi-gian-quy-trinh.component';

describe('FormThoiGianQuyTrinhComponent', () => {
  let component: FormThoiGianQuyTrinhComponent;
  let fixture: ComponentFixture<FormThoiGianQuyTrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThoiGianQuyTrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThoiGianQuyTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
