import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeTaiDaDuyetComponent } from './list-de-tai-da-duyet.component';

describe('ListDeTaiDaDuyetComponent', () => {
  let component: ListDeTaiDaDuyetComponent;
  let fixture: ComponentFixture<ListDeTaiDaDuyetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeTaiDaDuyetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeTaiDaDuyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
