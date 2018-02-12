import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaPlanComponent } from './baja-plan.component';

describe('BajaPlanComponent', () => {
  let component: BajaPlanComponent;
  let fixture: ComponentFixture<BajaPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
