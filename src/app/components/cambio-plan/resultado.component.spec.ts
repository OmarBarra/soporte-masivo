import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoComponentCambio } from './resultado.component';

describe('ResultadoComponentCambio', () => {
  let component: ResultadoComponentCambio;
  let fixture: ComponentFixture<ResultadoComponentCambio>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoComponentCambio ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoComponentCambio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
