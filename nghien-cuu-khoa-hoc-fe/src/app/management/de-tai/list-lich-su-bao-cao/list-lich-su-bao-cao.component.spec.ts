import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLichSuBaoCaoComponent } from './list-lich-su-bao-cao.component';

describe('ListLichSuBaoCaoComponent', () => {
  let component: ListLichSuBaoCaoComponent;
  let fixture: ComponentFixture<ListLichSuBaoCaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLichSuBaoCaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLichSuBaoCaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
