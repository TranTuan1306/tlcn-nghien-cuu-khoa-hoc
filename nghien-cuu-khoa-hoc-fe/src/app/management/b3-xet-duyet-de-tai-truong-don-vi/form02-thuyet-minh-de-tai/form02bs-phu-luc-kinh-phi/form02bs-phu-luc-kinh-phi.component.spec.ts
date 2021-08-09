import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form02bsPhuLucKinhPhiComponent } from './form02bs-phu-luc-kinh-phi.component';

describe('Form02bsPhuLucKinhPhiComponent', () => {
  let component: Form02bsPhuLucKinhPhiComponent;
  let fixture: ComponentFixture<Form02bsPhuLucKinhPhiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form02bsPhuLucKinhPhiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form02bsPhuLucKinhPhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
