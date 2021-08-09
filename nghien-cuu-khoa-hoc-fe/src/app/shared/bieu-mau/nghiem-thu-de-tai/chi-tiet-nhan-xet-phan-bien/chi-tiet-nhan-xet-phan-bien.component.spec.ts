import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietNhanXetPhanBienComponent } from './chi-tiet-nhan-xet-phan-bien.component';

describe('ChiTietNhanXetPhanBienComponent', () => {
  let component: ChiTietNhanXetPhanBienComponent;
  let fixture: ComponentFixture<ChiTietNhanXetPhanBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietNhanXetPhanBienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietNhanXetPhanBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
