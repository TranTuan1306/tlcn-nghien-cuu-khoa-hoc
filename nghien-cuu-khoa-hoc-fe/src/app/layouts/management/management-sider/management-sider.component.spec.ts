import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSiderComponent } from './management-sider.component';

describe('ManagementSiderComponent', () => {
  let component: ManagementSiderComponent;
  let fixture: ComponentFixture<ManagementSiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementSiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
