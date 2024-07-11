'use client';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ruLocale from '@fullcalendar/core/locales/ru';

interface CurriculumCalendarProps {
  events: {title: string, start: string, end: string}[]
}

export default function CurriculumCalendar({events}: CurriculumCalendarProps) {
  return (
    <div> 
      <FullCalendar
        locales={[ruLocale]}
        locale='ru'
        plugins={[ dayGridPlugin  ]}
        initialView="dayGridMonth"
        events={events}
        // events={[
        //   { title: 'event 1 event 1event 1event 1event 1event 1event 1', start: '2024-07-02T08:04:07+00:00', end: '2024-07-02T08:19:53+00:00' },
        //   { title: 'event 2', date: '2024-04-02' }
        // ]}
        eventContent={renderEventContent}
      />
    </div>
  );
}

function renderEventContent(eventInfo: any) {
  return(
    <div className='flex flex-col'>
      <p>
        <span>{formateDateToTime(eventInfo.event.start)}</span> - <span>{formateDateToTime(eventInfo.event.end)}</span>
      </p>
      <p className='overflow-auto text-wrap'>{eventInfo.event.title}</p>
    </div>
  )
}

function formateDateToTime(date: Date) {
  return new Date(date).toLocaleTimeString('ru', { timeStyle: 'short', hour12: false, timeZone: 'UTC' })
}