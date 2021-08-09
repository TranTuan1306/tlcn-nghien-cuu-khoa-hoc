import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form02bsTienDoComponent } from './form02bs-tien-do.component';

describe('Form02bsTienDoComponent', () => {
  let component: Form02bsTienDoComponent;
  let fixture: ComponentFixture<Form02bsTienDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form02bsTienDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form02bsTienDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
