import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeTaiNghiemThuComponent } from './list-de-tai-nghiem-thu.component';

describe('ListDeTaiNghiemThuComponent', () => {
  let component: ListDeTaiNghiemThuComponent;
  let fixture: ComponentFixture<ListDeTaiNghiemThuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeTaiNghiemThuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeTaiNghiemThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
