import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHocHamComponent } from './list-hoc-ham.component';

describe('ListHocHamComponent', () => {
  let component: ListHocHamComponent;
  let fixture: ComponentFixture<ListHocHamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHocHamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHocHamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
