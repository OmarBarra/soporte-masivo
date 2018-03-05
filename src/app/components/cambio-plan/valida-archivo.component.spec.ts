import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaArchivoComponentCambio } from './valida-archivo.component';

describe('ValidaArchivoComponentCambio', () => {
  let component: ValidaArchivoComponentCambio;
  let fixture: ComponentFixture<ValidaArchivoComponentCambio>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidaArchivoComponentCambio ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidaArchivoComponentCambio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
