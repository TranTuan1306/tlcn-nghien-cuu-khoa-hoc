import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLinhVucNghienCuuComponent } from './list-linh-vuc-nghien-cuu.component';

describe('ListLinhVucNghienCuuComponent', () => {
  let component: ListLinhVucNghienCuuComponent;
  let fixture: ComponentFixture<ListLinhVucNghienCuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLinhVucNghienCuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLinhVucNghienCuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
