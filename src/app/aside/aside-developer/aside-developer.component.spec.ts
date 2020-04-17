import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideDeveloperComponent } from './aside-developer.component';

describe('AsideDeveloperComponent', () => {
  let component: AsideDeveloperComponent;
  let fixture: ComponentFixture<AsideDeveloperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideDeveloperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
