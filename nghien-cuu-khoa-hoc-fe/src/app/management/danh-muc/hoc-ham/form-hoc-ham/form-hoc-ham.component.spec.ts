import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHocHamComponent } from './form-hoc-ham.component';

describe('FormHocHamComponent', () => {
  let component: FormHocHamComponent;
  let fixture: ComponentFixture<FormHocHamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHocHamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHocHamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
