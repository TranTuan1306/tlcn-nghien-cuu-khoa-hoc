import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKiemDuyetDeTaiComponent } from './form-kiem-duyet-de-tai.component';

describe('FormKiemDuyetDeTaiComponent', () => {
  let component: FormKiemDuyetDeTaiComponent;
  let fixture: ComponentFixture<FormKiemDuyetDeTaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormKiemDuyetDeTaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKiemDuyetDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
