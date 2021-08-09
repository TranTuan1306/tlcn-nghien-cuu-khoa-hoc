import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListThoiGianQuyTrinhComponent } from './list-thoi-gian-quy-trinh.component';

describe('ListThoiGianQuyTrinhComponent', () => {
  let component: ListThoiGianQuyTrinhComponent;
  let fixture: ComponentFixture<ListThoiGianQuyTrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListThoiGianQuyTrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListThoiGianQuyTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
