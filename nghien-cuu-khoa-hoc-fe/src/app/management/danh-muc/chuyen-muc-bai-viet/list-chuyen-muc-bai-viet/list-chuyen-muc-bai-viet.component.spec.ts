import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChuyenMucBaiVietComponent } from './list-chuyen-muc-bai-viet.component';

describe('ListChuyenMucBaiVietComponent', () => {
  let component: ListChuyenMucBaiVietComponent;
  let fixture: ComponentFixture<ListChuyenMucBaiVietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChuyenMucBaiVietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChuyenMucBaiVietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
