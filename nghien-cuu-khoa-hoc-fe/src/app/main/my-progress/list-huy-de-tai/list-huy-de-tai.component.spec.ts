import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHuyDeTaiComponent } from './list-huy-de-tai.component';

describe('ListHuyDeTaiComponent', () => {
  let component: ListHuyDeTaiComponent;
  let fixture: ComponentFixture<ListHuyDeTaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHuyDeTaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHuyDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
