import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoComponentAutoriza } from './resultado.component';

describe('ResultadoComponentAutoriza', () => {
  let component: ResultadoComponentAutoriza;
  let fixture: ComponentFixture<ResultadoComponentAutoriza>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoComponentAutoriza ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoComponentAutoriza);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
