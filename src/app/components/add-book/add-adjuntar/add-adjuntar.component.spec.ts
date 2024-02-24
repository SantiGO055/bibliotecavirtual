import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdjuntarComponent } from './add-adjuntar.component';

describe('AddAdjuntarComponent', () => {
  let component: AddAdjuntarComponent;
  let fixture: ComponentFixture<AddAdjuntarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdjuntarComponent]
    });
    fixture = TestBed.createComponent(AddAdjuntarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
