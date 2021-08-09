import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGuiEmailComponent } from './form-gui-email.component';

describe('FormGuiEmailComponent', () => {
  let component: FormGuiEmailComponent;
  let fixture: ComponentFixture<FormGuiEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGuiEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGuiEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
