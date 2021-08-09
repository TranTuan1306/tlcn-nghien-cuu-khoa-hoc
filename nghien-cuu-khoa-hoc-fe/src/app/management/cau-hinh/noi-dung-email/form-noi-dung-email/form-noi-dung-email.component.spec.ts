import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNoiDungEmailComponent } from './form-noi-dung-email.component';

describe('FormNoiDungEmailComponent', () => {
  let component: FormNoiDungEmailComponent;
  let fixture: ComponentFixture<FormNoiDungEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNoiDungEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNoiDungEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
