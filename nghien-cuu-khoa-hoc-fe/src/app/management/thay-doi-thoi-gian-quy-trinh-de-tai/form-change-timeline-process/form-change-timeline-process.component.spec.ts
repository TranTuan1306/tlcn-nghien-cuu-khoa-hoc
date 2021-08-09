import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChangeTimelineProcessComponent } from './form-change-timeline-process.component';

describe('FormChangeTimelineProcessComponent', () => {
  let component: FormChangeTimelineProcessComponent;
  let fixture: ComponentFixture<FormChangeTimelineProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChangeTimelineProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChangeTimelineProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
