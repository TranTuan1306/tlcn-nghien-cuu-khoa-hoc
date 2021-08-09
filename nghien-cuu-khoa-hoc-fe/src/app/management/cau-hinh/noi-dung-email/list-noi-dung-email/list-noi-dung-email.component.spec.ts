import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNoiDungEmailComponent } from './list-noi-dung-email.component';

describe('ListNoiDungEmailComponent', () => {
  let component: ListNoiDungEmailComponent;
  let fixture: ComponentFixture<ListNoiDungEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNoiDungEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNoiDungEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
