import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBanDiemComponent } from './form-ban-diem.component';

describe('FormBanDiemComponent', () => {
  let component: FormBanDiemComponent;
  let fixture: ComponentFixture<FormBanDiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBanDiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBanDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
