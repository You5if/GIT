import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensedynamicEntryComponent } from './expensedynamic-entry.component';

describe('ExpensedynamicEntryComponent', () => {
  let component: ExpensedynamicEntryComponent;
  let fixture: ComponentFixture<ExpensedynamicEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensedynamicEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensedynamicEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
