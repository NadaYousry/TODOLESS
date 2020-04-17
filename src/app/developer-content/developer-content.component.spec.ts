import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperContentComponent } from './developer-content.component';

describe('DeveloperContentComponent', () => {
  let component: DeveloperContentComponent;
  let fixture: ComponentFixture<DeveloperContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
