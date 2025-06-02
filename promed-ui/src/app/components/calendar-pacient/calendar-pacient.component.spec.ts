import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPacientComponent } from './calendar-pacient.component';

describe('CalendarPacientComponent', () => {
  let component: CalendarPacientComponent;
  let fixture: ComponentFixture<CalendarPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarPacientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
