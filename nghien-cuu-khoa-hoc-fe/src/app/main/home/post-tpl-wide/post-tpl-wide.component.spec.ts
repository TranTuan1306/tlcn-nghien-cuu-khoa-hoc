import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTplWideComponent } from './post-tpl-wide.component';

describe('PostTplWideComponent', () => {
  let component: PostTplWideComponent;
  let fixture: ComponentFixture<PostTplWideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTplWideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTplWideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
