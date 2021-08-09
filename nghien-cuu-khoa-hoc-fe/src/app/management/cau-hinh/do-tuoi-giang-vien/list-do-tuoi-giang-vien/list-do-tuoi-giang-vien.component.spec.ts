import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDoTuoiGiangVienComponent } from './list-do-tuoi-giang-vien.component';

describe('ListDoTuoiGiangVienComponent', () => {
  let component: ListDoTuoiGiangVienComponent;
  let fixture: ComponentFixture<ListDoTuoiGiangVienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDoTuoiGiangVienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDoTuoiGiangVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
