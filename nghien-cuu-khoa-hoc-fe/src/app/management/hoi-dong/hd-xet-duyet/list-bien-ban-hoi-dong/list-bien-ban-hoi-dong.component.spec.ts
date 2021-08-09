import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBienBanHoiDongComponent } from './list-bien-ban-hoi-dong.component';

describe('ListBienBanHoiDongComponent', () => {
  let component: ListBienBanHoiDongComponent;
  let fixture: ComponentFixture<ListBienBanHoiDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBienBanHoiDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBienBanHoiDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
