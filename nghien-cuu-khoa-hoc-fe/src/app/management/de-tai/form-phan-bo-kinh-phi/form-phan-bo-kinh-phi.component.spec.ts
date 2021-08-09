import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPhanBoKinhPhiComponent } from './form-phan-bo-kinh-phi.component';

describe('FormPhanBoKinhPhiComponent', () => {
  let component: FormPhanBoKinhPhiComponent;
  let fixture: ComponentFixture<FormPhanBoKinhPhiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPhanBoKinhPhiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPhanBoKinhPhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
