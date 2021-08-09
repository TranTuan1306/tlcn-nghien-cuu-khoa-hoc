import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProposalTopicComponent } from './view-proposal-topic.component';

describe('ViewProposalTopicComponent', () => {
  let component: ViewProposalTopicComponent;
  let fixture: ComponentFixture<ViewProposalTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProposalTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProposalTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
