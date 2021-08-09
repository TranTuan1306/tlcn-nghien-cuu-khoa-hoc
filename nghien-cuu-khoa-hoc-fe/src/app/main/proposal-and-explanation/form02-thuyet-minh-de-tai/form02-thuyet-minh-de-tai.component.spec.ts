import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form02ThuyetMinhDeTaiComponent } from './form02-thuyet-minh-de-tai.component';

describe('Form02ThuyetMinhDeTaiComponent', () => {
  let component: Form02ThuyetMinhDeTaiComponent;
  let fixture: ComponentFixture<Form02ThuyetMinhDeTaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form02ThuyetMinhDeTaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form02ThuyetMinhDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
