import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyTopicComponent } from './list-my-topic.component';

describe('ListMyTopicComponent', () => {
  let component: ListMyTopicComponent;
  let fixture: ComponentFixture<ListMyTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMyTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMyTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
