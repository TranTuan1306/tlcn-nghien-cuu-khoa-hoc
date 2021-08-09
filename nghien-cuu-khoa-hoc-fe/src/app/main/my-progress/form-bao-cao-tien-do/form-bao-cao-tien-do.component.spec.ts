import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBaoCaoTienDoComponent } from './form-bao-cao-tien-do.component';

describe('FormBaoCaoTienDoComponent', () => {
  let component: FormBaoCaoTienDoComponent;
  let fixture: ComponentFixture<FormBaoCaoTienDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBaoCaoTienDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBaoCaoTienDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
