import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBoSungThuyetMinhComponent } from './list-bo-sung-thuyet-minh.component';

describe('ListBoSungThuyetMinhComponent', () => {
  let component: ListBoSungThuyetMinhComponent;
  let fixture: ComponentFixture<ListBoSungThuyetMinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBoSungThuyetMinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBoSungThuyetMinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
