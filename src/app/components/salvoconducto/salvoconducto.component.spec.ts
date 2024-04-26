import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvoconductoComponent } from './salvoconducto.component';

describe('SalvoconductoComponent', () => {
  let component: SalvoconductoComponent;
  let fixture: ComponentFixture<SalvoconductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalvoconductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalvoconductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
