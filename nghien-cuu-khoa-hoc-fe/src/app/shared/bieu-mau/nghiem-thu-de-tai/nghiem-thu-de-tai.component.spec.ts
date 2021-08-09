import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NghiemThuDeTaiComponent } from './nghiem-thu-de-tai.component';

describe('NghiemThuDeTaiComponent', () => {
  let component: NghiemThuDeTaiComponent;
  let fixture: ComponentFixture<NghiemThuDeTaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NghiemThuDeTaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NghiemThuDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
