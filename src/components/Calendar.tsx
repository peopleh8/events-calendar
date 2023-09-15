import { forwardRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ICalendarProps } from '../types/calendarTypes'

const Calendar = forwardRef<FullCalendar, ICalendarProps>(({ events, isLoading, dateSelect, eventDrag, eventClick, eventResize, datesSet }, ref): JSX.Element => {
  return (
    <div 
      className='calendar'
      style={{
        opacity: isLoading ? .4 : 1,
        pointerEvents: isLoading ? 'none' : 'auto' 
      }}
    >
      <FullCalendar
        ref={ref}
        editable={true}
        selectable={true}
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView={'dayGridMonth'}
        eventOrder={'title'}
        eventOrderStrict={true}
        weekends={true}
        events={events}
        eventDrop={eventDrag}
        eventClick={eventClick}
        select={dateSelect}
        eventResize={eventResize}
        datesSet={datesSet}
      />
    </div>
  )
})

export default Calendar