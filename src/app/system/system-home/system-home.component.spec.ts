import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemHomeComponent } from './system-home.component';

describe('SystemHomeComponent', () => {
  let component: SystemHomeComponent;
  let fixture: ComponentFixture<SystemHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
