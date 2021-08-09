import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMyTopicComponent } from './form-my-topic.component';

describe('FormMyTopicComponent', () => {
  let component: FormMyTopicComponent;
  let fixture: ComponentFixture<FormMyTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMyTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMyTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
