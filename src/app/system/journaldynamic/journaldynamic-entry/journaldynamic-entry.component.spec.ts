import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournaldynamicEntryComponent } from './journaldynamic-entry.component';

describe('JournaldynamicEntryComponent', () => {
  let component: JournaldynamicEntryComponent;
  let fixture: ComponentFixture<JournaldynamicEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournaldynamicEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournaldynamicEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
