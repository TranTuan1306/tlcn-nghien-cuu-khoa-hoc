import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsFormsComponent } from './docs-forms.component';

describe('DocsFormsComponent', () => {
  let component: DocsFormsComponent;
  let fixture: ComponentFixture<DocsFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
