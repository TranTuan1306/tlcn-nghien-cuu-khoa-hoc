import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCauHinhEmailComponent } from './list-cau-hinh-email.component';

describe('ListCauHinhEmailComponent', () => {
  let component: ListCauHinhEmailComponent;
  let fixture: ComponentFixture<ListCauHinhEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCauHinhEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCauHinhEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
