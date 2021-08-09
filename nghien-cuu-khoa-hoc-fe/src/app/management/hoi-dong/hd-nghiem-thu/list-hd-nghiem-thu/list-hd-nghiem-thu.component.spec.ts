import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHdNghiemThuComponent } from './list-hd-nghiem-thu.component';

describe('ListHdNghiemThuComponent', () => {
  let component: ListHdNghiemThuComponent;
  let fixture: ComponentFixture<ListHdNghiemThuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHdNghiemThuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHdNghiemThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
