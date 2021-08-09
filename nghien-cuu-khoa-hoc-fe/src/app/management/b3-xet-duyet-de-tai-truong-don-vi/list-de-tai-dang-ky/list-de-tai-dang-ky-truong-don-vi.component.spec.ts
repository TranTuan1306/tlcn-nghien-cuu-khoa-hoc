import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeTaiDangKyTruongDonViComponent } from './list-de-tai-dang-ky-truong-don-vi.component';

describe('ListDeTaiDangKyComponent', () => {
  let component: ListDeTaiDangKyTruongDonViComponent;
  let fixture: ComponentFixture<ListDeTaiDangKyTruongDonViComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeTaiDangKyTruongDonViComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeTaiDangKyTruongDonViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
