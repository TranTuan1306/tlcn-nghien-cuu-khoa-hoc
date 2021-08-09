import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGiaiTrinhChinhSuaComponent } from './form-giai-trinh-chinh-sua.component';

describe('FormGiaiTrinhChinhSuaComponent', () => {
  let component: FormGiaiTrinhChinhSuaComponent;
  let fixture: ComponentFixture<FormGiaiTrinhChinhSuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGiaiTrinhChinhSuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGiaiTrinhChinhSuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
