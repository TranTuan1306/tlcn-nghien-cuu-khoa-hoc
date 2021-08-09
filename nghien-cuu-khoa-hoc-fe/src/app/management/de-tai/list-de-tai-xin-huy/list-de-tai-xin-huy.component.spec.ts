import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeTaiXinHuyComponent } from './list-de-tai-xin-huy.component';

describe('ListDeTaiXinHuyComponent', () => {
  let component: ListDeTaiXinHuyComponent;
  let fixture: ComponentFixture<ListDeTaiXinHuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeTaiXinHuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeTaiXinHuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
