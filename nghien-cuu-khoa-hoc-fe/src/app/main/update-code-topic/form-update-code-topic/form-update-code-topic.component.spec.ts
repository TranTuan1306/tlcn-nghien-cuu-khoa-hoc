import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateCodeTopicComponent } from './form-update-code-topic.component';

describe('FormUpdateCodeTopicComponent', () => {
  let component: FormUpdateCodeTopicComponent;
  let fixture: ComponentFixture<FormUpdateCodeTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUpdateCodeTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateCodeTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
