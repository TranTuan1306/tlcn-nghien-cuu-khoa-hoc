import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeTaiThanhLyHopDongComponent } from './form-de-tai-thanh-ly-hop-dong.component';

describe('FormDeTaiThanhLyHopDongComponent', () => {
  let component: FormDeTaiThanhLyHopDongComponent;
  let fixture: ComponentFixture<FormDeTaiThanhLyHopDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDeTaiThanhLyHopDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeTaiThanhLyHopDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
