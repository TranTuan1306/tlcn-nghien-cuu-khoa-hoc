import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoaiKinhPhiComponent } from './list-loai-kinh-phi.component';

describe('ListLoaiKinhPhiComponent', () => {
  let component: ListLoaiKinhPhiComponent;
  let fixture: ComponentFixture<ListLoaiKinhPhiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLoaiKinhPhiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLoaiKinhPhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
