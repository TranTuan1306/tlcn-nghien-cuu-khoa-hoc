import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHocViComponent } from './list-hoc-vi.component';

describe('ListHocViComponent', () => {
  let component: ListHocViComponent;
  let fixture: ComponentFixture<ListHocViComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHocViComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHocViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
