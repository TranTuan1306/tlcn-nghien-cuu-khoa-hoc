import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUpdateCodeTopicComponent } from './list-update-code-topic.component';

describe('ListUpdateCodeTopicComponent', () => {
  let component: ListUpdateCodeTopicComponent;
  let fixture: ComponentFixture<ListUpdateCodeTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUpdateCodeTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUpdateCodeTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
