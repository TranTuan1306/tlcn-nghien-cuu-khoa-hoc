import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form01DeXuatDeTaiComponent } from './form01-de-xuat-de-tai.component';

describe('Form01DeXuatDeTaiComponent', () => {
  let component: Form01DeXuatDeTaiComponent;
  let fixture: ComponentFixture<Form01DeXuatDeTaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form01DeXuatDeTaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form01DeXuatDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
