import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemForexComponent } from './system-forex.component';

describe('SystemForexComponent', () => {
  let component: SystemForexComponent;
  let fixture: ComponentFixture<SystemForexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemForexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemForexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
