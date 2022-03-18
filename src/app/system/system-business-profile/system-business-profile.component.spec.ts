import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemBusinessProfileComponent } from './system-business-profile.component';

describe('SystemBusinessProfileComponent', () => {
  let component: SystemBusinessProfileComponent;
  let fixture: ComponentFixture<SystemBusinessProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemBusinessProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemBusinessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
