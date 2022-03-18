import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournaldynamicComponent } from './journaldynamic.component';

describe('JournaldynamicComponent', () => {
  let component: JournaldynamicComponent;
  let fixture: ComponentFixture<JournaldynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournaldynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournaldynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
