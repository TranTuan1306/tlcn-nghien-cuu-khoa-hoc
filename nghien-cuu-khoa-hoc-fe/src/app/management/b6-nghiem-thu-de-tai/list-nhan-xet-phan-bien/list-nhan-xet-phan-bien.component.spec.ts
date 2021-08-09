import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNhanXetPhanBienComponent } from './list-nhan-xet-phan-bien.component';

describe('ListNhanXetPhanBienComponent', () => {
  let component: ListNhanXetPhanBienComponent;
  let fixture: ComponentFixture<ListNhanXetPhanBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNhanXetPhanBienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNhanXetPhanBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
