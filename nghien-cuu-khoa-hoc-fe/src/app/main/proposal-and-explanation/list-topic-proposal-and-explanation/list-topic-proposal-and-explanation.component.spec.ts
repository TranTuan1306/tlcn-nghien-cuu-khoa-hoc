import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTopicProposalAndExplanationComponent } from './list-topic-proposal-and-explanation.component';

describe('ListTopicProposalAndExplanationComponent', () => {
  let component: ListTopicProposalAndExplanationComponent;
  let fixture: ComponentFixture<ListTopicProposalAndExplanationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTopicProposalAndExplanationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTopicProposalAndExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
