import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichSuFileComponent } from './lich-su-file.component';

describe('LichSuFileComponent', () => {
  let component: LichSuFileComponent;
  let fixture: ComponentFixture<LichSuFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichSuFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichSuFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
