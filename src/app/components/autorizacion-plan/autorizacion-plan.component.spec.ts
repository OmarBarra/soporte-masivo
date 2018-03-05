import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionPlanComponent } from './autorizacion-plan.component';

describe('AutorizacionPlanComponent', () => {
  let component: AutorizacionPlanComponent;
  let fixture: ComponentFixture<AutorizacionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
