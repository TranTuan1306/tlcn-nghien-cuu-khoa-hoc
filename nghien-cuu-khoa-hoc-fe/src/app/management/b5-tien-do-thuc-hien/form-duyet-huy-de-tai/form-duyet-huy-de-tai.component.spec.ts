import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDuyetHuyDeTaiComponent } from './form-duyet-huy-de-tai.component';

describe('FormDuyetHuyDeTaiComponent', () => {
  let component: FormDuyetHuyDeTaiComponent;
  let fixture: ComponentFixture<FormDuyetHuyDeTaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDuyetHuyDeTaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDuyetHuyDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
