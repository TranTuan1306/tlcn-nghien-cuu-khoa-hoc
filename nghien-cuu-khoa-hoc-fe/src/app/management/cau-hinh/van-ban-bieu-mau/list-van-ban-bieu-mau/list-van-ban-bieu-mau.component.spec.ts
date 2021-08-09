import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVanBanBieuMauComponent } from './list-van-ban-bieu-mau.component';

describe('ListVanBanBieuMauComponent', () => {
  let component: ListVanBanBieuMauComponent;
  let fixture: ComponentFixture<ListVanBanBieuMauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVanBanBieuMauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVanBanBieuMauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
