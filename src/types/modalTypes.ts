import { ChangeEvent, FormEvent, ReactElement, ReactNode } from 'react'
import { IColor } from './filterTypes'

export interface IModalProps {
  children: ReactNode | ReactElement
  visible: boolean
  toggleVisible: (value: boolean) => void
}

export interface IModalAddProps {
  name: string
  colors: IColor[]
  setName: (e: ChangeEvent<HTMLInputElement>) => void
  setColor: (id: number) => void
  setSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export interface IModalEditProps {
  name: string
  colors: IColor[]
  setName: (e: ChangeEvent<HTMLInputElement>) => void
  setColor: (id: number) => void
  setSubmit: (e: FormEvent<HTMLFormElement>) => void
  setRemove: () => void
}