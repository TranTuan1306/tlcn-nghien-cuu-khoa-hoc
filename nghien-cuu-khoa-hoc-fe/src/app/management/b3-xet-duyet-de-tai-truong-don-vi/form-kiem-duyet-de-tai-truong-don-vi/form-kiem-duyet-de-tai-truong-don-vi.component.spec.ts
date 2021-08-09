import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKiemDuyetDeTaiTruongDonViComponent } from './form-kiem-duyet-de-tai-truong-don-vi.component';

describe('FormKiemDuyetDeTaiComponent', () => {
  let component: FormKiemDuyetDeTaiTruongDonViComponent;
  let fixture: ComponentFixture<FormKiemDuyetDeTaiTruongDonViComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormKiemDuyetDeTaiTruongDonViComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKiemDuyetDeTaiTruongDonViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
