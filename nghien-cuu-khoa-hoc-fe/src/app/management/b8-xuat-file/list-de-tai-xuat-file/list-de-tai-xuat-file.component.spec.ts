import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeTaiXuatFileComponent } from './list-de-tai-xuat-file.component';

describe('ListDeTaiXuatFileComponent', () => {
  let component: ListDeTaiXuatFileComponent;
  let fixture: ComponentFixture<ListDeTaiXuatFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeTaiXuatFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeTaiXuatFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
