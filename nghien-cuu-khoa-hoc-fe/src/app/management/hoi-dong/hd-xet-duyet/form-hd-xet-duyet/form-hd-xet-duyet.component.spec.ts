import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHdXetDuyetComponent } from './form-hd-xet-duyet.component';

describe('FormHdXetDuyetComponent', () => {
  let component: FormHdXetDuyetComponent;
  let fixture: ComponentFixture<FormHdXetDuyetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHdXetDuyetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHdXetDuyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
