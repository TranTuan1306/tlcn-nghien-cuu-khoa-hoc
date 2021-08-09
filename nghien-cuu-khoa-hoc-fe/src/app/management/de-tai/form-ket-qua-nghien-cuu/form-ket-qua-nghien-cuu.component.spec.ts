import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKetQuaNghienCuuComponent } from './form-ket-qua-nghien-cuu.component';

describe('FormKetQuaNghienCuuComponent', () => {
  let component: FormKetQuaNghienCuuComponent;
  let fixture: ComponentFixture<FormKetQuaNghienCuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormKetQuaNghienCuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKetQuaNghienCuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
