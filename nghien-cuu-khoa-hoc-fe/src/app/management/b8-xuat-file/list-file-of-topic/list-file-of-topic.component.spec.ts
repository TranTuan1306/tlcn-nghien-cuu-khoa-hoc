import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFileOfTopicComponent } from './list-file-of-topic.component';

describe('ListFileOfTopicComponent', () => {
  let component: ListFileOfTopicComponent;
  let fixture: ComponentFixture<ListFileOfTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFileOfTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFileOfTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
