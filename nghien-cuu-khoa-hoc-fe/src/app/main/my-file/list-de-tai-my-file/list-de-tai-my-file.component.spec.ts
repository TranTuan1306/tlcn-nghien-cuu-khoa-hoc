import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeTaiMyFileComponent } from './list-de-tai-my-file.component';

describe('ListDeTaiMyFileComponent', () => {
  let component: ListDeTaiMyFileComponent;
  let fixture: ComponentFixture<ListDeTaiMyFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeTaiMyFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeTaiMyFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
