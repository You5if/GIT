import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckfordeleteComponent } from './checkfordelete.component';

describe('CheckfordeleteComponent', () => {
  let component: CheckfordeleteComponent;
  let fixture: ComponentFixture<CheckfordeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckfordeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckfordeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
