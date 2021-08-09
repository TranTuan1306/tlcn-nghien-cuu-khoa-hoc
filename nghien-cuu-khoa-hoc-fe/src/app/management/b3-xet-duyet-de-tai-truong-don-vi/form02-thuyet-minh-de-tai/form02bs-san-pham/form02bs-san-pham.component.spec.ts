import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form02bsSanPhamComponent } from './form02bs-san-pham.component';

describe('Form02bsSanPhamComponent', () => {
  let component: Form02bsSanPhamComponent;
  let fixture: ComponentFixture<Form02bsSanPhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form02bsSanPhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form02bsSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
