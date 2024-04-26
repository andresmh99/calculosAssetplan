import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AguaCalienteComponent } from './agua-caliente.component';

describe('AguaCalienteComponent', () => {
  let component: AguaCalienteComponent;
  let fixture: ComponentFixture<AguaCalienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AguaCalienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AguaCalienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
