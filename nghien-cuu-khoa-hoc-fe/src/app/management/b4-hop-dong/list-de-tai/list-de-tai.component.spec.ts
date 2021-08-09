import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeTaiComponent } from './list-de-tai.component';

describe('ListDeTaiComponent', () => {
  let component: ListDeTaiComponent;
  let fixture: ComponentFixture<ListDeTaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeTaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
