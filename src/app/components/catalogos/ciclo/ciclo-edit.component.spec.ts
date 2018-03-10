import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloEditComponent } from './ciclo-edit.component';

describe('CicloEditComponent', () => {
  let component: CicloEditComponent;
  let fixture: ComponentFixture<CicloEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CicloEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicloEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
