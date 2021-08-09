import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCauHinhBieuMauComponent } from './list-cau-hinh-bieu-mau.component';

describe('ListCauHinhBieuMauComponent', () => {
  let component: ListCauHinhBieuMauComponent;
  let fixture: ComponentFixture<ListCauHinhBieuMauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCauHinhBieuMauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCauHinhBieuMauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
