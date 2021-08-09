import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBaiVietComponent } from './form-bai-viet.component';

describe('FormBaiVietComponent', () => {
  let component: FormBaiVietComponent;
  let fixture: ComponentFixture<FormBaiVietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBaiVietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBaiVietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
