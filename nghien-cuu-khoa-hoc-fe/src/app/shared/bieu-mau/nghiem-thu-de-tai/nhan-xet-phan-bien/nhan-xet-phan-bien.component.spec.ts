import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanXetPhanBienComponent } from './nhan-xet-phan-bien.component';

describe('NhanXetPhanBienComponent', () => {
  let component: NhanXetPhanBienComponent;
  let fixture: ComponentFixture<NhanXetPhanBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhanXetPhanBienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhanXetPhanBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
