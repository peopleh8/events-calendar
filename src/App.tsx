import { FC, ChangeEvent, useState, useMemo, useRef, FormEvent, useEffect } from 'react'
import Calendar from './components/Calendar'
import axios from 'axios'
import Toolbar from './components/Toolbar'
import Modal from './components/Modal'
import AddEvent from './components/AddEvent'
import EditEvent from './components/EditEvent'
import { IEvent, IHolidays } from './types/calendarTypes'
import { ColorEnum, IColor } from './types/filterTypes'
import { formatDate } from './utils/formatDate'
import './styles/App.css'

const App: FC = () => {
  const calendarRef = useRef<any>(null)
  const [calendar, setCalendar] = useState<any>(null)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isLoading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [isVisibleAddModal, setVisibleAddModal] = useState<boolean>(false)
  const [isVisibleEditModal, setVisibleEditModal] = useState<boolean>(false)
  const [events, setEvents] = useState<IEvent[]>([
    {
      id: '1',
      title: 'Hello',
      start: '2023-09-05',
      end: '2023-09-06',
      color: ColorEnum.Red
    },
    {
      id: '2',
      title: 'Hello2',
      start: '2023-09-05',
      end: '2023-09-06',
      color: ColorEnum.Blue
    }
  ])
  const [filterColors, setFilterColors] = useState<IColor[]>([
    {
      id: 1,
      color: ColorEnum.Red,
      isActive: false
    },
    {
      id: 2,
      color: ColorEnum.Green,
      isActive: false
    },
    {
      id: 3,
      color: ColorEnum.Blue,
      isActive: false
    },
  ])
  const [newEventName, setNewEventName] = useState<string>('')
  const [newEventStart, setNewEventStart] = useState<string>('')
  const [newEventEnd, setNewEventEnd] = useState<string>('')
  const [newColors, setNewColors] = useState<IColor[]>([
    {
      id: 1,
      color: ColorEnum.Red,
      isActive: false
    },
    {
      id: 2,
      color: ColorEnum.Green,
      isActive: false
    },
    {
      id: 3,
      color: ColorEnum.Blue,
      isActive: true
    },
  ])
  const [oldEventId, setOldEventId] = useState<string>('')
  const [oldEventName, setOldEventName] = useState<string>('')
  const [oldColors, setOldColors] = useState<IColor[]>([
    {
      id: 1,
      color: ColorEnum.Red,
      isActive: false
    },
    {
      id: 2,
      color: ColorEnum.Green,
      isActive: false
    },
    {
      id: 3,
      color: ColorEnum.Blue,
      isActive: false
    },
  ])

  const fetchHolidays = async () => {
    try {
      setLoading(true)
      
      const { data } = await axios.get<IHolidays[]>(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/UA`)
      const holidaysList: IEvent[] = data.map(item => ({
        id: `${item.name}`,
        title: item.name,
        start: item.date,
        color: 'purple',
        holiday: true,
        editable: false,
      }))

      setEvents([...events, ...holidaysList])
    } catch (e: unknown) {
      console.error((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setCalendar(calendarRef.current.getApi().el)

    fetchHolidays()
  }, [])

  useEffect(() => {
    fetchHolidays()
  }, [currentYear])

  // Modal
  const toggleVisibleAddModal = (value: boolean) => {
    setVisibleAddModal(value)
  }

  const toggleVisibleEditModal = (value: boolean) => {
    setVisibleEditModal(value)
  }

  // Filter
  const changeFilterHandler = (id: number) => {
    setFilterColors(filterColors.map(color => ({ ...color, isActive: !color.isActive && color.id === id ? true : false })))
  }

  const filteredEvents = useMemo(() => {
    if (filterColors.some(color => color.isActive)) {
      const activeColor = filterColors.filter(color => color.isActive)[0].color

      return [...events].filter(event => event.color === activeColor)
    }

    return events
  }, [filterColors, events])

  // Search
  const changeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const searchedAndFilteredEvents = useMemo(() => {
    return filteredEvents.filter(events => events.title.toLocaleLowerCase().includes(search.toLocaleLowerCase().trim()))
  }, [search, filteredEvents])

  // Calendar
  const handleDateSelect = (info: any) => {
    const { startStr, endStr } = info

    setNewEventStart(startStr)
    setNewEventEnd(endStr)
    toggleVisibleAddModal(true)
  }

  const handleEventDrag = (info: any) => {
    const { publicId } = info.event._def
    const { holiday } = info.event._def.extendedProps
    const { start: newStart, end: newEnd } = info.event._instance.range

    if (!holiday) {
      const newStartFormated = formatDate(newStart)
      const newEndFormated = formatDate(newEnd)

      setEvents(prev => prev.map(event => ({ 
        ...event, 
        start: event.id === publicId ? newStartFormated : event.start,
        end: event.id === publicId ? newEndFormated : event.end,
      })))
    }
  }

  const handeEventClick = (info: any) => {
    const { publicId } = info.event._def
    const { holiday } = info.event._def.extendedProps

    if (!holiday) {
      setOldEventId(publicId)
      toggleVisibleEditModal(true)
    }
  }

  const handleEventResize = (info: any) => {
    const { publicId } = info.event._def
    const { end: newEnd } = info.event._instance.range

    const newEndFormated = formatDate(newEnd)

    setEvents(prev => prev.map(event => ({ 
      ...event, 
      end: event.id === publicId ? newEndFormated : event.end,
    })))
  }

  const handleDatesSet = (info: any) => {
    const newYear = new Date(info.view.currentStart).getFullYear()
    if (newYear !== currentYear) {
      setCurrentYear(newYear)
    }
  }

  // Events
  const changeNewEventName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEventName(e.target.value)
  }

  const changeNewEventColor = (id: number) => {
    setNewColors(newColors.map(color => ({ ...color, isActive: color.id === id })))
  }

  const addNewEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newEventName.trim() !== '') {
      const activeColor = newColors.filter(color => color.isActive)[0].color
      
      setEvents(prev => prev.concat({
        id: `${Date.now()}`,
        title: newEventName, 
        start: newEventStart, 
        end: newEventEnd, 
        color: activeColor
      }))

      setNewEventName('')
      setNewEventStart('')
      setNewEventEnd('')
      setNewColors(prev => prev.map(item => ({ ...item, isActive: item.color === ColorEnum.Blue })))
      toggleVisibleAddModal(false)
    }
  }

  const changeOldEventName = (e: ChangeEvent<HTMLInputElement>) => {
    setOldEventName(e.target.value)
  }

  const changeOldEventColor = (id: number) => {
    setOldColors(oldColors.map(color => ({ ...color, isActive: !color.isActive && color.id === id ? true : false })))
  }

  const editOldEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const activeColor = oldColors.filter(color => color.isActive)[0]

    setEvents(prev => prev.map(event => ({
      ...event,
      title: oldEventName.trim() !== '' && event.id === oldEventId ? oldEventName : event.title,
      color: activeColor && event.id === oldEventId ? activeColor.color : event.color
    })))

    toggleVisibleEditModal(false)
    setOldEventId('')
    setOldEventName('')
    setOldColors(prev => prev.map(color => ({ ...color, isActive: false })))
  }

  const removeOldEventHandler = () => {
    setEvents(prev => prev.filter(event => event.id !== oldEventId))
    toggleVisibleEditModal(false)
    setOldEventId('')
    setOldEventName('')
    setOldColors(prev => prev.map(color => ({ ...color, isActive: false })))
  }

  return (
    <div className='App'>
      <Toolbar
        calendar={calendar}
        events={events}
        search={search}
        colors={filterColors}
        changeSearch={changeSearchHandler}
        changeFilter={changeFilterHandler}
      />
      <Calendar
        ref={calendarRef}
        isLoading={isLoading}
        events={searchedAndFilteredEvents}
        dateSelect={handleDateSelect}
        eventDrag={handleEventDrag}
        eventClick={handeEventClick}
        eventResize={handleEventResize}
        datesSet={handleDatesSet}
      />
      <Modal 
        visible={isVisibleAddModal} 
        toggleVisible={toggleVisibleAddModal}
      >
        <AddEvent 
          name={newEventName} 
          colors={newColors}
          setName={changeNewEventName}
          setColor={changeNewEventColor}
          setSubmit={addNewEventHandler}
        />
      </Modal>
      <Modal 
        visible={isVisibleEditModal} 
        toggleVisible={toggleVisibleEditModal}
      >
        <EditEvent
          name={oldEventName}
          colors={oldColors}
          setName={changeOldEventName}
          setColor={changeOldEventColor}
          setSubmit={editOldEventHandler}
          setRemove={removeOldEventHandler}
        />
      </Modal>
    </div>
  )
}

export default App