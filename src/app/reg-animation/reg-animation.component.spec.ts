import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegAnimationComponent } from './reg-animation.component';

describe('RegAnimationComponent', () => {
  let component: RegAnimationComponent;
  let fixture: ComponentFixture<RegAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
