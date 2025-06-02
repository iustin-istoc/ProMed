import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar-pacient',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar-pacient.component.html',
  styleUrls: ['./calendar-pacient.component.css']
})
export class CalendarPacientComponent implements OnChanges {
  @Input() programari: any[] = [];

  calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  plugins: [dayGridPlugin, interactionPlugin],
  events: [],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek'
  },
  eventClick: this.onEventClick.bind(this)
};
  selectedEvent: any = null;

onEventClick(info: any) {
  this.selectedEvent = {
    title: info.event.title,
    date: info.event.start
  };
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['programari']) {
      this.calendarOptions.events = this.programari.map(p => ({
        title: p.reason + ' - ' + p.doctor?.fullName,
        date: p.appointmentDate
      }));
    }
  }
}
