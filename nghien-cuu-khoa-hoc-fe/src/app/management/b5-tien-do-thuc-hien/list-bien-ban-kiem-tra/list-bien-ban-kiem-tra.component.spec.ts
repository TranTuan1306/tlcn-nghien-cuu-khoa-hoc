import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBienBanKiemTraComponent } from './list-bien-ban-kiem-tra.component';

describe('ListBienBanKiemTraComponent', () => {
  let component: ListBienBanKiemTraComponent;
  let fixture: ComponentFixture<ListBienBanKiemTraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBienBanKiemTraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBienBanKiemTraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
