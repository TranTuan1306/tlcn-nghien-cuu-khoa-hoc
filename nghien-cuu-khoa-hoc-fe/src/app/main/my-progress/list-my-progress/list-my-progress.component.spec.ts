import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyProgressComponent } from './list-my-progress.component';

describe('ListMyProgressComponent', () => {
  let component: ListMyProgressComponent;
  let fixture: ComponentFixture<ListMyProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMyProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMyProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
