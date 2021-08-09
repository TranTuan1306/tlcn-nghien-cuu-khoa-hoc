import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBaoCaoTienDoComponent } from './list-bao-cao-tien-do.component';

describe('ListBaoCaoTienDoComponent', () => {
  let component: ListBaoCaoTienDoComponent;
  let fixture: ComponentFixture<ListBaoCaoTienDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBaoCaoTienDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBaoCaoTienDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
