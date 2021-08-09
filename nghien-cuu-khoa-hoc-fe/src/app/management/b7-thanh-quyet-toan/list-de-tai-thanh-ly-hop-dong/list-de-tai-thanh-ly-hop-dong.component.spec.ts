import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeTaiThanhLyHopDongComponent } from './list-de-tai-thanh-ly-hop-dong.component';

describe('ListDeTaiThanhLyHopDongComponent', () => {
  let component: ListDeTaiThanhLyHopDongComponent;
  let fixture: ComponentFixture<ListDeTaiThanhLyHopDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeTaiThanhLyHopDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeTaiThanhLyHopDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
