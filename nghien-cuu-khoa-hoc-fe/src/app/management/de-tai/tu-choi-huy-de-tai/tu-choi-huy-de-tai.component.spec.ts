import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuChoiHuyDeTaiComponent } from './tu-choi-huy-de-tai.component';

describe('TuChoiHuyDeTaiComponent', () => {
  let component: TuChoiHuyDeTaiComponent;
  let fixture: ComponentFixture<TuChoiHuyDeTaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuChoiHuyDeTaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuChoiHuyDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
