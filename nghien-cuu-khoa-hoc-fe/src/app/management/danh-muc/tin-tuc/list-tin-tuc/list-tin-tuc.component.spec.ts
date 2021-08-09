import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTinTucComponent } from './list-tin-tuc.component';

describe('ListTinTucComponent', () => {
  let component: ListTinTucComponent;
  let fixture: ComponentFixture<ListTinTucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTinTucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTinTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
