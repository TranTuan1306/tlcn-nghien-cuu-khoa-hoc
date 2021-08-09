import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHdXetDuyetComponent } from './list-hd-xet-duyet.component';

describe('ListHdXetDuyetComponent', () => {
  let component: ListHdXetDuyetComponent;
  let fixture: ComponentFixture<ListHdXetDuyetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHdXetDuyetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHdXetDuyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
