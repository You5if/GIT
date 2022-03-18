import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensedynamicComponent } from './expensedynamic.component';

describe('ExpensedynamicComponent', () => {
  let component: ExpensedynamicComponent;
  let fixture: ComponentFixture<ExpensedynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensedynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensedynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
