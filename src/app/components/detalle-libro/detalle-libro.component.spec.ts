import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLibroComponent } from './detalle-libro.component';

describe('DetalleLibroComponent', () => {
  let component: DetalleLibroComponent;
  let fixture: ComponentFixture<DetalleLibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleLibroComponent]
    });
    fixture = TestBed.createComponent(DetalleLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
