import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form02bsThanhVienThamGiaComponent } from './form02bs-thanh-vien-tham-gia.component';

describe('Form02bsThanhVienThamGiaComponent', () => {
  let component: Form02bsThanhVienThamGiaComponent;
  let fixture: ComponentFixture<Form02bsThanhVienThamGiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form02bsThanhVienThamGiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form02bsThanhVienThamGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
