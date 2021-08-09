import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLinhVucNghienCuuComponent } from './form-linh-vuc-nghien-cuu.component';

describe('FormLinhVucNghienCuuComponent', () => {
  let component: FormLinhVucNghienCuuComponent;
  let fixture: ComponentFixture<FormLinhVucNghienCuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLinhVucNghienCuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLinhVucNghienCuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
