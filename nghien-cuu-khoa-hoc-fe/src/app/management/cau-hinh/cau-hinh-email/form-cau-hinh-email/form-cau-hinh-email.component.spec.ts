import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCauHinhEmailComponent } from './form-cau-hinh-email.component';

describe('FormCauHinhEmailComponent', () => {
  let component: FormCauHinhEmailComponent;
  let fixture: ComponentFixture<FormCauHinhEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCauHinhEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCauHinhEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
