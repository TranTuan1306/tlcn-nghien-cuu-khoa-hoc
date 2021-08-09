import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMyProgressComponent } from './form-my-progress.component';

describe('FormMyProgressComponent', () => {
  let component: FormMyProgressComponent;
  let fixture: ComponentFixture<FormMyProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMyProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMyProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
