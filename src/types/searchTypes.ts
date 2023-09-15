import { ChangeEvent } from 'react'

export interface ISearchProps {
  search: string
  changeSearch: (e: ChangeEvent<HTMLInputElement>) => void
}
