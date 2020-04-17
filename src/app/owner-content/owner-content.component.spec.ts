import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerContentComponent } from './owner-content.component';

describe('OwnerContentComponent', () => {
  let component: OwnerContentComponent;
  let fixture: ComponentFixture<OwnerContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
