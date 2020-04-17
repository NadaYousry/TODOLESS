import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegNavbarComponent } from './reg-navbar.component';

describe('RegNavbarComponent', () => {
  let component: RegNavbarComponent;
  let fixture: ComponentFixture<RegNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
