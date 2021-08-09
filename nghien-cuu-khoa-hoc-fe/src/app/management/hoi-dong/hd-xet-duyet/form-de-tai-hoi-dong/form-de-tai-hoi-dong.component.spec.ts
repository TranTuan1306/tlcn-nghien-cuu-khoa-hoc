import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeTaiHoiDongComponent } from './form-de-tai-hoi-dong.component';

describe('FormDeTaiHoiDongComponent', () => {
  let component: FormDeTaiHoiDongComponent;
  let fixture: ComponentFixture<FormDeTaiHoiDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDeTaiHoiDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeTaiHoiDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
