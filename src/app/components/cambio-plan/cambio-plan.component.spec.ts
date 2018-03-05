import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPlanComponent } from './cambio-plan.component';

describe('CambioPlanComponent', () => {
  let component: CambioPlanComponent;
  let fixture: ComponentFixture<CambioPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
