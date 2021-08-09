import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDoTuoiGiangVienComponent } from './form-do-tuoi-giang-vien.component';

describe('FormDoTuoiGiangVienComponent', () => {
  let component: FormDoTuoiGiangVienComponent;
  let fixture: ComponentFixture<FormDoTuoiGiangVienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDoTuoiGiangVienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDoTuoiGiangVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
