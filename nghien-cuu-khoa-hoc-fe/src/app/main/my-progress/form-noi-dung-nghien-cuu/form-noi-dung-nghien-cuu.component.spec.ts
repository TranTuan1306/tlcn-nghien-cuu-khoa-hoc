import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNoiDungNghienCuuComponent } from './form-noi-dung-nghien-cuu.component';

describe('FormNoiDungNghienCuuComponent', () => {
  let component: FormNoiDungNghienCuuComponent;
  let fixture: ComponentFixture<FormNoiDungNghienCuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNoiDungNghienCuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNoiDungNghienCuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
