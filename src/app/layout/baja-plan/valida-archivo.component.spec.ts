import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaArchivoComponent } from './valida-archivo.component';

describe('ValidaArchivoComponent', () => {
  let component: ValidaArchivoComponent;
  let fixture: ComponentFixture<ValidaArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidaArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidaArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
