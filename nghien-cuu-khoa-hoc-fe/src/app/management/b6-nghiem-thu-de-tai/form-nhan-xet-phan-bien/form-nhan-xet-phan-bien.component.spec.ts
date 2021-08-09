import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNhanXetPhanBienComponent } from './form-nhan-xet-phan-bien.component';

describe('FormNhanXetPhanBienComponent', () => {
  let component: FormNhanXetPhanBienComponent;
  let fixture: ComponentFixture<FormNhanXetPhanBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNhanXetPhanBienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNhanXetPhanBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
