import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBangDiemComponent } from './form-bang-diem.component';

describe('FormBangDiemComponent', () => {
  let component: FormBangDiemComponent;
  let fixture: ComponentFixture<FormBangDiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBangDiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBangDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
