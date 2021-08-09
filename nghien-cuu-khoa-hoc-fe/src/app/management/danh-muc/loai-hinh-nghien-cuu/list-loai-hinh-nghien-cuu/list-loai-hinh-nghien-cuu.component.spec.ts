import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoaiHinhNghienCuuComponent } from './list-loai-hinh-nghien-cuu.component';

describe('ListLoaiHinhNghienCuuComponent', () => {
  let component: ListLoaiHinhNghienCuuComponent;
  let fixture: ComponentFixture<ListLoaiHinhNghienCuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLoaiHinhNghienCuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLoaiHinhNghienCuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
