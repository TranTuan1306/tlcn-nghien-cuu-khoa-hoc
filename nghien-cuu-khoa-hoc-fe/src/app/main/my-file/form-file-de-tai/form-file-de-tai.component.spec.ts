import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFileDeTaiComponent } from './form-file-de-tai.component';

describe('FormFileDeTaiComponent', () => {
  let component: FormFileDeTaiComponent;
  let fixture: ComponentFixture<FormFileDeTaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFileDeTaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFileDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
