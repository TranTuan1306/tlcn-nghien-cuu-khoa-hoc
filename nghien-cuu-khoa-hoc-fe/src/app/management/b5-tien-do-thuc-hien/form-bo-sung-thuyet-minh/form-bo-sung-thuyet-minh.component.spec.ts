import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBoSungThuyetMinhComponent } from './form-bo-sung-thuyet-minh.component';

describe('FormBoSungThuyetMinhComponent', () => {
  let component: FormBoSungThuyetMinhComponent;
  let fixture: ComponentFixture<FormBoSungThuyetMinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBoSungThuyetMinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBoSungThuyetMinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
