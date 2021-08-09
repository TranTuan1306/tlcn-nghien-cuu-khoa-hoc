import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form02bsDonViPhoiHopComponent } from './form02bs-don-vi-phoi-hop.component';

describe('Form02bsDonViPhoiHopComponent', () => {
  let component: Form02bsDonViPhoiHopComponent;
  let fixture: ComponentFixture<Form02bsDonViPhoiHopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form02bsDonViPhoiHopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form02bsDonViPhoiHopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
