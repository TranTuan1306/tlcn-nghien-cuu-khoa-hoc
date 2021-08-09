import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBaiVietComponent } from './list-bai-viet.component';

describe('ListBaiVietComponent', () => {
  let component: ListBaiVietComponent;
  let fixture: ComponentFixture<ListBaiVietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBaiVietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBaiVietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
