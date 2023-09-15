import { ChangeEvent } from 'react'
import { IColor } from './filterTypes'
import { IEvent } from './calendarTypes'

export interface IToolbarProps {
  calendar: any
  events: IEvent[]
  search: string
  colors: IColor[]
  changeSearch: (e: ChangeEvent<HTMLInputElement>) => void
  changeFilter: (id: number) => void
}