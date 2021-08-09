import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeTaiDangKyComponent } from './list-de-tai-dang-ky.component';

describe('ListDeTaiDangKyComponent', () => {
  let component: ListDeTaiDangKyComponent;
  let fixture: ComponentFixture<ListDeTaiDangKyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeTaiDangKyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeTaiDangKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
