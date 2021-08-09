import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTheTopicComponent } from './review-the-topic.component';

describe('ReviewTheTopicComponent', () => {
  let component: ReviewTheTopicComponent;
  let fixture: ComponentFixture<ReviewTheTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTheTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTheTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
