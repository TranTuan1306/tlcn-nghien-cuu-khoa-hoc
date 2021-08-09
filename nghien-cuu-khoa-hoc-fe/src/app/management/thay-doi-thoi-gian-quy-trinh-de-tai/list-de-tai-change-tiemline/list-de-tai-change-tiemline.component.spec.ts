import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeTaiChangeTiemlineComponent } from './list-de-tai-change-tiemline.component';

describe('ListDeTaiChangeTiemlineComponent', () => {
  let component: ListDeTaiChangeTiemlineComponent;
  let fixture: ComponentFixture<ListDeTaiChangeTiemlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeTaiChangeTiemlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeTaiChangeTiemlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
