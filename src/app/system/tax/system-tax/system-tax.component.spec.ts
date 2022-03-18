import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTaxComponent } from './system-tax.component';

describe('SystemTaxComponent', () => {
  let component: SystemTaxComponent;
  let fixture: ComponentFixture<SystemTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
