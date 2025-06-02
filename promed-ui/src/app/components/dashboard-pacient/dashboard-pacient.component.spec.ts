import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPacientComponent } from './dashboard-pacient.component';

describe('DashboardPacientComponent', () => {
  let component: DashboardPacientComponent;
  let fixture: ComponentFixture<DashboardPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPacientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
