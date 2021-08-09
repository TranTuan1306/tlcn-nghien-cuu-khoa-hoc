import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSiderComponent } from './main-sider.component';

describe('MainSiderComponent', () => {
  let component: MainSiderComponent;
  let fixture: ComponentFixture<MainSiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
