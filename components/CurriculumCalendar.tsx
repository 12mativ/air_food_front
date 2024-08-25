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