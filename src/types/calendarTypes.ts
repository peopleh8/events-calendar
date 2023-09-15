export interface IEvent {
  id: string
  title: string
  start: string
  end?: string
  color: string
  holiday?: boolean
  editable?: boolean
}

export interface IDateClick {
  dateStr: string
}

export interface ISelectDate {
  start: Date
  end: Date
  startStr: string
  endStr: string
}

export interface ICalendarProps {
  events: IEvent[]
  isLoading: boolean
  dateSelect: (info: any) => void
  eventDrag: (info: any) => void
  eventClick: (info: any) => void
  eventResize: (info: any) => void
  datesSet: (info: any) => void
}

export interface IHolidays {
  date: string
  name: string
}