import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemNavigationComponent } from './system-navigation.component';

describe('SystemNavigationComponent', () => {
  let component: SystemNavigationComponent;
  let fixture: ComponentFixture<SystemNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
